import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Card from "../../ui/Card";

const DashboardCard = ({
  number,
  subheading,
  iconSvg,
  iconColor,
  textColor,
}) => {
  const [animatedNumber, setAnimatedNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animatedNumber < number) {
        setAnimatedNumber(animatedNumber + 1);
      } else {
        clearInterval(interval);
      }
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [number, animatedNumber]);

  return (
    <Card>
      <motion.div className="card-body d-flex justify-content-between align-items-center py-2">
        <div className="flex flex-column">
          <h2 className="text-xl font-bold">
            {animatedNumber}+
          </h2>
          <p className={`text-xs md-text-sm ${textColor}`}>{subheading}</p>
        </div>

        <div
          className={`p-2 d-flex justify-content-center align-items-center rounded-circle ${iconColor}`}
        >
          {iconSvg}
        </div>
      </motion.div>
    </Card>
  );
};

DashboardCard.propTypes = {
  number: PropTypes.number,
  subheading: PropTypes.string.isRequired,
  iconSvg: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default DashboardCard;
