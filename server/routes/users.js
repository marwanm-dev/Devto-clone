const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/').get(usersController.getAllUsers).delete(usersController.deleteUser);

router.route('/:id').get(usersController.getUser);

router.route('/:id/edit').patch(usersController.updateUser);

module.exports = router;
