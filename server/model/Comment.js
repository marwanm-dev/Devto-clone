const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    parentPost: { type: mongoose.Types.ObjectId, ref: 'Post' },
    parentComment: { type: mongoose.Types.ObjectId, ref: 'Comment', default: null },
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
