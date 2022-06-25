const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/').get(usersController.getAllUsers).delete(usersController.deleteUser);

router.route('/:id').get(usersController.getUser);

module.exports = router;
