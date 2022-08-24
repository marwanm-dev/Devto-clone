const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

router
  .route('/:id')
  .patch(verifyJWT, usersController.updateUser)
  .delete(verifyJWT, usersController.deleteUser);

router.route('/:username').get(usersController.getUser);
router.route('/dash/:username').get(verifyJWT, usersController.getUserDashboard);

router.route('/:previewedId/:action').patch(verifyJWT, usersController.handleFollow);

module.exports = router;
