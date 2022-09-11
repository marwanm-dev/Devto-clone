const profileMenu = {
  initial: {
    opacity: 0,
    y: -15,
  },
  shown: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.15,
      type: 'spring',
      stiffness: 250,
    },
  },
  exit: {
    opacity: 0,
    y: -15,
  },
};

export default profileMenu;
