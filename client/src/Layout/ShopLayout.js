import PropTypes from "prop-types";
import SouvnirsHeader from "../components/shop/headers/SouvnirsHeader";
import ShopNavbar from "../components/shop/headers/ShopNavbar";
const ShopLayout = ({ children }) => {
  return (
    <div className="">
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <ShopNavbar />
      <div className="mx-5 flex flex-col">{children}</div>

      {/* <div className="">
        </div> */}

      {/* <TopHeader
        heading="World Wide Completely Free Returns and Free Shipping"
        language="English"
        currency="INR"
      />
      <div className="mx-5 flex flex-col">{children}</div>
      <ShopFooter /> */}
    </div>
  );
};

export default ShopLayout;

// ShopLayout.propTypes = {
//   children: PropTypes.node.isRequired,
// };
