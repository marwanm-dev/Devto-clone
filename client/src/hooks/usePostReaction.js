import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/SocketContext';
import { selectCurrentUser } from '../core/features/auth/authSlice';
import { usePostReactionMutation } from '../core/features/posts/postsApiSlice';
import { checkInArray } from '../helpers/array';
import { createPostUrl } from '../helpers/string';

const usePostReaction = (id, author, likes, unicorns, bookmarks, postTitle) => {
  const currentUser = useSelector(selectCurrentUser);

  const username = author.username;
  const postUrl = createPostUrl(postTitle, id);

  const { socket } = useContext(SocketContext);

  const [postReaction] = usePostReactionMutation();

  const [state, setState] = useState({
    isLiked: checkInArray(likes, currentUser.id),
    isUnicorned: checkInArray(unicorns, currentUser.id),
    isBookmarked: checkInArray(bookmarks, currentUser.id),
  });

  const updateReactionArr = (arr, effect) => {
    if (effect === 'negative') arr.splice(arr.indexOf(author.id), 1);
    else arr.push(author.id);
  };

  const handleReaction = async (action, effect, arr, stateKey) => {
    updateReactionArr(arr, effect);

    setState(prev => ({ ...prev, [stateKey]: !prev[stateKey] }));

    if (!action.includes('remove')) {
      socket?.emit('like', {
        sender: currentUser,
        receiver: author,
      });
    }

    await postReaction({
      url: `${username}/${postUrl}`,
      action: `${action}`,
      userId: currentUser.id,
      id,
    });
  };

  return { state, handleReaction };
};

export default usePostReaction;
