import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings.js";
import { fadeInVariants } from "../../../animations";

import { baseUrl } from "../../../api";

const ProductCardMini = ({
  id,
  title,
  price,
  rating,
  image,
  slug,
  showBorder,
  desc,
  data,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      className={`col-lg-6 col-md-12 col-sm-12 mb-4`}
      onClick={() => navigate(`/productInfo/${slug}`, { state: { data: id } })}
    >
      <div
        className={`card ${showBorder ? "border" : ""} shadow-lg`}
        style={{ cursor: "pointer" }}
      >
        <div className="row g-0 align-items-center p-3">
          <div className="col-4">
            <img className="img-fluid" src={image} alt={title} />
          </div>
          <div className="col-8">
            <div className="card-body p-0 ms-3">
              <h5 className="card-title">{title}</h5>
              <Ratings rating={rating} />
              <p className="card-text text-primary">
                {token ? `₹${price}` : "Login to reveal price"}
              </p>
              <p>{stripHtmlTags(desc)}</p>
              <div className="d-flex gap-2 mt-2">
                <button className="btn btn-sm">
                  <AiOutlineHeart className="fs-4" />
                </button>
                <button className="btn btn-sm">
                  <BiShoppingBag className="fs-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardMini;
