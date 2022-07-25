const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').get(postsController.getPosts).post(verifyJWT, postsController.createPost);

router
  .route('/:username/:postUrl')
  .get(postsController.getPost)
  .patch(verifyJWT, postsController.updatePost)
  .delete(verifyJWT, postsController.deletePost);

router.route('/:username/:postUrl/:action').patch(postsController.postReaction);

module.exports = router;
