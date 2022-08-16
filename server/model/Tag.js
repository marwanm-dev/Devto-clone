const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getRandomColor } = require('../helpers/utils');

const TagSchema = new Schema(
  {
    name: { type: String, required: true },
    posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
    followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    hashtagColor: {
      type: String,
      required: true,
      default: () => getRandomColor(),
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model('Tag', TagSchema);
