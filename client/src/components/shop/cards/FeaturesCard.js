import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

// The component is to show all the features of the shop in a concise manner
const FeaturesCard = ({
  iconOne,
  iconTwo,
  iconThree,
  iconFour,
  headingOne,
  subHeadingOne,
  headingTwo,
  subHeadingTwo,
  headingThree,
  subHeadingThree,
  headingFour,
  subHeadingFour,
}) => {
  return (
    <ScrollAnimationWrapper>
      <div className="bg-light rounded-3 mt-5 p-4 shadow-lg">
        <div className="d-flex flex-column flex-md-row gap-4 justify-content-center justify-content-md-between my-4">
          <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
            <div className="me-2">{iconOne}</div>
            <div>
              <div className="text-dark fs-4 fw-semibold text-uppercase">
                {headingOne}
              </div>
              <div className="text-muted fs-6 fw-medium">{subHeadingOne}</div>
            </div>
          </div>
          <div className="vr d-none d-md-block"></div>
          <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 my-4 my-md-0">
            <div className="me-2">{iconTwo}</div>
            <div>
              <div className="text-dark fs-4 fw-semibold text-uppercase">
                {headingTwo}
              </div>
              <div className="text-muted fs-6 fw-medium">{subHeadingTwo}</div>
            </div>
          </div>
          <div className="vr d-none d-md-block"></div>
          <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start my-4 my-md-0">
            <div className="me-2">{iconThree}</div>
            <div>
              <div className="text-dark fs-4 fw-semibold text-uppercase">
                {headingThree}
              </div>
              <div className="text-muted fs-6 fw-medium">{subHeadingThree}</div>
            </div>
          </div>
          <div className="vr d-none d-md-block"></div>
          <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start my-4 my-md-0">
            <div className="me-2">{iconFour}</div>
            <div>
              <div className="text-dark fs-4 fw-semibold text-uppercase">
                {headingFour}
              </div>
              <div className="text-muted fs-6 fw-medium">{subHeadingFour}</div>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

export default FeaturesCard;
