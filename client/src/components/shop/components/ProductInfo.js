// import { Link, useLocation, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import parse from "html-react-parser";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import watch from "../../../assets/images/watch.jpg";
// import { BiArrowBack } from "react-icons/bi";
// import API_WRAPPER, { baseUrl } from "../../../api";
// import success, { swalError } from "../../../utils";
// import Ratings from "./Ratings";

// function ProductInfo() {
//   const [selectedImage, setSelectedImage] = useState(watch);
//   const [imagesList, setImagesList] = useState([]);
//   const [allImagesList, setAllImagesList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const [product, setProduct] = useState([]);
//   const [productVarients, setProductVarients] = useState([]);
//   const [AllProductVarients, setAllProductVarients] = useState([]);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [quantity, setQuantity] = useState(50);
//   const vid = location.state?.data;
//   const { slug } = useParams();

//   const updatePriceBasedOnQuantity = (quantity) => {
//     return product.price * (quantity / 50);
//   };

// const handleImageClick = (image) => {
//   console.log("Product:", product);

//   if (!Array.isArray(product) || product.length === 0) {
//     console.error("Product is not properly defined or is an empty array");
//     return;
//   }

//   const selectedVariant = product
//     .flatMap((p) => p.variants || [])
//     .find((variant) => {
//       if (!Array.isArray(variant.details)) {
//         console.error(
//           "variant.details is not an array or is undefined",
//           variant
//         );
//         return false;
//       }

//       return variant.details.some((detail) => {
//         if (!Array.isArray(detail.images)) {
//           console.error(
//             "detail.images is not an array or is undefined",
//             detail
//           );
//           return false;
//         }

//         return detail.images.includes(image);
//       });
//     });

//   if (selectedVariant) {
//     setProductVarients(selectedVariant);

//     const variantImages = selectedVariant.details[0]?.images || [];
//     setImagesList(variantImages);

//     setSelectedImage(image);
//   } else {
//     console.warn("No variant found for the clicked image:", image);
//   }
// };

//   const fetchProductData = async () => {
//     try {
//       const res = await API_WRAPPER.get(`/product/${slug}`);
//       const data = res.data;
//       if (res.status === 200) {
//         const productVariantDetails = data.productVariantDetails[0];
//         setProduct(data.productVariantDetails);
//         const extractImages = (data) => {
//           if (!Array.isArray(data.productVariantDetails)) {
//             console.error(
//               "productVariantDetails is not an array:",
//               data.productVariantDetails
//             );
//             return [];
//           }

//           const allImagesList = data.productVariantDetails.flatMap(
//             (variant, variantIndex) => {
//               if (!Array.isArray(variant.variants)) {
//                 console.error("variants is not an array for variant:", variant);
//                 return [];
//               }

//               return (variant.variants || []).flatMap(
//                 (variantItem, variantIndex) => {
//                   if (!Array.isArray(variantItem.details)) {
//                     console.error(
//                       "details is not an array for variantItem:",
//                       variantItem
//                     );
//                     return [];
//                   }

//                   return (variantItem.details || []).flatMap(
//                     (detail, detailIndex) => {
//                       if (!Array.isArray(detail.images)) {
//                         console.error(
//                           "images is not an array for detail:",
//                           detail
//                         );
//                         return [];
//                       }
//                       return (detail.images || []).filter((image) => image);
//                     }
//                   );
//                 }
//               );
//             }
//           );

//           console.log("Final images list:", allImagesList);
//           return allImagesList;
//         };

//         const allImages = extractImages(data);
//         setAllImagesList(allImages);

//         setAllProductVarients(data.productVariantDetails);
//         const matchingVariant = productVariantDetails.variants.find(
//           (variant) => variant._id === vid
//         );

//         if (matchingVariant) {
//           setProductVarients(matchingVariant);
//           const images = matchingVariant.details[0]?.images || [];
//           setImagesList(images);
//           setSelectedImage(images[0]);
//         } else {
//           swalError("Warning", "Variant not found", () => {
//             setShowModal(false);
//           });
//         }
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
//     console.log("All Images List:", allImagesList);
//   }, [allImagesList]);

//   useEffect(() => {
//     fetchProductData();
//   }, [slug]);

//   return (
//     <>
//       <div className="container mt-4">
//         <Link to="/" className="btn btn-outline-secondary mb-4">
//           <BiArrowBack className="me-2" />
//           Back
//         </Link>

//         <div className="row" style={{ backgroundColor: "rgb(255, 253, 246)" }}>
//           <div className="col-lg-9 col-md-9 col-12">
//             <div className="row">
//               <div className="col-lg-6 col-md-12 col-12">
//                 <div className="card my-3" style={{ width: "18rem;" }}>
//                   <InnerImageZoom
//                     className="rounded-3 d-flex justify-content-center my-2"
//                     src={`${baseUrl}/${selectedImage}`}
//                     zoomType="hover"
//                     zoomScale={1.5}
//                   />
//                   <div className="card-body mt-2">
//                     {imagesList.map((image, index) => (
//                       <img
//                         key={index}
//                         src={`${baseUrl}/${image}`}
//                         alt={`Thumbnail ${index + 1}`}
//                         className="img-thumbnail cursor-pointer mx-2 bg-light"
//                         style={{
//                           width: "100px",
//                           height: "100px",
//                           objectFit: "cover",
//                         }}
//                         onClick={() => setSelectedImage(image)}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-6 col-md-12 col-12">
//                 <h1 className="display-5">{product?.[0]?.name}</h1>
//                 <span className="fs-2">
//                   ${productVarients?.details?.[0]?.price}
//                 </span>
//                 <div className="">
//                   <Ratings rating={3} />
//                   <p>({product.reviewsCount} Reviews)</p>
//                 </div>
//                 <div className="mb-1">
//                   <label htmlFor="quantity" className="form-label">
//                     Quantity
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="quantity"
//                     value={quantity}
//                     min="50"
//                     onChange={(e) => setQuantity(e.target.value)}
//                   />
//                 </div>
//                 <button className="btn btn-primary w-100 mb-2">
//                   <i
//                     className="fa fa-shopping-cart"
//                     style={{ fontSize: "20px" }}
//                   ></i>
//                   Add to Cart
//                 </button>
//                 <button className="btn btn-outline-primary w-100">
//                   Get Quote
//                 </button>

//                 <div className="mt-2">
//                   <form className="my-3">
//                     <label className="form-lable">Color : </label>
//                     <div className="card-body mt-2">
//                       {console.log("imagesList ", imagesList)}
//                       {allImagesList.map((image, index) => (
//                         <img
//                           key={index}
//                           src={`${baseUrl}/${image}`}
//                           alt={`Thumbnail ${index + 1}`}
//                           className="img-thumbnail cursor-pointer mx-2 bg-light"
//                           style={{
//                             width: "100px",
//                             height: "100px",
//                             objectFit: "cover",
//                           }}
//                           onClick={() => handleImageClick(image)}
//                         />
//                       ))}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-lg-3 col-md-3 col-12">
//             <center>
//               <p>Ongoing Offers!</p>
//             </center>
//             <div>
//               <div class="card mb-3" style={{ maxWidth: "540px" }}>
//                 <div class="row g-0">
//                   <div class="col-md-4 bg-primary">
//                     <center className="my-5">
//                       <b>Flate Rs. 250 off</b>
//                     </center>
//                   </div>
//                   <div class="col-md-8">
//                     <div class="card-body">
//                       <p class="card-text">
//                         Flat $250 off on minimum merchendise value $999! Use
//                         codeFEST250
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="card mb-3" style={{ maxWidth: "540px" }}>
//                 <div class="row g-0">
//                   <div class="col-md-4 bg-primary">
//                     <center className="my-5">
//                       <b>Flate Rs. 250 off</b>
//                     </center>
//                   </div>
//                   <div class="col-md-8">
//                     <div class="card-body">
//                       <p class="card-text">
//                         Flat $250 off on minimum merchendise value $999! Use
//                         codeFEST250
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-5">
//           <ul className="nav nav-tabs" id="myTab" role="tablist">
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link active"
//                 id="description-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#description"
//                 type="button"
//                 role="tab"
//                 aria-controls="description"
//                 aria-selected="true"
//               >
//                 Description
//               </button>
//             </li>
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link"
//                 id="specification-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#specification"
//                 type="button"
//                 role="tab"
//                 aria-controls="specification"
//                 aria-selected="false"
//               >
//                 Specification
//               </button>
//             </li>
//             <li className="nav-item" role="presentation">
//               <button
//                 className="nav-link"
//                 id="review-tab"
//                 data-bs-toggle="tab"
//                 data-bs-target="#review"
//                 type="button"
//                 role="tab"
//                 aria-controls="review"
//                 aria-selected="false"
//               >
//                 Review
//               </button>
//             </li>
//           </ul>
//           <div className="tab-content mt-3" id="myTabContent">
//             <div
//               className="tab-pane fade show active"
//               id="description"
//               role="tabpanel"
//               aria-labelledby="description-tab"
//             >
//               {/* {parse(product.description)} */}
//             </div>
//             <div
//               className="tab-pane fade"
//               id="specification"
//               role="tabpanel"
//               aria-labelledby="specification-tab"
//             >
//               <p>
//                 Specification details would go here. Lorem ipsum dolor sit amet,
//                 consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
//                 fringilla.
//               </p>
//             </div>
//             <div
//               className="tab-pane fade"
//               id="review"
//               role="tabpanel"
//               aria-labelledby="review-tab"
//             >
//               <p>
//                 Review details would go here. Lorem ipsum dolor sit amet,
//                 consectetur adipiscing elit. Proin ac arcu vitae urna sagittis
//                 fringilla.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
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
import FilterCardAddToCart from "../cards/FilterCardAddToCart";

function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState(watch);
  const [imagesList, setImagesList] = useState([]);
  const [allImagesList, setAllImagesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [productVarients, setProductVarients] = useState([]);
  const [AllProductVarients, setAllProductVarients] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [quantity, setQuantity] = useState(50);
  const vid = location.state?.data;
  const { slug } = useParams();

  const updatePriceBasedOnQuantity = (quantity) => {
    return product.price * (quantity / 50);
  };

  const handleFilterSelection = (filterData) => {
    console.log("Filterdata ki mbhb ", filterData);
    const { key, values } = filterData;

    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.key === key
      );

      let updatedFilters = [...prevFilters];

      if (existingFilterIndex !== -1) {
        updatedFilters[existingFilterIndex].values = values;
      } else {
        updatedFilters = [...prevFilters, { key, values }];
      }
      console.log("AllProductVarients ", AllProductVarients);

      const filterMap = filters.reduce((acc, filter) => {
        acc[filter.key] = filter.values;
        return acc;
      }, {});
      function isVariantMatching(variant, filterMap) {
        return Object.keys(filterMap).every((key) => {
          const filterValues = filterMap[key];

          if (filterValues.length === 0) {
            return true;
          }

          const variantValue = (variant[key] || "").toLowerCase();
          const normalizedFilterValues = filterValues.map((value) =>
            value.toLowerCase()
          );

          return normalizedFilterValues.includes(variantValue);
        });
      }

      const filteredVariants = AllProductVarients.map((product) => {
        const matchingVariants = product.variants.filter((variantObj) =>
          variantObj.varients.some((variant) =>
            isVariantMatching(variant, filterMap)
          )
        );

        return {
          ...product,
          variants: matchingVariants,
        };
      }).filter((product) => product.variants.length > 0);

      console.log("filteredVariants ki maa ", filteredVariants);
      if (filteredVariants.length > 0) {
        const matchingVariant = filteredVariants[0].variants.find(
          (variantItem) =>
            variantItem.details.some(
              (detail) => detail[key] && detail[key].includes(values[0])
            )
        );

        if (matchingVariant) {
          setProductVarients(matchingVariant);
          const images = matchingVariant.details[0]?.images || [];
          setImagesList(images);
          setSelectedImage(images[0]);
        }
      } else {
        swalError("Warning", "No matching variant found.", () => {
          setShowModal(false);
        });
      }

      return updatedFilters;
    });
  };

  const fetchProductData = async () => {
    try {
      const res = await API_WRAPPER.get(`/product/${slug}`);
      const data = res.data;
      if (res.status === 200) {
        const productVariantDetails = data.productVariantDetails[0];
        setProduct(data.productVariantDetails);
        setFilterList(data.filterList);
        const extractImages = (data) => {
          if (!Array.isArray(data.productVariantDetails)) {
            console.error(
              "productVariantDetails is not an array:",
              data.productVariantDetails
            );
            return [];
          }

          const allImagesList = data.productVariantDetails.flatMap(
            (variant, variantIndex) => {
              if (!Array.isArray(variant.variants)) {
                console.error("variants is not an array for variant:", variant);
                return [];
              }

              return (variant.variants || []).flatMap(
                (variantItem, variantIndex) => {
                  if (!Array.isArray(variantItem.details)) {
                    console.error(
                      "details is not an array for variantItem:",
                      variantItem
                    );
                    return [];
                  }

                  return (variantItem.details || []).flatMap(
                    (detail, detailIndex) => {
                      if (!Array.isArray(detail.images)) {
                        console.error(
                          "images is not an array for detail:",
                          detail
                        );
                        return [];
                      }
                      return (detail.images || []).filter((image) => image);
                    }
                  );
                }
              );
            }
          );

          console.log("Final images list:", allImagesList);
          return allImagesList;
        };

        const allImages = extractImages(data);
        setAllImagesList(allImages);

        setAllProductVarients(data.productVariantDetails);
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
    console.log("All Images List:", allImagesList);
  }, [allImagesList]);

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
                  {filterList &&
                    Object.keys(filterList).map((filter) => (
                      <FilterCardAddToCart
                        key={filter}
                        title="Product Filter"
                        onSelect={handleFilterSelection}
                        heading={filter}
                        filters={filterList[filter].map((filterName) => ({
                          filterName,
                        }))}
                      />
                    ))}
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
