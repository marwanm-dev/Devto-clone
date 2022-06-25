const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({});

module.exports = mongoose.model('Notification', NotificationSchema);
