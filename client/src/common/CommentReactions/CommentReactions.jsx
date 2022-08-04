import { useEffect, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import tw, { styled } from 'twin.macro';
import {
  selectCurrentToken,
  selectCurrentUser,
  setAuthModal,
} from '../../core/features/auth/authSlice';
import {
  useCommentReactionMutation,
  usePostCommentMutation,
} from '../../core/features/comments/commentsApiSlice';
import { checkInArray } from '../../helpers/array';
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
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.id;
  const [commentReaction] = useCommentReactionMutation();
  const [isLiked, setIsLiked] = useState(checkInArray(likesArr, userId));
  const [postComment] = usePostCommentMutation();

  const handleLike = () => {
    if (!token) dispatch(setAuthModal(true));
    else {
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
    }
  };

  const handleReply = () => {
    if (!token) dispatch(setAuthModal(true));
    else {
      postComment({
        body: replyBody,
        author: userId,
        parentPost,
        parentComment,
      });
    }
  };

  useEffect(() => {
    if (submittedReply) {
      handleReply();
      setSubmittedReply(false);
    }
  }, [submittedReply]);

  return (
    <Wrapper>
      <LikeComment handleLike={handleLike} likes={likesArr} isLiked={isLiked} />
      <ReplyComment isReplying={isReplying} toggleIsReplying={toggleIsReplying} />
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentReactions;
