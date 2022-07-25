const getPostParams = postUrl => {
  const postId = postUrl.slice(postUrl.length - 24, postUrl.length);
  const postTitle = postUrl.slice(0, postUrl.indexOf(postId) - 1).replace(/\+/g, ' ');
  return { postTitle, postId };
};

const unCapitalizeFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

module.exports = { getPostParams, unCapitalizeFirstLetter };
