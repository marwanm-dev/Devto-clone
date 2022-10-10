import moment from 'moment';

export const getPostParams = postUrl => {
    const decoded = decodeURIComponent(postUrl);
    const postId = decoded.slice(decoded.length - 24, decoded.length);
    const postTitle = decoded.slice(0, decoded.indexOf(postId) - 1);
    return { postTitle, postId };
};

export const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
export const unCapitalizeFirstLetter = string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

export const createPostUrl = (postTitle, postId) => {
    return encodeURIComponent(`${postTitle}-${postId}`);
};

export const formatDate = (timestamp, momented = true) => {
    const date = new Date(timestamp).toLocaleDateString('en-us', {
        month: 'short',
        day: 'numeric',
        year: momented ? undefined : '2-digit',
    });
    return momented ? `${date} (${moment(timestamp).startOf('seconds').fromNow()})` : date;
};
