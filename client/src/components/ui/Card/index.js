import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeInVariants } from "../../../animations";
import { useSelector } from "react-redux";
const Card = ({ children }) => {
//   const darkMode = useSelector((x) => x.appConfig.darkMode);

  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      //   className={`card ${
      //     darkMode ? "bg-dark text-white" : "bg-light"
      //   } shadow h-100 rounded`}
      className="card shadow h-100 rounded gx-1 cards " 
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
