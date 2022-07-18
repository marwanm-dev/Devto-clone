const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  image: { url: { type: String, required: true }, publicId: { type: String, required: true } },
  body: { type: String, required: true },
  // { type: mongoose.Types.ObjectId, ref: 'User' }
  likes: Number,
  unicorns: Number,
  bookmarks: Number,
  tags: [String], // { type: mongoose.Types.ObjectId, required: true, ref: 'Tag' }
  // comments: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Comment' }],
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  publishedDate: { type: String },
});

module.exports = mongoose.model('Post', PostSchema);
