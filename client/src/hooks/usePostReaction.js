import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrentUser } from '../core/features/auth/authSlice';
import { usePostReactionMutation } from '../core/features/posts/postsApiSlice';
import { checkInArray } from '../helpers/array';
import { createPostUrl } from '../helpers/string';

const usePostReaction = (postId, author, likes, unicorns, bookmarks, postTitle) => {
  const currentUser = useSelector(selectCurrentUser);

  const username = author.username;
  const postUrl = createPostUrl(postTitle, postId);

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
    console.log({
      url: `${username}/${postUrl}`,
      action: `${action}`,
      userId: currentUser.id,
      postId,
    });
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
