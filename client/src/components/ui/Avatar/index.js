import PropTypes from "prop-types";

const Avatar = ({ initials, bgColor, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`avatar d-flex align-items-center ${className}`}
    >
      <div
        className={`${bgColor} text-white rounded-circle d-flex align-items-center justify-content-center w- h-6 p-1`}
      >
        <span className="text-md">{initials}</span>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
