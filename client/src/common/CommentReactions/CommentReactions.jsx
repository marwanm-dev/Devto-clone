import { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import { selectCurrentUser } from '../../core/features/auth/authSlice';
import {
  useCommentReactionMutation,
  usePostCommentMutation,
} from '../../core/features/comments/commentsApiSlice';
import { checkInArray } from '../../helpers/array';
import useRequireAuth from '../../hooks/useRequireAuth';
import LoadingController from '../LoadingController';
import LikeComment from './components/LikeComment';
import ReplyComment from './components/ReplyComment';

const CommentReactions = ({
  likes,
  parentPost,
  parentComment,
  id,
  replyBody,
  isReplying,
  submittedReply,
  setSubmittedReply,
  toggleIsReplying,
}) => {
  const likesArr = likes && [...likes];
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.id;
  const [commentReaction, { isLoading }] = useCommentReactionMutation();
  const [isLiked, setIsLiked] = useState(checkInArray(likesArr, userId));
  const [postComment] = usePostCommentMutation();
  const { isAuthed, handleAuth } = useRequireAuth();

  const handleLike = () => {
    if (isAuthed) {
      const action = isLiked ? 'removeLike' : 'like';
      if (action === 'removeLike') likesArr.splice(likesArr.indexOf(userId), 1);
      else likesArr.push(userId);
      setIsLiked(prev => !prev);
      commentReaction({
        id,
        action,
        parentPost,
        userId,
      });
    } else handleAuth();
  };

  const handleReply = () => {
    if (isAuthed) {
      postComment({
        body: replyBody,
        author: userId,
        parentPost,
        parentComment,
      });
    } else handleAuth();
  };

  useEffect(() => {
    if (submittedReply) {
      handleReply();
      setSubmittedReply(false);
    }
  }, [submittedReply]);

  return (
    <Wrapper>
      <LoadingController isLoading={isLoading}>
        <LikeComment handleLike={handleLike} likes={likesArr} isLiked={isLiked} />
      </LoadingController>
      <ReplyComment isReplying={isReplying} toggleIsReplying={toggleIsReplying} />
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentReactions;
