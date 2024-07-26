import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper/index.js";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { useState } from "react";
function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };
  return (
    <>
      {/* <ScrollAnimationWrapper> */}
      {/* <div className="bg-info d-flex flex-column justify-between border border-shopPrimaryColor w-25"> */}
        <div className="row bg-light">
          <div className="col col-md-12 col-12 col-lg-12">
            <div className=" py-2 px-2 border border-shopPrimaryColor d-flex justify-content-between align-items-center">
              <h1 className="fs-5">Daily Deals</h1>
              <div className="d-flex gap-3">
                <button onClick={() => nextSlide()} className="btn btn-link">
                  <BsFillArrowLeftCircleFill className="fs-2" />
                </button>
                <button onClick={() => prevSlide()} className="btn btn-link">
                  <BsFillArrowRightCircleFill className="fs-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="col col-md-12 col-12 col-lg-12">
            <div className="mt-4 border">
              <div className="d-flex justify-content-center">
                {items[currentIndex]}
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      {/* </ScrollAnimationWrapper> */}
    </>
  );
}

export default Carousel;
