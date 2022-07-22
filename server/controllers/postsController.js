const Post = require('../model/Post');
const User = require('../model/User');
const cloudinary = require('../config/cloudinary');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { getPostParams } = require('../helpers/strings');

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
    likes: 31,
    unicorns: 62,
    bookmarks: 93,
    tags: formattedTags,
    publishedDate: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      week: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }),
  });

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
  req.body.publishedDate = new Date().toLocaleDateString('en-us', {
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

  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const authorId = await User.findOne({ username: req.params.username }).exec();
  const { postTitle, postId } = getPostParams(req.params.postUrl);

  await cloudinary.uploader.destroy(req.body.publicId);

  const foundPost = await Post.findOneAndDelete({
    author: authorId,
    title: postTitle,
    _id: postId,
  }).exec();

  !foundPost && res.sendStatus(204);

  res.sendStatus(200);
};

module.exports = { createPost, getPosts, getPost, updatePost, deletePost };
