const Notification = require('../model/Notification');

const getAllNotifications = async (req, res, next) => {
  const { userId } = req.params;

  await Notification.updateMany({ receiver: userId }, { read: true });
  const notifications = await Notification.find({ receiver: userId })
    .sort({ date: -1 })
    .populate('receiver')
    .populate('sender')
    .populate('post')
    .populate('comment', 'body');

  res.json(notifications);
};

const getUnreadNotifications = async (req, res, next) => {
  const { userId } = req.params;

  const notifications = await Notification.find({
    receiver: userId,
    read: false,
  })
    .populate('receiver')
    .populate('sender')
    .populate('post')
    .populate('comment', 'body');

  res.json(notifications);
};

const likeNotification = async (senderId, postId, receiverId) => {
  await Notification.create({
    type: 'like',
    sender: senderId,
    receiver: receiverId,
    post: postId,
  });
};

const removeLikeNotification = async (senderId, postId, receiverId) => {
  await Notification.findOneAndDelete({
    type: 'like',
    sender: senderId,
    receiver: receiverId,
    post: postId,
  });
};

const commentNotification = async (senderId, postId, commentId, receiverId) => {
  await Notification.create({
    type: 'comment',
    sender: senderId,
    receiver: receiverId,
    post: postId,
    comment: commentId,
  });
};

const removeCommentNotification = async (senderId, postId, commentId, receiverId) => {
  await Notification.findOneAndDelete({
    type: 'comment',
    sender: senderId,
    receiver: receiverId,
    post: postId,
    comment: commentId,
  });
};

const followNotification = async (senderId, receiverId) => {
  await Notification.create({
    sender: senderId,
    receiver: receiverId,
    type: 'follow',
  });
};

const removeFollowNotification = async (senderId, receiverId) => {
  await Notification.findOneAndDelete({
    sender: senderId,
    receiver: receiverId,
    notificationType: 'follow',
  });
};

module.exports = {
  getAllNotifications,
  getUnreadNotifications,
  likeNotification,
  removeLikeNotification,
  commentNotification,
  removeCommentNotification,
  followNotification,
  removeFollowNotification,
};
