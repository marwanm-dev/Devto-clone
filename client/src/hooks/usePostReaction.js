import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SocketContext from '../context/SocketContext';
import { selectCurrentUser } from '../core/features/auth/authSlice';
import { usePostReactionMutation } from '../core/features/posts/postsApiSlice';
import { checkInArray } from '../helpers/array';
import { createPostUrl, getPostParams, unCapitalizeFirstLetter } from '../helpers/string';

const usePostReaction = (id, author, likes, unicorns, bookmarks, postTitle, toInvalidate) => {
    const currentUser = useSelector(selectCurrentUser);

    const username = author?.username;
    const postUrl = createPostUrl(postTitle, id);

    const { socket } = useContext(SocketContext);

    const [postReaction, { isLoading }] = usePostReactionMutation();

    const [state, setState] = useState({
        isLiked: checkInArray(likes, currentUser.id),
        isUnicorned: checkInArray(unicorns, currentUser.id),
        isBookmarked: checkInArray(bookmarks, currentUser.id),
    });

    const updateReactionArr = (arr, effect) => {
        if (effect === 'negative') arr.splice(arr.indexOf(author?.id), 1);
        else arr.push(author?.id);
    };

    const handleReaction = async (action, effect, arr, stateKey) => {
        updateReactionArr(arr, effect);

        setState(prev => ({ ...prev, [stateKey]: !prev[stateKey] }));

        const actionKey = action.includes('remove')
            ? unCapitalizeFirstLetter(action.slice(6, action.length) + 's')
            : action + 's';

        if (!action.includes('remove')) {
            socket?.emit('react', {
                sender: currentUser,
                receiver: author,
                reactionType: actionKey.slice(0, -1),
                post: { title: postTitle, id },
            });
        }

        const immutatedArray = eval(actionKey);

        await postReaction({
            url: `${username}/${postUrl}`,
            action: `${action}`,
            userId: currentUser.id,
            id,
            actionKey,
            immutatedArray,
            toInvalidate,
        });
    };

    return { state, handleReaction, isLoading };
};

export default usePostReaction;
