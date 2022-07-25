const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true },
  date: String,
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('Tag', TagSchema);
