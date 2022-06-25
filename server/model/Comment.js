const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({});

module.exports = mongoose.model('Comment', CommentSchema);
