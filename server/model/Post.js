const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({});

module.exports = mongoose.model('Post', PostSchema);
