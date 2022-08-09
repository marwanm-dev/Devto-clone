const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getRandomColor } = require('../helpers/utils');

const TagSchema = new Schema({
  name: { type: String, required: true },
  date: {
    type: String,
    default: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      week: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }),
  },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  hashtagColor: {
    type: String,
    required: true,
    default: () => getRandomColor(),
  },
});

module.exports = mongoose.model('Tag', TagSchema);
