const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.route('/').get(postsController.getPosts).post(postsController.createPost);

router
  .route('/:username/:postUrl')
  .get(postsController.getPost)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

module.exports = router;
