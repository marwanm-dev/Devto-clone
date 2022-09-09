const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').get(postsController.getPosts).post(verifyJWT, postsController.createPost);

router.route('/bookmarked/:userId').get(postsController.getPosts);

router
  .route('/:username/:postUrl')
  .get(postsController.getPost)
  .patch(postsController.updatePost)
  .delete(postsController.deletePost);

router.route('/:username/:postUrl/:action').patch(verifyJWT, postsController.postReaction);

module.exports = router;
