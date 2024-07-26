export const fadeInVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const headerVariant = {
  initial: {
    y: -50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: "easeInOut",
    },
  },
};

export const fadeInFromLeftVariant = {
  initial: {
    opacity: 0,
    x: -50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.1,
    },
  },
};
export const fadeInFromRightVariant = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.2,
    },
  },
};

export const buttonVariants = {
  // Default state
  initial: {
    scale: 1,
  },
  // Hover state
  hover: {
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};
// Animation properties for sidebar width
export const sidebarVariants = {
  expanded: {
    width: "250px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  collapsed: {
    width: "100px",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
// Animation properties for mobile sidebar
export const mobileSidebarVariants = {
  collapsed: { width: 0 },
  expanded: { width: "100%" },
};
