import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimationWrapper = (props) => {
  const { children } = props;
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8,
  });

  const variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        ease: [0.6, -0.05, 0.01, 0.99],
        duration: 0.3,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
