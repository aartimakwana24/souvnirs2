import { GoDot } from "react-icons/go";
import Ratings from "../../components/shop/components/Ratings";
import { ShopIcon } from "../../icons";
import { useNavigate } from "react-router-dom";
import watch from '../../assets/images/watch1.png';
import './index.css';
const SingleTab = ({ heading }) => {
  const productsList = [
    {
      _id: "1",
      slug: "product-1",
      coverImage: watch,
      name: "Product 1",
      variant: [{ price: 150 }],
      price: 20000,
    },
    {
      _id: "2",
      slug: "product-1",
      coverImage: watch,
      name: "Product 1",
      variant: [{ price: 150 }],
      price: 20000,
    },
    {
      _id: "2",
      slug: "product-1",
      coverImage: watch,
      name: "Product 1",
      variant: [{ price: 150 }],
      price: 20000,
    },
    {
      _id: "4",
      slug: "product-1",
      coverImage: watch,
      name: "Product 1",
      variant: [{ price: 150 }],
      price: 20000,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="container bg-light">
      <div
        className="overflow-auto bg-white custom-scrollbar"
        style={{
          height: "600px",
          marginTop: "16px",
          flex: "1 1 0%",
          marginLeft: "40px",
        }}
      >
        <div
          className="d-flex align-items-center border-bottom"
          style={{
            width: "325px",
            marginTop: "0px",
            position: "sticky",
            top: "0px",
            zIndex: "10",
            background: "white",
          }}
        >
          <h1
            className="fw-semibold border-bottom border-4 py-2 d-flex align-items-center"
            style={{ fontSize: "27.37px" }}
          >
            <GoDot className="fs-3 text-primary" />
            {heading}
          </h1>
        </div>
        {/* row 1 */}
        {productsList.slice(0, 10).map((product) => (
          <div
            key={product._id}
            onClick={() => {
              //   navigate(`/productInfo/${product.slug}`);
            }}
            className="d-inline-flex cursor-pointer w-100"
            style={{
              height: "125.92px",
              justifyContent: "start",
              alignItems: "end",
              marginTop: "32px",
            }}
          >
            <div className="d-flex justify-content-start align-items-start">
              <img
                className="w-100 h-100"
                style={{ width: "122.01px", height: "122.01px" }}
                src={product.coverImage}
                alt="Product"
              />
            </div>
            <div className="flex-grow-1 d-inline-flex flex-column justify-content-start align-items-start ps-3 pe-3">
              <div className="d-inline-flex justify-content-center align-items-center mt-2">
                <div className="text-muted fs-5 fw-medium">
                  {product.name.slice(0, 40)}...
                  <br />
                  XP
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-start align-items-start w-100"
                style={{ height: "57.66px", paddingTop: "4.56px" }}
              >
                <div className="text-primary fs-4 fw-medium">
                  ₹{" "}
                  {Math.ceil(
                    product.variant && product.variant.length > 0
                      ? product.variant[0].price
                      : product.price / 100
                  ) *
                    100 <=
                  100
                    ? "less than ₹100"
                    : `₹${
                        Math.floor(
                          product.variant && product.variant.length > 0
                            ? product.variant[0].price
                            : product.price / 100
                        ) * 100
                      }-${
                        Math.ceil(
                          product.variant && product.variant.length > 0
                            ? product.variant[0].price
                            : product.price / 100
                        ) * 100
                      }`}
                </div>
                <div className="d-flex align-items-center justify-content-between w-100 cursor-pointer mt-2 gap-2">
                  <Ratings rating={4} />
                  <div className="px-2 py-1 border rounded-pill ms-2">
                    <ShopIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleTab;
