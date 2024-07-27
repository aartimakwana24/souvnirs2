import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animations/index.js";
import { BsArrowRight } from "react-icons/bs";
import "./index.css";
const HeaderCards = ({
  mainHeading,
  mainHeadingTwo,
  mainSubHeading,
  mainImage,
  tertioryHeadingOne,
  tertioryHeadingTwo,
  tertiorySubHeading,
  secondaryImageOne,
  productImgOne,
  productImageTwo,
  productImageThree,
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-12 col-md-8 position-relative"
        >
          <img
            className="img-fluid rounded-3 h-100"
            src={mainImage}
            alt="mainImage"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column flex-md-row align-items-center justify-content-around p-4">
            <div className="text-center text-md-start">
              <div className="row">
                <div className="col-lg-12 col-md-6">
                  <h2 className="text-white display-4">{mainHeading}</h2>
                  <h3 className="text-white display-5">{mainHeadingTwo}</h3>
                  <h6 className="text-white">{mainSubHeading}</h6>
                </div>
                <div className="col-lg-12 col-md-6 d-none d-sm-block ">
                  <div className="btn btn-light mt-4 ">
                    <span className="fw-semibold">Shop Now</span>
                    <BsArrowRight className="ms-2 fs-4" />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src={productImgOne}
                className=" d-none d-lg-block myProductImgOne"
                alt="productImgOne"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-12 col-md-4 position-relative mt-3 mt-lg-0"
        >
          <div
            className="card mb-3"
            style={{
              maxWidth: "540px",
              backgroundImage: `url(${secondaryImageOne})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "white",
            }}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {mainHeading} {mainHeadingTwo}
                  </h5>
                  <p className="card-text">{mainSubHeading}</p>
                  <p className="card-text">
                    <button className="btn btn-light d-flex align-items-center">
                      <span className="fw-semibold text-black">Shop Now</span>
                      <BsArrowRight className="ms-2 fs-4 text-black" />
                    </button>
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <img
                  src={productImageTwo}
                  className="img-fluid rounded-start mt-lg-5"
                  alt="..."
                />
              </div>
            </div>
          </div>

          <div
            className="card mb-3"
            style={{
              maxWidth: "540px",
              backgroundImage: `url(${secondaryImageOne})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              color: "white",
            }}
          >
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {tertioryHeadingOne} {tertioryHeadingTwo}
                  </h5>
                  <p className="card-text">{tertiorySubHeading}</p>
                  <p className="card-text">
                    <button className="btn btn-light d-flex align-items-center">
                      <span className="fw-semibold text-black">Shop Now</span>
                      <BsArrowRight className="ms-2 fs-4 text-black" />
                    </button>
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <img
                  src={productImageTwo}
                  className="img-fluid rounded-start mt-lg-5"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeaderCards;
