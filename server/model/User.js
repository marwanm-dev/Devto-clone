const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: {
    type: String,
    default: process.env.DEFAULT_USER_PICTURE.toString(),
  },
  bio: String,
  location: String,
  joinDate: { type: Date, default: Date.now },
  education: String,
  work: String,
  availableFor: String,
  // Todo posts, comments, followedTags, followedUsers
  refreshToken: String,
});

module.exports = mongoose.model('User', UserSchema);
