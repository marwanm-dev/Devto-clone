const mobileMenu = {
  initial: {
    opacity: 0,
    x: -25,
  },
  shown: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.15,
      type: 'spring',
      stiffness: 400,
    },
  },
  exit: {
    opacity: 0,
    x: -25,
  },
};

export default mobileMenu;
