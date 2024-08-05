// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import parse from "html-react-parser";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import watch from "../../../assets/images/watch.jpg";
// import { BiArrowBack } from "react-icons/bi";
// import API_WRAPPER, { baseUrl } from "../../../api";
// import success, { swalError } from "../../../utils";
// import Ratings from "./Ratings";
// import FilterCardAddToCart from "../cards/FilterCardAddToCart";

// function ProductInfo() {
//   const [selectedImage, setSelectedImage] = useState(watch);
//   const [imagesList, setImagesList] = useState([]);
//   const [allImagesList, setAllImagesList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const [product, setProduct] = useState([]);
//   const [productVarients, setProductVarients] = useState([]);
//   const [AllProductVarients, setAllProductVarients] = useState([]);
//   const [filterList, setFilterList] = useState([]);
//   const [displayedPrice, setDisplayedPrice] = useState(5000);
//   const [filters, setFilters] = useState({});
//   const [quantity, setQuantity] = useState(50);
//   const vid = location.state?.data;
//   const { slug } = useParams();

//   // const updatePriceBasedOnQuantity = (quantity) => {
//   //   return product.price * (quantity / 50);
//   // };

//    const updatePriceBasedOnQuantity = (quantity) => {
//      const priceData = productVarients?.details?.[0]?.data || [];

//      // Default price
//      let price =
//        productVarients?.details?.[0]?.price ||
//        productVarients?.details?.[0]?.price;

//      for (let i = 0; i < priceData.length; i++) {
//        const { minQuantity, price: variantPrice } = priceData[i];
//        if (quantity >= minQuantity) {
//          price = variantPrice;
//        }
//      }

//      setDisplayedPrice(price);
//    };

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

//       if (filteredVariants.length > 0) {
//         setProductVarients(filteredVariants[0]);
//         const images = filteredVariants[0].details[0]?.images || [];
//         setImagesList(images);
//         setSelectedImage(images[0]);
//       } else {
//         swalError("Warning", "No matching variant found.", () => {
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

//         const allImages = extractImages(data);
//         setAllImagesList(allImages);

//         setAllProductVarients(data.productVariantDetails);
//         const matchingVariant = data.productVariantDetails
//           .flatMap((product) => product.variants)
//           .find((variant) => variant._id === vid);

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

//   const extractImages = (data) => {
//     if (!Array.isArray(data.productVariantDetails)) {
//       console.error(
//         "productVariantDetails is not an array:",
//         data.productVariantDetails
//       );
//       return [];
//     }

//     const allImagesList = data.productVariantDetails.flatMap((variant) => {
//       if (!Array.isArray(variant.variants)) {
//         console.error("variants is not an array for variant:", variant);
//         return [];
//       }

//       return variant.variants.flatMap((variantItem) => {
//         if (!Array.isArray(variantItem.details)) {
//           console.error(
//             "details is not an array for variantItem:",
//             variantItem
//           );
//           return [];
//         }

//         return variantItem.details.flatMap((detail) => {
//           if (!Array.isArray(detail.images)) {
//             console.error("images is not an array for detail:", detail);
//             return [];
//           }
//           return detail.images.filter((image) => image);
//         });
//       });
//     });

//     return allImagesList;
//   };

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
//                 {console.log("productVarients ta tang ", productVarients)}
//                 <span className="fs-2">
//                   ${productVarients?.details?.[0]?.price}
//                 </span>
//                 <div className="">
//                   <Ratings rating={3} />
//                   {/* <p>({product.reviewsCount} Reviews)</p> */}
//                   <p>10 (Reviews)</p>
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
//                     onChange={(e) => setQuantity(parseInt(e.target.value))}
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
//                   {filterList &&
//                     Object.keys(filterList).map((filter) => (
//                       <FilterCardAddToCart
//                         key={filter}
//                         title="Product Filter"
//                         onSelect={handleFilterSelection}
//                         heading={filter}
//                         filters={filterList[filter].map((filterName) => ({
//                           filterName,
//                         }))}
//                         defaultSelection={productVarients[filter] || ""}
//                       />
//                     ))}
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
//       </div>
//     </>
//   );
// }

// export default ProductInfo;

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useParams } from "react-router-dom";
// import parse from "html-react-parser";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
// import watch from "../../../assets/images/watch.jpg";
// import { BiArrowBack } from "react-icons/bi";
// import API_WRAPPER, { baseUrl } from "../../../api";
// import success, { swalError } from "../../../utils";
// import Ratings from "./Ratings";
// import FilterCardAddToCart from "../cards/FilterCardAddToCart";

// function ProductInfo() {
//   const [selectedImage, setSelectedImage] = useState(watch);
//   const [imagesList, setImagesList] = useState([]);
//   const [allImagesList, setAllImagesList] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const location = useLocation();
//   const [product, setProduct] = useState([]);
//   const [productVarients, setProductVarients] = useState([]);
//   const [AllProductVarients, setAllProductVarients] = useState([]);
//   const [filterList, setFilterList] = useState([]);
//   const [displayedPrice, setDisplayedPrice] = useState(5000);
//   const [filters, setFilters] = useState({});
//   const [quantity, setQuantity] = useState(50);
//   const vid = location.state?.data;
//   const { slug } = useParams();

//   // const updatePriceBasedOnQuantity = (quantity) => {
//   //   return product.price * (quantity / 50);
//   // };
//   const handleQuantityChange = (e) => {
//     const newQuantity = parseInt(e.target.value);
//     setQuantity(newQuantity);
//     updatePriceBasedOnQuantity(newQuantity);
//   };
//   const updatePriceBasedOnQuantity = (quantity) => {
//     const priceData = productVarients?.details?.[0]?.data || [];

//     console.log("Price data ", priceData);

//     let price =
//       productVarients?.details?.[0]?.price ||
//       productVarients?.details?.[0]?.price;

//     for (let i = 0; i < priceData.length; i++) {
//       const { minQuantity, price: variantPrice } = priceData[i];
//       console.log("quantity ", quantity);
//       console.log("variantPrice ", variantPrice);
//       if (quantity >= minQuantity) {
//         price = variantPrice;
//       }
//     }

//     setDisplayedPrice(price);
//   };

// const handleFilterSelection = (filterData) => {
//   const { key, values } = filterData;

//   setFilters((prevFilters) => {
//     const updatedFilters = { ...prevFilters, [key]: values };

//     const filterMap = Object.keys(updatedFilters).reduce((acc, filterKey) => {
//       acc[filterKey] = updatedFilters[filterKey];
//       return acc;
//     }, {});

//     function isVariantMatching(variant, filterMap) {
//       return Object.keys(filterMap).every((filterKey) => {
//         const filterValues = filterMap[filterKey];
//         if (filterValues.length === 0) return true;
//         const variantValue = (variant[filterKey] || "").toLowerCase();
//         return filterValues
//           .map((val) => val.toLowerCase())
//           .includes(variantValue);
//       });
//     }

//     const filteredVariants = AllProductVarients.flatMap((product) =>
//       product.variants.filter((variantObj) =>
//         variantObj.varients.some((variant) =>
//           isVariantMatching(variant, filterMap)
//         )
//       )
//     );

//     if (filteredVariants.length > 0) {
//       setProductVarients(filteredVariants[0]);
//       const images = filteredVariants[0].details[0]?.images || [];
//       setImagesList(images);
//       setSelectedImage(images[0]);
//     } else {
//       swalError("Warning", "No matching variant found.", () => {
//         setShowModal(false);
//       });
//     }

//     return updatedFilters;
//   });
// };

//   const fetchProductData = async () => {
//     try {
//       const res = await API_WRAPPER.get(`/product/${slug}`);
//       const data = res.data;
//       if (res.status === 200) {
//         setProduct(data.productVariantDetails);
//         setFilterList(data.filterList);

//         const allImages = extractImages(data);
//         setAllImagesList(allImages);

//         setAllProductVarients(data.productVariantDetails);
//         const matchingVariant = data.productVariantDetails
//           .flatMap((product) => product.variants)
//           .find((variant) => variant._id === vid);

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

//   const extractImages = (data) => {
//     if (!Array.isArray(data.productVariantDetails)) {
//       console.error(
//         "productVariantDetails is not an array:",
//         data.productVariantDetails
//       );
//       return [];
//     }

//     const allImagesList = data.productVariantDetails.flatMap((variant) => {
//       if (!Array.isArray(variant.variants)) {
//         console.error("variants is not an array for variant:", variant);
//         return [];
//       }

//       return variant.variants.flatMap((variantItem) => {
//         if (!Array.isArray(variantItem.details)) {
//           console.error(
//             "details is not an array for variantItem:",
//             variantItem
//           );
//           return [];
//         }

//         return variantItem.details.flatMap((detail) => {
//           if (!Array.isArray(detail.images)) {
//             console.error("images is not an array for detail:", detail);
//             return [];
//           }
//           return detail.images.filter((image) => image);
//         });
//       });
//     });

//     return allImagesList;
//   };

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
//                 {console.log("productVarients ta tang ", productVarients)}
//                 <span className="fs-2">
//                   ${productVarients?.details?.[0]?.price}
//                 </span>
//                 <div className="">
//                   <Ratings rating={3} />
//                   {/* <p>({product.reviewsCount} Reviews)</p> */}
//                   <p>10 (Reviews)</p>
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
//                     // onChange={(e) => setQuantity(parseInt(e.target.value))}
//                     onChange={handleQuantityChange}
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
//                   {filterList &&
//                     Object.keys(filterList).map((filter) => (
//                       <FilterCardAddToCart
//                         key={filter}
//                         title="Product Filter"
//                         onSelect={handleFilterSelection}
//                         heading={filter}
//                         filters={filterList[filter].map((filterName) => ({
//                           filterName,
//                         }))}
//                         defaultSelection={productVarients[filter] || ""}
//                       />
//                     ))}
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
//       </div>
//     </>
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
  const [currency, setCurrency] = useState("$");
  const [quantity, setQuantity] = useState(1);
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
    let price = productVarients?.details?.[0]?.price || 0;
              console.log("priceData ", priceData);
    for (let i = 0; i < priceData.length; i++) {
      const { minQuantity, price: variantPrice, currency } = priceData[i];
      if (quantity >= minQuantity) {
        price = variantPrice;
      }
    }

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

      const filteredVariants = AllProductVarients.flatMap((product) =>
        product.variants.filter((variantObj) =>
          variantObj.varients.some((variant) =>
            isVariantMatching(variant, filterMap)
          )
        )
      );

      if (filteredVariants.length > 0) {
        setProductVarients(filteredVariants[0]);
        const images = filteredVariants[0].details[0]?.images || [];
        setImagesList(images);
        setSelectedImage(images[0]);
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
        setProduct(data.productVariantDetails);
        setFilterList(data.filterList);

        setAllProductVarients(data.productVariantDetails);
        const matchingVariant = data.productVariantDetails
          .flatMap((product) => product.variants)
          .find((variant) => variant._id === vid);

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
              <span className="fs-2">{currency}{displayedPrice}</span>
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
                      defaultSelection={productVarients[filter] || ""}
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
    </div>
  );
}

export default ProductInfo;
