export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const createPostUrl = (postTitle, postId) => {
  return `${postTitle.replaceAll(' ', '+')}-${postId}`;
};

export const formatDate = (timestamp, detailed = false) => {
  if (detailed) {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      week: 'numeric',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
  } else {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: '2-digit',
      month: 'short',
      week: 'numeric',
      day: '2-digit',
    });
  }
};
