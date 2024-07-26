import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

const FullWidthBannerCard = ({
  imageOne,
  imageTwo,
  mainHeading,
  subHeading,
}) => {
  return (
    <ScrollAnimationWrapper>
      <div className="d-flex flex-column w-100 justify-content-start justify-content-md-center mt-5">
        <div
          className="text-white rounded-xl py-4 d-flex flex-column flex-md-row align-items-center justify-content-between"
          style={{
            background: "linear-gradient(to right, #7398FF, #B3FEDD)",
            color: "white",
            borderRadius:
              "0.75rem",
          }}
        >
          <div className="d-none d-lg-block">
            <img className="img-fluid" src={imageOne} alt="" />
          </div>
          <div className="text-center my-3 my-md-0">
            <div className="d-flex flex-column align-items-center">
              <h3 className="fs-4 fs-md-1 text-black">{mainHeading}</h3>
              <h3 className="fs-4 fs-md-1 text-black">{subHeading}</h3>
            </div>
            <div className="d-flex gap-2 justify-content-center mt-3 mt-md-0">
              <button className="btn btn-sm btn-primary border-0 p-2">
                Shop Now
              </button>
            </div>
          </div>
          <div className="d-none d-lg-block">
            <img className="" src={imageTwo} alt="" style={{height:"50vh"}}/>
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

FullWidthBannerCard.propTypes = {
  imageOne: PropTypes.string.isRequired,
  imageTwo: PropTypes.string.isRequired,
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};

export default FullWidthBannerCard;
