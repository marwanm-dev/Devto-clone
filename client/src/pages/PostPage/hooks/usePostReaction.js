import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../core/features/auth/authSlice';
import { usePostReactionMutation } from '../../../core/features/posts/postsApiSlice';
import { checkInArray } from '../../../helpers/array';

const usePostReaction = (postId, author, likes, unicorns, bookmarks) => {
  const currentUser = useSelector(selectCurrentUser);
  const { username, postUrl } = useParams();

  const [postReaction] = usePostReactionMutation();

  const [state, setState] = useState({
    isLiked: checkInArray(likes, currentUser.id),
    isUnicorned: checkInArray(unicorns, currentUser.id),
    isBookmarked: checkInArray(bookmarks, currentUser.id),
  });

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') arr.splice(arr.indexOf(author._id), 1);
    else arr.push(author._id);
  };

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect);

    setState(prev => ({ ...prev, [stateKey]: !prev[stateKey] }));

    await postReaction({
      url: `${username}/${postUrl}`,
      action: `${action}`,
      userId: currentUser.id,
      postId,
    });
  };

  return { state, handleReaction };
};

export default usePostReaction;
