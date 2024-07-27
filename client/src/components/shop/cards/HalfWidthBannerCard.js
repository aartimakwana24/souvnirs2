import { BsArrowRightShort } from "react-icons/bs";
import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

const HalfWidthBannerCard = ({
  backgroundImageOne,
  backgroundImageTwo,
  productImageOne,
  productImageTwo,
  cardTitleOne,
  cardTitleTwo,
  headingOne,
  headingTwo,
  buttonHandlerOne,
  buttonHandlerTwo,
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-around gap-4 mt-5">
      <ScrollAnimationWrapper>
        <div
          className="card mb-3 text-dark"
          style={{
            maxWidth: "540px",
            backgroundImage: `url(${backgroundImageOne})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "5vh",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={productImageOne}
                className="img-fluid rounded-start"
                alt="img..."
                style={{
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{headingOne}</h5>
                <h1 className="card-text">{cardTitleOne.toUpperCase()}</h1>
                <button
                  className="btn btn-sm btn-primary d-flex w-50"
                  onClick={buttonHandlerTwo}
                >
                  <span>Shop Now</span>
                  <BsArrowRightShort className="fs-2 d-none d-md-inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <div
          className="card mb-3 text-dark"
          style={{
            maxWidth: "540px",
            backgroundImage: `url(${backgroundImageTwo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
            padding: "5vh",
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={productImageTwo}
                className="img-fluid rounded-start"
                alt="img..."
                style={{
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{headingTwo}</h5>
                <h1 className="card-text">{cardTitleTwo.toUpperCase()}</h1>
                <button
                  className="btn btn-sm btn-primary d-flex w-50"
                  onClick={buttonHandlerTwo}
                >
                  <span>Shop Now</span>
                  <BsArrowRightShort className="fs-2 d-none d-md-inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default HalfWidthBannerCard;
