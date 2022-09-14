const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['like', 'comment', 'follow', 'post'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Types.ObjectId, ref: 'Post' },
    comment: { type: mongoose.Types.ObjectId, ref: 'Comment' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Notification', NotificationSchema);
