const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const notificationsController = require('../controllers/notificationsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').get(usersController.getUsers);

router
  .route('/:id')
  .patch(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);

router.route('/:username').get(usersController.getUser);

router.route('/dash/:username').get(usersController.getUserDashboard);

router.route('/:previewedId/:action').patch(verifyJWT, usersController.handleFollow);

router.route('/:userId/notifications').get(notificationsController.getNotifications);

router.route('/:userId/notifications/unread').get(notificationsController.getUnreadNotifications);

module.exports = router;
