export const preventScroll = state => {
  document.body.style.overflowY = state ? 'hidden' : 'scroll';
};
