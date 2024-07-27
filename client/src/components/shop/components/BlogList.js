import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
import BlogsCard from "../cards/BlogsCard";
import PropTypes from "prop-types";

const BlogList = ({ blogItemsData }) => {
  return (
    // <ScrollAnimationWrapper>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-3">
        {blogItemsData?.map(
          ({
            id,
            blogImage,
            date,
            views,
            heading,
            paragraph,
            buttonHandler,
          }) => {
            return (
              <div key={id} className="col">
                <BlogsCard
                  blogImage={blogImage}
                  buttonHandler={buttonHandler}
                  date={date}
                  views={views}
                  heading={heading}
                  paragraph={paragraph}
                />
              </div>
            );
          }
        )}
      </div>
    // </ScrollAnimationWrapper>
  );
};

export default BlogList;
