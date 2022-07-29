const Comment = require('../model/Comment');
const Post = require('../model/Post');
const User = require('../model/User');
const { unCapitalizeFirstLetter } = require('../helpers/string');

const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ parentPost: req.params.postId }).populate('author');

  res.status(200).json(comments);
};

const postComment = async (req, res) => {
  const { body, author, parentPost } = req.body;

  const comment = await Comment.create({
    body,
    parentPost: parentPost,
    author,
    date: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      week: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  });
  const post = await Post.findById(parentPost);
  const user = await User.findById(author);

  post.comments.push(comment._id);
  user.comments.push(comment._id);

  await post.save();
  await user.save();

  res.status(200).json(comment);
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;

  const { body } = req.body;
  const date = new Date().toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    week: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const updatedComment = await Comment.findByIdAndUpdate(commentId, { body, date }, { new: true });

  res.status(200).json(updatedComment);
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await Comment.findByIdAndDelete(commentId)
    .populate('author')
    .populate('parentPost');

  comment.author.comments.pull(comment);
  comment.parentPost.comments.pull(comment);
  await comment.author.save();
  await comment.parentPost.save();

  res.status(200).json(comment);
};

const commentReaction = async (req, res) => {
  const { userId } = req.body;
  const { commentId, action } = req.params;
  const isUndoing = action.includes('remove');
  const actionKey = isUndoing
    ? unCapitalizeFirstLetter(action.replace('remove', '')) + 's'
    : action + 's';

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId },
    isUndoing ? { $pull: { [actionKey]: userId } } : { $addToSet: { [actionKey]: userId } },
    { new: true }
  );

  res.status(200).json(updatedComment);
};

module.exports = { getCommentsByPost, postComment, updateComment, deleteComment, commentReaction };
