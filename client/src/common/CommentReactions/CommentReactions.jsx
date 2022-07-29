import tw, { styled } from 'twin.macro';
import { FaRegComment } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setAuthModal,
  selectCurrentToken,
  selectCurrentUser,
} from '../../core/features/auth/authSlice';
import LikeComment from './components/LikeComment';
import { checkInArray } from '../../helpers/array';
import {
  useCommentReactionMutation,
  usePostCommentMutation,
} from '../../core/features/comments/commentsApiSlice';
import ReplyComment from './components/ReplyComment';

const CommentReactions = ({ likes, parentPost, id }) => {
  const likesArr = [...likes];
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const currentUser = useSelector(selectCurrentUser);
  const userId = currentUser?.id;
  const [commentReaction] = useCommentReactionMutation();
  const [isLiked, setIsLiked] = useState(checkInArray(likesArr, userId));
  // Todo const [postComment] = usePostCommentMutation();

  const handleLike = () => {
    if (!token) dispatch(setAuthModal(true));
    else {
      const action = isLiked ? 'removeLike' : 'like';
      if (action === 'removeLike') likesArr.splice(likesArr.indexOf(userId), 1);
      else likesArr.push(userId);
      setIsLiked(prev => !prev);
      commentReaction({ id, action, parentPost, userId });
    }
  };

  const handleReply = () => {
    if (!token) dispatch(setAuthModal(true));
    else {
    }
  };

  return (
    <Wrapper>
      <LikeComment handleLike={handleLike} likes={likesArr} isLiked={isLiked} />
      <ReplyComment handleReply={handleReply} />
    </Wrapper>
  );
};

const Wrapper = tw.div`flex items-center gap-2`;

export default CommentReactions;
