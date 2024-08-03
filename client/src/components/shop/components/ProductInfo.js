// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import parse from "html-react-parser";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import watch from "../../../assets/images/watch.jpg";
// import watch1 from "../../../assets/images/watch1.png";
// import { BiArrowBack } from "react-icons/bi";
// import Ratings from "./Ratings";
// import API_WRAPPER from "../../../api";
// import success, { swalError } from "../../../utils";

// function ProductInfo() {
//   const [selectedImage, setSelectedImage] = useState(watch);
//   const [imagesList, setImagesList] = useState([watch, watch1, watch]);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const vid = location.state?.data;
//   console.log("vid ", vid);
//   const { slug } = useParams();
//   console.log("Slug ", slug);
//   // const [product, setProduct] = useState({
//   //   name: "Stylish Watch",
//   //   description:
//   //     "<p>This is a stylish and modern watch perfect for all occasions.</p>",
//   //   price: 120,
//   //   mrp: 150,
//   //   rating: 4.5,
//   //   reviewsCount: 10,
//   // });
//   const [product, setProduct] = useState([]);
//   // setProduct(setProduct);
//   const [quantity, setQuantity] = useState(50);

//   const updatePriceBasedOnQuantity = (quantity) => {
//     return product.price * (quantity / 50);
//   };

//   const fetchProductData = async () => {
//     try {
//       const res = await API_WRAPPER.get(`/product/${slug}`);
//       const data = res.data;
//       if (res.status == 200) {
//         console.log("data is ", data);
//         setProduct(data.productVariantDetails);
//       } else {
//         swalError("Warning", res.data.msg, () => {
//           setShowModal(false);
//         });
//       }
//     } catch (error) {
//       console.log("Error in fetchProductData in ProductInfo.js ", error);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [slug]);

// return (
//   <div className="container mt-4">
//     <Link to="/" className="btn btn-outline-secondary mb-4">
//       <BiArrowBack className="me-2" />
//       Back
//     </Link>

//     <div className="row" style={{ backgroundColor: "rgb(255, 253, 246)" }}>
//       <div className="col-lg-9 col-md-9 col-12">
//         <div className="row">
//           <div className="col-lg-6 col-md-12 col-12">
//             <div className="card my-3" style={{ width: "18rem;" }}>
//               <InnerImageZoom
//                 className="rounded-3 d-flex justify-content-center my-2"
//                 src={selectedImage}
//                 zoomType="hover"
//                 zoomScale={1.5}
//               />
//               <div className="card-body mt-2">
//                 {imagesList.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     className="img-thumbnail cursor-pointer mx-2 bg-light"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       objectFit: "cover",
//                     }}
//                     onClick={() => setSelectedImage(image)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>

//           {console.log("product bkl", product)}
//           <div className="col-lg-6 col-md-12 col-12">
//             <h1 className="display-5">{product?.[0]?.name}</h1>
//             {/* <span className="fs-2">${product.price}</span> */}
//             {/* <div className="">
//               <Ratings rating={3} />
//               <p>({product.reviewsCount} Reviews)</p>
//             </div>
//             <div className="mb-1">
//               <label htmlFor="quantity" className="form-label">
//                 Quantity
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="quantity"
//                 value={quantity}
//                 min="50"
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </div> */}
//             <button className="btn btn-primary w-100 mb-2">
//               <i
//                 className="fa fa-shopping-cart"
//                 style={{ fontSize: "20px" }}
//               ></i>
//               Add to Cart
//             </button>
//             <button className="btn btn-outline-primary w-100">
//               Get Quote
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="col-lg-3 col-md-3 col-12">
//         <center>
//           <p>Ongoing Offers!</p>
//         </center>
//         <div>
//           <div class="card mb-3" style={{ maxWidth: "540px" }}>
//             <div class="row g-0">
//               <div class="col-md-4 bg-primary">
//                 <center className="my-5">
//                   <b>Flate Rs. 250 off</b>
//                 </center>
//               </div>
//               <div class="col-md-8">
//                 <div class="card-body">
//                   <p class="card-text">
//                     Flat $250 off on minimum merchendise value $999! Use
//                     codeFEST250
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div class="card mb-3" style={{ maxWidth: "540px" }}>
//             <div class="row g-0">
//               <div class="col-md-4 bg-primary">
//                 <center className="my-5">
//                   <b>Flate Rs. 250 off</b>
//                 </center>
//               </div>
//               <div class="col-md-8">
//                 <div class="card-body">
//                   <p class="card-text">
//                     Flat $250 off on minimum merchendise value $999! Use
//                     codeFEST250
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="mt-5">
//       <ul className="nav nav-tabs" id="myTab" role="tablist">
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link active"
//             id="description-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#description"
//             type="button"
//             role="tab"
//             aria-controls="description"
//             aria-selected="true"
//           >
//             Description
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="specification-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#specification"
//             type="button"
//             role="tab"
//             aria-controls="specification"
//             aria-selected="false"
//           >
//             Specification
//           </button>
//         </li>
//         <li className="nav-item" role="presentation">
//           <button
//             className="nav-link"
//             id="review-tab"
//             data-bs-toggle="tab"
//             data-bs-target="#review"
//             type="button"
//             role="tab"
//             aria-controls="review"
//             aria-selected="false"
//           >
//             Review
//           </button>
//         </li>
//       </ul>
//       <div className="tab-content mt-3" id="myTabContent">
//         <div
//           className="tab-pane fade show active"
//           id="description"
//           role="tabpanel"
//           aria-labelledby="description-tab"
//         >
//           {/* {parse(product.description)} */}
//         </div>
//         <div
//           className="tab-pane fade"
//           id="specification"
//           role="tabpanel"
//           aria-labelledby="specification-tab"
//         >
//           <p>
//             Specification details would go here. Lorem ipsum dolor sit amet,
//             consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
//             fringilla.
//           </p>
//         </div>
//         <div
//           className="tab-pane fade"
//           id="review"
//           role="tabpanel"
//           aria-labelledby="review-tab"
//         >
//           <p>
//             Review details would go here. Lorem ipsum dolor sit amet,
//             consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
//             fringilla.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }

// export default ProductInfo;

import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import watch from "../../../assets/images/watch.jpg";
import { BiArrowBack } from "react-icons/bi";
import API_WRAPPER, { baseUrl } from "../../../api";
import success, { swalError } from "../../../utils";
import Ratings from "./Ratings";

function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState(watch);
  const [imagesList, setImagesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const vid = location.state?.data;
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [productVarients, setProductVarients] = useState([]);
  const [quantity, setQuantity] = useState(50);
  const updatePriceBasedOnQuantity = (quantity) => {
    return product.price * (quantity / 50);
  };

  const fetchProductData = async () => {
    try {
      const res = await API_WRAPPER.get(`/product/${slug}`);
      const data = res.data;
      if (res.status === 200) {
        const productVariantDetails = data.productVariantDetails[0];
        setProduct(data.productVariantDetails);
        console.log("DATA---> ", data);
        const matchingVariant = productVariantDetails.variants.find(
          (variant) => variant._id === vid
        );

        if (matchingVariant) {
          setProductVarients(matchingVariant);
          const images = matchingVariant.details[0]?.images || [];
          setImagesList(images);
          setSelectedImage(images[0]);
        } else {
          swalError("Warning", "Variant not found", () => {
            setShowModal(false);
          });
        }
      } else {
        swalError("Warning", res.data.msg, () => {
          setShowModal(false);
        });
      }
    } catch (error) {
      console.log("Error in fetchProductData in ProductInfo.js ", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  return (
    <>
      <div className="container mt-4">
        <Link to="/" className="btn btn-outline-secondary mb-4">
          <BiArrowBack className="me-2" />
          Back
        </Link>

        <div className="row" style={{ backgroundColor: "rgb(255, 253, 246)" }}>
          <div className="col-lg-9 col-md-9 col-12">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="card my-3" style={{ width: "18rem;" }}>
                  <InnerImageZoom
                    className="rounded-3 d-flex justify-content-center my-2"
                    src={`${baseUrl}/${selectedImage}`}
                    zoomType="hover"
                    zoomScale={1.5}
                  />
                  <div className="card-body mt-2">
                    {imagesList.map((image, index) => (
                      <img
                        key={index}
                        src={`${baseUrl}/${image}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="img-thumbnail cursor-pointer mx-2 bg-light"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        onClick={() => setSelectedImage(image)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-12">
                <h1 className="display-5">{product?.[0]?.name}</h1>
                <span className="fs-2">
                  ${productVarients?.details?.[0]?.price}
                </span>
                <div className="">
                  <Ratings rating={3} />
                  <p>({product.reviewsCount} Reviews)</p>
                </div>
                <div className="mb-1">
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={quantity}
                    min="50"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary w-100 mb-2">
                  <i
                    className="fa fa-shopping-cart"
                    style={{ fontSize: "20px" }}
                  ></i>
                  Add to Cart
                </button>
                <button className="btn btn-outline-primary w-100">
                  Get Quote
                </button>

                <div className="mt-2">
                  <form className="my-3">
                    <label className="form-lable">Color : </label>
                    <div className="card-body mt-2">
                      {console.log("imagesList ", imagesList)}
                      {imagesList.map((image, index) => (
                        <img
                          key={index}
                          src={`${baseUrl}/${image}`}
                          alt={`Thumbnail ${index + 1}`}
                          className="img-thumbnail cursor-pointer mx-2 bg-light"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                          // onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-12">
            <center>
              <p>Ongoing Offers!</p>
            </center>
            <div>
              <div class="card mb-3" style={{ maxWidth: "540px" }}>
                <div class="row g-0">
                  <div class="col-md-4 bg-primary">
                    <center className="my-5">
                      <b>Flate Rs. 250 off</b>
                    </center>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">
                        Flat $250 off on minimum merchendise value $999! Use
                        codeFEST250
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-3" style={{ maxWidth: "540px" }}>
                <div class="row g-0">
                  <div class="col-md-4 bg-primary">
                    <center className="my-5">
                      <b>Flate Rs. 250 off</b>
                    </center>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <p class="card-text">
                        Flat $250 off on minimum merchendise value $999! Use
                        codeFEST250
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="description-tab"
                data-bs-toggle="tab"
                data-bs-target="#description"
                type="button"
                role="tab"
                aria-controls="description"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="specification-tab"
                data-bs-toggle="tab"
                data-bs-target="#specification"
                type="button"
                role="tab"
                aria-controls="specification"
                aria-selected="false"
              >
                Specification
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="review-tab"
                data-bs-toggle="tab"
                data-bs-target="#review"
                type="button"
                role="tab"
                aria-controls="review"
                aria-selected="false"
              >
                Review
              </button>
            </li>
          </ul>
          <div className="tab-content mt-3" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              {/* {parse(product.description)} */}
            </div>
            <div
              className="tab-pane fade"
              id="specification"
              role="tabpanel"
              aria-labelledby="specification-tab"
            >
              <p>
                Specification details would go here. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
                fringilla.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="review"
              role="tabpanel"
              aria-labelledby="review-tab"
            >
              <p>
                Review details would go here. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
                fringilla.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
