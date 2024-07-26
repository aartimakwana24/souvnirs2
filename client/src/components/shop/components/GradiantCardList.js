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

GradiantCardList.propTypes = {
  cardData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      subheading: PropTypes.string.isRequired,
      background: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      btnColorCode: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GradiantCardList;
