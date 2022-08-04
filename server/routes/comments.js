const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').post(verifyJWT, commentsController.postComment);

router.route('/:postId').get(commentsController.getCommentsByPost);

router
  .route('/:commentId')
  .delete(verifyJWT, commentsController.deleteComment)
  .patch(verifyJWT, commentsController.updateComment);

router.route('/:commentId/:action').patch(verifyJWT, commentsController.commentReaction);

module.exports = router;
