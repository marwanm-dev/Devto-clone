import moment from 'moment';

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const unCapitalizeFirstLetter = string => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const createPostUrl = (postTitle, postId) => {
  return `${postTitle.replaceAll(' ', '+')}-${postId}`;
};

export const formatDate = (timestamp, momented = true) => {
  const date = new Date(timestamp).toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: momented ? undefined : '2-digit',
  });
  return momented ? `${date} (${moment(timestamp).startOf('seconds').fromNow()})` : date;
};
