const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);

router.post('/google', authController.handleGoogleLogin);

router.post('/github', authController.handleGithubLogin);

module.exports = router;
