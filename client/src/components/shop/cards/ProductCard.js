import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animations";
import { Link, useNavigate } from "react-router-dom";
import API_WRAPPER, { baseUrl } from "../../../api";
import { useDispatch } from "react-redux";
// import { toggleRefresh } from "../../../features/appConfig/appSlice";
import { PATHS } from "../../../Routes/paths";
import success from '../../../utils/index.js';
import watch from "../../../assets/images/watch1.png";

const ProductCard = ({
  id,
  title,
  price,
  discountPrice,
  rating,
  image,
  badgeColor,
  badgeText,
  slug,
  isDiscounted,
  isLoading,
  className,
}) => {
  const [heartColor, setHeartColor] = useState("black");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const addToWishlist = async () => {
    if (token) {
    //   const response = await API_WRAPPER.post("/wishlist/create", {
    //     productId: id,
    //   });
    //   if (response.status === 200)
        //  success( "success","added to wishlist");
    //   dispatch(toggleRefresh());
    } else {
      const existingWL = localStorage.getItem("wishlist");
      if (existingWL) {
        const i = JSON.parse(existingWL).findIndex((a) => a === id);
        if (i === -1) {
          const updatedwl = [...JSON.parse(existingWL), id];
          localStorage.setItem("wishlist", JSON.stringify(updatedwl));
        }
      } else {
        localStorage.setItem("wishlist", JSON.stringify([id]));
      }
    }
  };

  const handleHeartClick = () => {
    setHeartColor((prevColor) => (prevColor === "black" ? "red" : "black"));
    addToWishlist();
  };

  return (
    <motion.div
      variants={fadeInVariants}
      whileHover={{ scale: 1.05 }}
      animate="animate"
      initial="initial"
      key={id}
      className={`card shadow-lg ${className}`}
      //   onClick={() => navigate(`/productInfo/${slug}`)}
      style={{ cursor: "pointer", width: "18rem" }}
    >
      {isLoading ? (
        <div className="card-body mx-2">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          <div className="bg-secondary mb-3" style={{ height: "176px" }}></div>
          <div
            className="bg-light mb-2"
            style={{ height: "16px", width: "50%" }}
          ></div>
          <div
            className="bg-light"
            style={{ height: "16px", width: "25%" }}
          ></div>
        </div>
      ) : (
        <>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className={`badge ${badgeColor}`}>{badgeText}</span>
              <button
                className="btn btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeartClick();
                }}
              >
                <AiOutlineHeart
                  className="fs-4"
                  style={{ color: heartColor }}
                />
              </button>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <img
                className="img-fluid"
                style={{ height: "176px", objectFit: "contain" }}
                // src={
                //   !image?.includes("res.cloudinary") &&
                //   !image?.includes("cdn.shopify")
                //     ? `${baseUrl}/${image}`
                //     : image
                // }
                src={watch}
                alt={title}
              />
            </div>
            <h5 className="card-title text-center">{title}</h5>
            {isDiscounted ? (
              <div className="d-flex justify-content-center align-items-center">
                <span className="text-muted text-decoration-line-through me-2">
                  ${price}
                </span>
                <span className="text-primary">${discountPrice}</span>
              </div>
            ) : (
              <center>
                <div className="d-flex justify-content-center align-items-center">
                  {token ? (
                    <>
                      <span className="text-dark">₹{price}</span>
                      <span className="text-primary">
                        Lorem ipsum dtuabch bhdhsdh has bhhsau
                      </span>
                    </>
                  ) : (
                    <Link to={PATHS.register} className="text-decoration-none">
                      <span className="text-dark">
                        ₹200
                        {/* {Math.ceil(price / 100) * 100 <= 100
                        ? "less than ₹100"
                        : `₹${Math.floor(price / 100) * 100}-${
                            Math.ceil(price / 100) * 100
                          }`} */}
                      </span>
                      <br />
                      <span className="text-primary">
                        Lorem ipsum dtuabch bhdhsdh has bhhsau{" "}
                      </span>
                    </Link>
                  )}
                </div>
              </center>
            )}
            <div className="d-flex justify-content-center">
            <Ratings rating={rating} />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  badgeColor: PropTypes.string,
  badgeText: PropTypes.string,
  slug: PropTypes.string.isRequired,
  isDiscounted: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default ProductCard;
