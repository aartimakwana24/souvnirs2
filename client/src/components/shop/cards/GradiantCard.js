import PropTypes from "prop-types";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const GradiantCard = ({
  background,
  image,
  title,
  heading,
  subheading,
  link,
  btnColorCode,
}) => {
  const btnStyle = {
    backgroundColor: `#${btnColorCode}`,
  };

  return (
    <>
      <div className="position-relative col-12 col-md-4">
        <div
          className="card mb-3"
          style={{
            maxWidth: "550px",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "4vh",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={image}
                className="img-fluid rounded-start"
                alt="Background...."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{heading}</p>
                <p className="card-text">
                  <small className="text-light">{subheading}</small>
                </p>
                  <Link
                    to={link}
                    className="btn text-white border-0 shadow-none mt-md-4"
                    style={btnStyle}
                  >
                    Shop Now <BsArrowRightShort className="fs-4" />
                  </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

GradiantCard.propTypes = {
  image: PropTypes.string,
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  btnColorCode: PropTypes.string.isRequired,
};

export default GradiantCard;
