export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createPostUrl = (postTitle, postId) => {
  return `${postTitle.replaceAll(' ', '+')}-${postId}`;
};
