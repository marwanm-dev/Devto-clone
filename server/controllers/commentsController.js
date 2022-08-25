const Comment = require('../model/Comment');
const Post = require('../model/Post');
const User = require('../model/User');
const { unCapitalizeFirstLetter } = require('../helpers/string');
const { commentNotification, removeCommentNotification } = require('./notificationsController');

const getCommentsByPost = async (req, res) => {
  const comments = await Comment.find({ parentPost: req.params.postId }).populate('author');

  res.status(200).json(comments);
};

const postComment = async (req, res) => {
  const { body, author, parentPost, parentComment } = req.body;

  const comment = await Comment.create({
    body,
    parentPost,
    parentComment,
    author,
  });
  const post = await Post.findById(parentPost);
  const user = await User.findById(author);

  post.comments.push(comment._id);
  user.comments.push(comment._id);

  await post.save({ timestamps: false });
  await user.save();

  commentNotification(author, parentPost, comment._id, post.author);

  res.status(200).json(comment);
};

const updateComment = async (req, res) => {
  const { commentId } = req.params;

  const { body } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(commentId, { body, date }, { new: true });

  res.status(200).json(updatedComment);
};

const deleteComment = async (req, res) => {
  const { commentId: commentIdToDelete } = req.params;

  const comment = await Comment.findByIdAndDelete(commentIdToDelete);

  const post = await Post.findById(comment.parentPost).exec();
  post.comments.pull(commentIdToDelete);

  const user = await User.findById(comment.author).exec();
  user.comments.pull(commentIdToDelete);

  const replies = await Comment.find({ parentComment: comment._id });

  if (replies) {
    replies.forEach(reply => {
      (async () => {
        post.comments.pull(reply._id);

        const user = await User.findById(reply.author).exec();
        user.comments.pull(reply._id);
      })();
    });
    await Comment.deleteMany({ parentComment: comment._id });
  }

  await post.save({ timestamps: false });
  await user.save();

  await removeCommentNotification(comment.author, comment.parentPost, comment._id, post.author);

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

module.exports = {
  getCommentsByPost,
  postComment,
  updateComment,
  deleteComment,
  commentReaction,
};
