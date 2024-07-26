import PropTypes from "prop-types";

const DetailsCard = ({
  SvgIcon,
  label,
  totalAmount,
  percentage,
  dynamicAmount,
  percentageColor,
  iconText,
}) => {
  return (
    <div className="w-full py-1 bg-light border-bottom border-gray-200 mb-2">
      <div className="w-full d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex gap-4 align-items-center ">
          <div
            className={`w-12 h-12 p-1 rounded-xl d-flex align-items-center justify-content-center ${
              !SvgIcon && "bg-light"
            }`}
          >
            {SvgIcon ? SvgIcon : iconText}
          </div>
          <div>
            <h4 className="fs-6">{label}</h4>
            <p className="text-sm md:text-sm">{totalAmount}</p>
          </div>
        </div>
        <div className="d-flex gap-2 flex-column align-items-end">
          <p className="text-xs md:text-sm">{dynamicAmount}</p>
          <p className={`${percentageColor} text-xs md:text-sm`}>
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  SvgIcon: PropTypes.element,
  label: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  dynamicAmount: PropTypes.string.isRequired,
  percentageColor: PropTypes.string.isRequired,
  iconText: PropTypes.string,
};

export default DetailsCard;
