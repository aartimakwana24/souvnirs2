import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

const BrandsCard = ({ imagesList }) => {
  return (
    <ScrollAnimationWrapper>
      <div className="row mt-5">
        {imagesList?.map(({ image, alt }) => {
          return (
            <div
              key={nanoid()}
              className="col-6 col-md-3 d-flex align-items-center justify-content-center border"
            >
              <img src={image} alt={alt} className="img-fluid"/>
            </div>
          );
        })}
      </div>
    </ScrollAnimationWrapper>
  );
};


export default BrandsCard;
