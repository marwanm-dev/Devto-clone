const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: String,
  bio: String,
  location: String,
  joinDate: { type: Date, default: Date.now },
  education: String,
  work: String,
  refreshToken: String,
});

module.exports = mongoose.model('User', UserSchema);
