import PropTypes from "prop-types";
import { AiOutlineCalendar, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

const BlogsCard = ({
  blogImage,
  date,
  views,
  heading,
  paragraph,
  buttonHandler,
}) => {
  return (
    <>
      <div className="card shadow" style={{ width: "18rem" }}>
        <img
          src={blogImage}
          className="card-img-top"
          alt="img.."
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{heading}</h5>
          <p className="card-text">
            <AiOutlineCalendar className="fs-6" />
            {date}
            <AiOutlineEye className="ms-3" /> {views} Views
          </p>
          <p className="card-text">{paragraph}</p>
        </div>
      </div>
    </>
  );
};

export default BlogsCard;
