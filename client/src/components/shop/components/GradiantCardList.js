import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
import GradiantCard from "../cards/GradiantCard";
import PropTypes from "prop-types";

const GradiantCardList = ({ cardData }) => {
  return (
    <ScrollAnimationWrapper>
      <div className="row g-4 mt-5">
        {cardData?.map(
          ({
            id,
            title,
            heading,
            subheading,
            background,
            image,
            link,
            btnColorCode,
          }) => {
            return (
                <GradiantCard
                  background={background}
                  title={title}
                  heading={heading}
                  subheading={subheading}
                  image={image}
                  link={link}
                  btnColorCode={btnColorCode}
                />
            );
          }
        )}
      </div>
    </ScrollAnimationWrapper>
  );
};


export default GradiantCardList;
