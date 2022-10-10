const getPostParams = postUrl => {
    const decoded = decodeURIComponent(postUrl);
    const postId = decoded.slice(decoded.length - 24, decoded.length);
    const postTitle = decoded.slice(0, decoded.indexOf(postId) - 1);
    return { postTitle, postId };
};

const unCapitalizeFirstLetter = string => {
    return string.charAt(0).toLowerCase() + string.slice(1);
};

module.exports = { getPostParams, unCapitalizeFirstLetter };
