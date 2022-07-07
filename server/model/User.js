const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture: {
    url: String,
    publicId: String,
  },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  joinDate: {
    type: String,
    default: new Date().toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
    }),
  },
  education: { type: String, default: '' },
  work: { type: String, default: '' },
  availableFor: { type: String, default: '' },
  skills: { type: String, default: '' },
  // Todo posts, comments, followedTags, followedUsers
  refreshToken: { type: String, default: '' },
});

module.exports = mongoose.model('User', UserSchema);
