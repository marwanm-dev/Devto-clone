const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').post(commentsController.postComment);

router.route('/:postId').get(commentsController.getCommentsByPost);

router
  .route('/:commentId')
  .delete(commentsController.deleteComment)
  .patch(commentsController.updateComment);

router.route('/:commentId/:action').patch(commentsController.commentReaction);

module.exports = router;
