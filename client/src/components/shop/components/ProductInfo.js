import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import API_WRAPPER from "../../../api";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";
import Card from "../../ui/Card/index.js";
import watch from '../../../assets/images/watch.jpg'
function ProductInfo() {
  const isLogged = localStorage.getItem("token");
  const [selectedImage, setSelectedImage] = useState();
  const [imagesList, setImagesList] = useState();
  const [product, setProduct] = useState();
  const [slug, setSlug] = useState();
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState();

  const params = useParams();

  const fetchProductData = async () => {
    //   const response = await API_WRAPPER.get(`/product/${slug}`);
    //   if (response.data) {
    //     setProduct(response.data);
    //     console.log("RESPONSE PRODUCT DATA:", response.data);
    //     // cheanged to cover image instead of first index of images arr
    //     setSelectedImage(response.data.coverImage);
    //     extractVariantsData(response.data?.variants);
    //     if (response?.data?.variants?.length < 1) {
    //       setImagesList(response.data.images);
    //     }
    //     setMrp(
    //       response?.data?.variants.length > 0 && response.data?.variants[0].mrp
    //     );
    //     if (response?.data?.variants.length > 0) {
    //       if (response?.data?.variants[0]?.dynamic_price?.length > 0) {
    //         // Handle the case when dynamic_price has length > 0
    //         // You can access the dynamic_price[0]["price"] here
    //         setPrice(response?.data?.variants[0]?.dynamic_price[0]["price"]);
    //       } else {
    //         // Handle the case when dynamic_price has length 0
    //         // You can access response.data?.variants[0].price here
    //         setPrice(response.data?.variants[0].price);
    //       }
    //     } else {
    //       // Handle the case when variants has length 0
    //       // You can access response?.data?.price here
    //       setPrice(response?.data?.price);
    //     }
    //     updatePriceBasedOnQuantity(50);
    //   }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-lg-9 col-md-9 col-12">
            <div className="row">
                <InnerImageZoom
                  className="col col-lg-4 col-md-12 col-12 rounded-3 w-75"
                  src={watch}
                  zoomType="hover"
                  zoomScale={1.5}
                />
              <div className="col col-lg-8 col-md-12 col-12">2</div>
            </div>
          </div>
          <div className="col col-lg-3 col-md-3 col-12">2</div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
