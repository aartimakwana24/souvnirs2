import PropTypes from "prop-types";
import SouvnirsHeader from "../components/shop/headers/SouvnirsHeader";
import ShopNavbar from "../components/shop/headers/ShopNavbar";
import ShopFooter from "../components/shop/footers";

const ShopLayout = ({ children }) => {
  return (
    <div className="">
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <ShopNavbar />
      <div className="mx-5 flex flex-col">{children}</div>
      <ShopFooter />
    </div>
  );
};

export default ShopLayout;