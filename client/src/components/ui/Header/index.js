import React from "react";
import HeaderBanner from "../../../assets/images/HeaderBanner.png";
function Header({ heading, subheading, image }) {
  return (
    <div className="position-relative">
      {/* Banner */}
      <img
        className="w-100 h-72 object-cover rounded"
        src={HeaderBanner}
        alt="header-banner"
      />
      {/* Content */}
      <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* Heading */}
              <h1 className="text-2xl md:text-4xl mt-lg-5 font-weight-bold text-white">
                {heading}
              </h1>
              {/* Subheading */}
              <p className="d-none d-md-block text-white font-medium w-60 my-4 small">
                {subheading}
              </p>
            </div>
            <div className="col-md-6 d-md-flex justify-content-end align-items-center">
              {/* Side Image */}
              {image && (
                <img
                  className="d-none d-md-block"
                  src={image}
                  alt="header image"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
