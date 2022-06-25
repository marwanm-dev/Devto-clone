const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({});

module.exports = mongoose.model('Tag', TagSchema);
