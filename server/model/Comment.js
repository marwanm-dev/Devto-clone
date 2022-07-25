const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, required: true },
  date: String,
  parentPost: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Comment', CommentSchema);
