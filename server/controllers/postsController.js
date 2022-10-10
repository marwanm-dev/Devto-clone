const Post = require('../model/Post');
const User = require('../model/User');
const Tag = require('../model/Tag');
const Comment = require('../model/Comment');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { getPostParams, unCapitalizeFirstLetter } = require('../helpers/string');
const { createTags, updateTags, deleteTags } = require('./tagsController');
const {
    likeNotification,
    removeLikeNotification,
    postNotification,
    removePostNotification,
} = require('./notificationsController');

const createPost = async (req, res) => {
    const { title, file, body, tags, authorUsername } = req.body;

    const { url, public_id: publicId } = await uploadToCloudinary(file, 'Posts');
    const author = await User.findOne({ username: authorUsername }).exec();

    const formattedTags = tags
        .trim()
        .split(',')
        .map(w => w.trim().replace(/ /g, '-'));

    const createdPost = await Post.create({
        title,
        image: { url, publicId },
        body,
        author: author._id,
    });

    author.followers.map(followerId => {
        (async () => {
            await postNotification(author._id, createdPost._id, followerId);
        })();
    });

    await createTags(formattedTags, createdPost);

    author.posts.push(createdPost._id);

    await author.save();

    res.status(200).json(createdPost.toObject({ getters: true }));
};

const getPost = async (req, res) => {
    const author = await User.findOne({ username: req.params.username }).exec();
    const authorId = await author?.toObject({ getters: true }).id;
    const { postTitle, postId } = getPostParams(req.params.postUrl);

    const foundPost = await Post.findOne({
        author: authorId,
        title: postTitle,
        _id: postId,
    })
        .populate('author')
        .populate('comments')
        .populate('tags')
        .exec();

    res.status(200).json(foundPost.toObject({ getters: true }));
};

const getPosts = async (req, res) => {
    const { userId } = req.params;

    const posts = await Post.find(userId ? { bookmarks: userId } : {})
        .sort({ createdAt: -1 })
        .populate('author')
        .populate('tags');
    if (!posts) res.status(204).json('No posts found');

    res.status(200).json(posts.map(post => post.toObject({ getters: true })));
};

const updatePost = async (req, res) => {
    const authorId = await User.findOne({ username: req.params.username }).exec();
    const { postTitle, postId } = getPostParams(req.params.postUrl);

    const { url, public_id: publicId } = await uploadToCloudinary(req.body.image.url, 'Posts');

    await cloudinary.uploader.destroy(req.body.image.publicId);

    req.body.image = { url, publicId };
    const formattedTags = req.body.tags
        .trim()
        .split(',')
        .map(w => w.trim().replace(/ /g, '-'));

    const post = await Post.findOne({
        author: authorId,
        title: postTitle,
        _id: postId,
    })
        .populate('author')
        .populate('tags');

    Object.keys(req.body).map(key => {
        if (key !== 'tags') post[key] = req.body[key];
    });

    await updateTags(formattedTags, post);

    await post.save();

    res.status(200).json(post.toObject({ getters: true }));
};

const deletePostsByUserId = async user => {
    const { _id: userId } = user;

    user.comments.forEach(commentId => {
        (async () => {
            await Post.updateMany({ comments: commentId }, { $pull: { comments: commentId } });
        })();
    });

    const posts = await Post.find({ author: userId }).populate('tags');

    ['likes', 'unicorns', 'bookmarks'].forEach(k => {
        (async () => {
            await Post.updateMany({ [k]: userId }, { $pull: { [k]: userId } });
        })();
    });

    posts.forEach(post => {
        (async () => {
            await deleteTags(
                post.tags.map(({ name }) => name),
                post,
                true
            );
            await cloudinary.uploader.destroy(post.image.publicId);
            await Post.deleteOne({ _id: post._id });
        })();
    });

    await Comment.deleteMany({ author: userId });
};

const deletePost = async (req, res) => {
    const author = await User.findOne({ username: req.params.username }).exec();
    const { postTitle, postId } = getPostParams(req.params.postUrl);

    await cloudinary.uploader.destroy(req.body.publicId);

    const foundPost = await Post.findOne({
        author: author._id,
        title: postTitle,
        _id: postId,
    })
        .populate('tags')
        .exec();

    if (!foundPost) return res.sendStatus(204);

    const comments = await Comment.find({ parentPost: postId }).populate({
        path: 'author',
        populate: 'followers',
    });

    comments.forEach(({ author }) =>
        (async () => {
            author.comments.forEach(comment => author.comments.pull(comment));
        })()
    );
    author.posts.pull(postId);
    await author.save();

    await Comment.deleteMany({ parentPost: postId });

    await deleteTags(
        foundPost.tags.map(({ name }) => name),
        foundPost,
        true
    );

    removePostNotification(author._id, foundPost._id, author.followers);

    await Post.deleteOne({ _id: foundPost._id });

    res.status(200).json(foundPost.toObject({ getters: true }));
};

const postReaction = async (req, res) => {
    const { userId } = req.body;
    const { action, postUrl } = req.params;
    const { postTitle, postId } = getPostParams(postUrl);
    const isUndoing = action.includes('remove');
    const actionKey = isUndoing
        ? unCapitalizeFirstLetter(action.replace('remove', '')) + 's'
        : action + 's';

    const author = await User.findOne({ username: req.params.username }).exec();
    const authorId = await author.toObject({ getters: true }).id;

    const updatedPost = await Post.findOneAndUpdate(
        { author: authorId, title: postTitle, _id: postId },
        isUndoing ? { $pull: { [actionKey]: userId } } : { $addToSet: { [actionKey]: userId } },
        { new: true, timestamps: false }
    );

    if (isUndoing) await removeLikeNotification(userId, updatedPost._id, authorId);
    else await likeNotification(userId, updatedPost._id, authorId);

    res.status(200).json(updatedPost.toObject({ getters: true }));
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    deletePostsByUserId,
    postReaction,
};
