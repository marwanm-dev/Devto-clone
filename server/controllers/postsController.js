const Post = require('../model/Post');
const User = require('../model/User');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { getPostParams, unCapitalizeFirstLetter } = require('../helpers/string');

const createPost = async (req, res) => {
  const { title, file, body, tags, authorUsername } = req.body;

  const { url, public_id: publicId } = await uploadToCloudinary(file, 'Posts');
  const author = await User.findOne({ username: authorUsername }).exec();

  const formattedTags = tags
    .trim()
    .split(',')
    .map(w => w.trim().replace(/ /g, '-'));

  const post = await Post.create({
    title,
    image: { url, publicId },
    body,
    author: author._id,
    tags: formattedTags,
    date: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      week: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  });

  author.posts.push(post._id);

  await author.save();

  res.status(200).json(post);
};

const getPost = async (req, res) => {
  const authorId = await User.findOne({ username: req.params.username }).exec();

  const { postTitle, postId } = getPostParams(req.params.postUrl);

  const foundPost = await Post.findOne({
    author: authorId,
    title: postTitle,
    _id: postId,
  })
    .populate('author')
    .populate('comments')
    .exec();

  res.status(200).json(foundPost);
};

const getPosts = async (req, res) => {
  const posts = await Post.find({}).populate('author');
  if (!posts) res.status(204).json('No posts found');

  res.status(200).json(posts);
};

const updatePost = async (req, res) => {
  const authorId = await User.findOne({ username: req.params.username }).exec();
  const { postTitle, postId } = getPostParams(req.params.postUrl);

  const { url, public_id: publicId } = await uploadToCloudinary(req.body.image.url, 'Posts');

  await cloudinary.uploader.destroy(req.body.image.publicId);

  req.body.image = { url, publicId };
  req.body.tags = req.body.tags
    .trim()
    .split(',')
    .map(w => w.trim().replace(/ /g, '-'));
  req.body.date = new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    week: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const updatedPost = await Post.findOneAndUpdate(
    {
      author: authorId,
      title: postTitle,
      _id: postId,
    },
    { ...req.body },
    { new: true }
  )
    .populate('author')
    .exec();

  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const author = await User.findOne({ username: req.params.username }).exec();
  const { postTitle, postId } = getPostParams(req.params.postUrl);

  await cloudinary.uploader.destroy(req.body.publicId);

  const foundPost = await Post.findOneAndDelete({
    author: author._id,
    title: postTitle,
    _id: postId,
  });
  console.log(author.posts);
  author.posts.pull(foundPost);
  await author.save();
  console.log(author.posts);

  if (!foundPost) res.status(204);

  res.status(200).json(foundPost);
};

const postReaction = async (req, res) => {
  const { userId } = req.body;
  const { action, postUrl } = req.params;
  const { postTitle, postId } = getPostParams(postUrl);
  const isUndoing = action.includes('remove');
  const actionKey = isUndoing
    ? unCapitalizeFirstLetter(action.replace('remove', '')) + 's'
    : action + 's';
  const authorId = await User.findOne({ username: req.params.username }).exec();

  const updatedPost = await Post.findOneAndUpdate(
    { author: authorId, title: postTitle, _id: postId },
    isUndoing ? { $pull: { [actionKey]: userId } } : { $addToSet: { [actionKey]: userId } },
    { new: true }
  );

  res.status(200).json(updatedPost);
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost, postReaction };
