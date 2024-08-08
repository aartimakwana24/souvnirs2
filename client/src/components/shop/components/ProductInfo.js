// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import API_WRAPPER, { baseUrl } from "../../../api";
// import success, { swalError } from "../../../utils";
// import Ratings from "./Ratings";
// import FilterCardAddToCart from "../cards/FilterCardAddToCart";

// function ProductInfo() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagesList, setImagesList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const [product, setProduct] = useState([]);
//   const [productVarients, setProductVarients] = useState([]);
//   const [AllProductVarients, setAllProductVarients] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [filterList, setFilterList] = useState([]);
//   const [displayedPrice, setDisplayedPrice] = useState(0);
//   const [defaultSelections, setDefaultSelections] = useState({});
//   const [currency, setCurrency] = useState("$");
//   const [quantity, setQuantity] = useState(1);
//   const vid = location.state?.data;
//   const { slug } = useParams();

//   useEffect(() => {
//     fetchProductData();
//   }, [slug]);

//   useEffect(() => {
//     if (productVarients?.details?.[0]?.price) {
//       setDisplayedPrice(productVarients.details[0].price);
//     }
//   }, [productVarients]);

//   const handleQuantityChange = (e) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     setQuantity(newQuantity);
//     updatePriceBasedOnQuantity(newQuantity);
//   };

//   const updatePriceBasedOnQuantity = (quantity) => {
//     const priceData = productVarients?.details?.[0]?.data || [];
//     let currency = "$";
//     let price = productVarients?.details?.[0]?.price || 0;
//     for (let i = 0; i < priceData.length; i++) {
//       const {
//         minQuantity,
//         price: variantPrice,
//         currency: variantCurrency,
//       } = priceData[i];
//       if (quantity >= minQuantity) {
//         price = variantPrice;
//         currency = variantCurrency;
//       }
//     }

//     setCurrency(currency);
//     setDisplayedPrice(price);
//   };

//   const handleFilterSelection = (filterData) => {
//     const { key, values } = filterData;

//     setFilters((prevFilters) => {
//       const updatedFilters = { ...prevFilters, [key]: values };

//       const filterMap = Object.keys(updatedFilters).reduce((acc, filterKey) => {
//         acc[filterKey] = updatedFilters[filterKey];
//         return acc;
//       }, {});

//       function isVariantMatching(variant, filterMap) {
//         return Object.keys(filterMap).every((filterKey) => {
//           const filterValues = filterMap[filterKey];
//           if (filterValues.length === 0) return true;
//           const variantValue = (variant[filterKey] || "").toLowerCase();
//           return filterValues
//             .map((val) => val.toLowerCase())
//             .includes(variantValue);
//         });
//       }

//       const filteredVariants = AllProductVarients.flatMap((product) =>
//         product.variants.filter((variantObj) =>
//           variantObj.varients.some((variant) =>
//             isVariantMatching(variant, filterMap)
//           )
//         )
//       );

//       const validVariant = filteredVariants.find((variant) => {
//         const details = variant.details[0] || {};
//         return details.quantity > 0 && details.price > 0;
//       });

//       if (validVariant) {
//         setProductVarients(validVariant);
//         const images = validVariant.details[0]?.images || [];
//         setImagesList(images);
//         setSelectedImage(images[0]);
//       } else {
//         swalError("Warning", "This variant is not available.", () => {
//           setShowModal(false);
//         });
//       }

//       return updatedFilters;
//     });
//   };

//   const fetchProductData = async () => {
//     try {
//       const res = await API_WRAPPER.get(`/product/${slug}`);
//       const data = res.data;
//       if (res.status === 200) {
//         setProduct(data.productVariantDetails);
//         setFilterList(data.filterList);

//         setAllProductVarients(data.productVariantDetails);
//         const matchingVariant = data.productVariantDetails
//           .flatMap((product) => product.variants)
//           .find((variant) => variant._id === vid);

//         if (matchingVariant) {
//           setProductVarients(matchingVariant);
//           const images = matchingVariant.details[0]?.images || [];
//           setImagesList(images);
//           setSelectedImage(images[0]);

//           const defaultSelections = {};
//           if (matchingVariant.varients.length > 0) {
//             matchingVariant.varients[0] &&
//               Object.keys(matchingVariant.varients[0]).forEach((key) => {
//                 defaultSelections[key] = matchingVariant.varients[0][key];
//               });
//           }
//           setDefaultSelections(defaultSelections);
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

//   return (
//     <div className="container mt-4">
//       <Link to="/" className="btn btn-outline-secondary mb-4">
//         Back
//       </Link>

//       <div className="row" style={{ backgroundColor: "rgb(255, 253, 246)" }}>
//         <div className="col-lg-9 col-md-9 col-12">
//           <div className="row">
//             <div className="col-lg-6 col-md-12 col-12">
//               <div className="card my-3" style={{ width: "18rem;" }}>
//                 <InnerImageZoom
//                   className="rounded-3 d-flex justify-content-center my-2"
//                   src={`${baseUrl}/${selectedImage}`}
//                   zoomType="hover"
//                   zoomScale={1.5}
//                 />
//                 <div className="card-body mt-2">
//                   {imagesList.map((image, index) => (
//                     <img
//                       key={index}
//                       src={`${baseUrl}/${image}`}
//                       alt={`Thumbnail ${index + 1}`}
//                       className="img-thumbnail cursor-pointer mx-2 bg-light"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         objectFit: "cover",
//                       }}
//                       onClick={() => setSelectedImage(image)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="col-lg-6 col-md-12 col-12">
//               <h1 className="display-5">{product?.[0]?.name}</h1>
//               <span className="fs-2">
//                 {currency}
//                 {displayedPrice}
//               </span>
//               <div className="">
//                 <Ratings rating={3} />
//                 <p>10 (Reviews)</p>
//               </div>
//               <div className="mb-1">
//                 <label htmlFor="quantity" className="form-label">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id="quantity"
//                   value={quantity}
//                   min="1"
//                   onChange={handleQuantityChange}
//                 />
//               </div>
//               <button className="btn btn-primary w-100 mb-2">
//                 <i
//                   className="fa fa-shopping-cart"
//                   style={{ fontSize: "20px" }}
//                 ></i>
//                 Add to Cart
//               </button>
//               <button
//                 className="btn btn-outline-primary w-100"
//                 data-bs-toggle="modal"
//                 data-bs-target="#getQ"
//               >
//                 Get Quote
//               </button>

//               <div className="mt-2">
//                 {filterList &&
//                   Object.keys(filterList).map((filter) => {
//                     return (
//                       <FilterCardAddToCart
//                         key={filter}
//                         title="Product Filter"
//                         onSelect={handleFilterSelection}
//                         heading={filter}
//                         filters={filterList[filter].map((filterName) => ({
//                           filterName,
//                         }))}
//                         defaultSelection={defaultSelections[filter] || ""}
//                       />
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="col-lg-3 col-md-3 col-12">
//           <center>
//             <p>Ongoing Offers!</p>
//           </center>
//           <div>
//             <div className="card mb-3" style={{ maxWidth: "540px" }}>
//               <div className="row g-0">
//                 <div className="col-md-4 bg-primary">
//                   <center className="my-5">
//                     <b>Flat Rs. 250 off</b>
//                   </center>
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <p className="card-text">
//                       Flat $250 off on minimum merch purchase of Rs. 1000
//                     </p>
//                     <p className="card-text">
//                       <small className="text-muted">31 days remaining</small>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card mb-3" style={{ maxWidth: "540px" }}>
//               <div className="row g-0">
//                 <div className="col-md-4 bg-primary">
//                   <center className="my-5">
//                     <b>Flat Rs. 350 off</b>
//                   </center>
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <p className="card-text">
//                       Flat $350 off on minimum merch purchase of Rs. 2000
//                     </p>
//                     <p className="card-text">
//                       <small className="text-muted">15 days remaining</small>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         className="modal fade"
//         id="getQ"
//         tabindex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <form>
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   Get Quote
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label for="exampleInputEmail1" className="form-label">
//                     Quantity
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="quantity"
//                     name="quantity"
//                     min="1"
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="submit"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Save changes
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductInfo;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import API_WRAPPER, { baseUrl } from "../../../api";
import success, { swalError } from "../../../utils";
import Ratings from "./Ratings";
import FilterCardAddToCart from "../cards/FilterCardAddToCart";

function ProductInfo() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [productVarients, setProductVarients] = useState([]);
  const [AllProductVarients, setAllProductVarients] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterList, setFilterList] = useState([]);
  const [displayedPrice, setDisplayedPrice] = useState(0);
  const [defaultSelections, setDefaultSelections] = useState({});
  const [currency, setCurrency] = useState("$");
  const [quantity, setQuantity] = useState(1);
  const [disabledOptions, setDisabledOptions] = useState({});
  const vid = location.state?.data;
  const { slug } = useParams();

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  useEffect(() => {
    if (productVarients?.details?.[0]?.price) {
      setDisplayedPrice(productVarients.details[0].price);
    }
  }, [productVarients]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(newQuantity);
    updatePriceBasedOnQuantity(newQuantity);
  };

  const updatePriceBasedOnQuantity = (quantity) => {
    const priceData = productVarients?.details?.[0]?.data || [];
    let currency = "$";
    let price = productVarients?.details?.[0]?.price || 0;
    for (let i = 0; i < priceData.length; i++) {
      const {
        minQuantity,
        price: variantPrice,
        currency: variantCurrency,
      } = priceData[i];
      if (quantity >= minQuantity) {
        price = variantPrice;
        currency = variantCurrency;
      }
    }

    setCurrency(currency);
    setDisplayedPrice(price);
  };

  const handleFilterSelection = (filterData) => {
    const { key, values } = filterData;

    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [key]: values };

      const filterMap = Object.keys(updatedFilters).reduce((acc, filterKey) => {
        acc[filterKey] = updatedFilters[filterKey];
        return acc;
      }, {});

      function isVariantMatching(variant, filterMap) {
        return Object.keys(filterMap).every((filterKey) => {
          const filterValues = filterMap[filterKey];
          if (filterValues.length === 0) return true;
          const variantValue = (variant[filterKey] || "").toLowerCase();
          return filterValues
            .map((val) => val.toLowerCase())
            .includes(variantValue);
        });
      }

      console.log("AllProductVarients ", AllProductVarients);
      const filteredVariants = AllProductVarients.flatMap((product) =>
        product.variants.filter((variantObj) =>
          variantObj.varients.some((variant) =>
            isVariantMatching(variant, filterMap)
          )
        )
      );

      const validVariant = filteredVariants.find((variant) => {
        const details = variant.details[0] || {};
        return details.quantity > 0 && details.price > 0;
      });

      if (validVariant) {
        setProductVarients(validVariant);
        const images = validVariant.details[0]?.images || [];
        setImagesList(images);
        setSelectedImage(images[0]);
      } else {
        swalError("Warning", "This variant is not available.", () => {
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
      console.log("DAta ", data);
      if (res.status === 200) {
        // Set product details and filter list
        setProduct(data.productVariantDetails);
        setFilterList(data.filterList);
        setAllProductVarients(data.productVariantDetails);


        const disabledOptions = {};
        const enabledOptions = {};

        // First, collect all enabled options based on non-zero price and quantity
        data.productVariantDetails.forEach((product) => {
          product.variants.forEach((variant) => {
            const { price, quantity } = variant.details[0] || {};
            if (price > 0 && quantity > 0) {
              variant.varients.forEach((attr) => {
                Object.entries(attr).forEach(([key, value]) => {
                  if (!enabledOptions[key]) {
                    enabledOptions[key] = new Set();
                  }
                  enabledOptions[key].add(value);
                });
              });
            }
          });
        });

        // Next, identify which options are disabled
        data.productVariantDetails.forEach((product) => {
          product.variants.forEach((variant) => {
            const { price, quantity } = variant.details[0] || {};
            if (price === 0 || quantity === 0) {
              variant.varients.forEach((attr) => {
                Object.entries(attr).forEach(([key, value]) => {
                  if (!disabledOptions[key]) {
                    disabledOptions[key] = new Set();
                  }
                  // Only disable options that are not part of the enabled options
                  if (!enabledOptions[key] || !enabledOptions[key].has(value)) {
                    disabledOptions[key].add(value);
                  }
                });
              });
            }
          });
        });

        // Convert Sets to arrays for final output
        Object.keys(disabledOptions).forEach((key) => {
          disabledOptions[key] = Array.from(disabledOptions[key]);
        });

        setDisabledOptions(disabledOptions);

        const matchingVariant = data.productVariantDetails
          .flatMap((product) => product.variants)
          .find((variant) => variant._id === vid);

        if (matchingVariant) {
          setProductVarients(matchingVariant);
          const images = matchingVariant.details[0]?.images || [];
          setImagesList(images);
          setSelectedImage(images[0]);

          const defaultSelections = {};
          if (matchingVariant.varients.length > 0) {
            matchingVariant.varients[0] &&
              Object.keys(matchingVariant.varients[0]).forEach((key) => {
                defaultSelections[key] = matchingVariant.varients[0][key];
              });
          }
          setDefaultSelections(defaultSelections);
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

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-outline-secondary mb-4">
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
                {currency}
                {displayedPrice}
              </span>
              <div className="">
                <Ratings rating={3} />
                <p>10 (Reviews)</p>
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
                  min="1"
                  onChange={handleQuantityChange}
                />
              </div>
              <button className="btn btn-primary w-100 mb-2">
                <i
                  className="fa fa-shopping-cart"
                  style={{ fontSize: "20px" }}
                ></i>
                Add to Cart
              </button>
              <button
                className="btn btn-outline-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#getQ"
              >
                Get Quote
              </button>

              <div className="mt-2">
                {filterList &&
                  Object.keys(filterList).map((filter) => {
                    return (
                      <FilterCardAddToCart
                        key={filter}
                        title="Product Filter"
                        onSelect={handleFilterSelection}
                        heading={filter}
                        filters={filterList[filter].map((filterName) => ({
                          filterName,
                          disabled: (disabledOptions[filter] || []).includes(
                            filterName
                          ),
                        }))}
                        defaultSelection={defaultSelections[filter] || ""}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-12">
          <center>
            <p>Ongoing Offers!</p>
          </center>
          <div>
            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4 bg-primary">
                  <center className="my-5">
                    <b>Flat Rs. 250 off</b>
                  </center>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">
                      Flat $250 off on minimum merch purchase of Rs. 1000
                    </p>
                    <p className="card-text">
                      <small className="text-muted">31 days remaining</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4 bg-primary">
                  <center className="my-5">
                    <b>Flat Rs. 350 off</b>
                  </center>
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-text">
                      Flat $350 off on minimum merch purchase of Rs. 2000
                    </p>
                    <p className="card-text">
                      <small className="text-muted">15 days remaining</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="getQ"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form>
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Get Quote
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    name="quantity"
                    min="1"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
