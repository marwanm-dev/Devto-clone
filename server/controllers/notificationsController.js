const Notification = require('../model/Notification');

const getAllNotifications = async (req, res, next) => {
  const { userId } = req.params;

  await Notification.updateMany({ receiver: userId }, { read: true });
  const notifications = await Notification.find({ receiver: userId })
    .sort({ createdAt: -1 })
    .populate('receiver')
    .populate('sender')
    .populate('post')
    .populate('comment', 'body');

  res.json(notifications.map(notification => notification.toObject({ getters: true })));
};

const getUnreadNotifications = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json('User Id required');

  const unreadNotifications = await Notification.find({
    receiver: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('receiver')
    .populate('sender')
    .populate('post')
    .populate('comment', 'body');

  res.json(unreadNotifications);
};

const likeNotification = async (senderId, postId, receiverId) => {
  console.log(senderId, receiverId);
  if (senderId !== receiverId)
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
  console.log(senderId, receiverId);
  if (senderId !== receiverId)
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
    type: 'follow',
    sender: senderId,
    receiver: receiverId,
  });
};

const removeFollowNotification = async (senderId, receiverId) => {
  await Notification.findOneAndDelete({
    type: 'follow',
    sender: senderId,
    receiver: receiverId,
  });
};
const postNotification = async (senderId, postId, receiverId) => {
  await Notification.create({
    type: 'post',
    sender: senderId,
    post: postId,
    receiver: receiverId,
  });
};

const removePostNotification = async (senderId, postId, receiverId) => {
  await Notification.findOneAndDelete({
    type: 'post',
    sender: senderId,
    post: postId,
    receiver: receiverId,
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
  postNotification,
  removePostNotification,
};
