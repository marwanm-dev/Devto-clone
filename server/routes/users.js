const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.route('/:id').patch(usersController.updateUser).delete(usersController.deleteUser);

router.route('/:username').get(usersController.getUser);

module.exports = router;
