import { useEffect, useState } from "react";
import DashboardCard from "../../../components/ui/DashboardCard";
import {
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  TotalSalesIcon,
} from "../../../icons/index";

import API_WRAPPER from "../../../api";
import { decodeToken } from "react-jwt";
import { AiFillHeart } from "react-icons/ai";
import { BsCashCoin } from "react-icons/bs";

const DashboardCardsList = () => {
  const [cardData, setCardData] = useState();
  const [role, setRole] = useState();

  const fetchdashboardCardsData = async () => {
    const role = localStorage.getItem("role");
    try {
      const response = await API_WRAPPER.get("/dashboard/cards");
      setCardData(response?.data);
      const token = localStorage.getItem("token");
      const { role } = decodeToken(token);
      setRole(role);
    } catch (error) {
      console.log("Error in DashboardCard List ", error);
    }
  };

  useEffect(() => {
    fetchdashboardCardsData();
  }, []);

  return (
    <div className="mt-4">
      {role && (
        <div className="container">
          {/* Admin Dashboard */}
          {role === "admin" && (
            <div className="row">
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.sales}
                  subheading="Total Sales"
                  iconColor="bg-danger"
                  textColor="text-danger"
                  iconSvg={<TotalSalesIcon />}
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.orders}
                  subheading="No. of Orders"
                  iconSvg={<NoOfOrders />}
                  iconColor="bg-success"
                  textColor="text-success"
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.products}
                  subheading="Total No. of Products"
                  iconSvg={<NoOfProducts />}
                  iconColor="bg-warning"
                  textColor="text-warning"
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.vendors}
                  subheading="No. of Vendors"
                  iconSvg={<NoOfVendors />}
                  iconColor="bg-primary"
                  textColor="text-primary"
                />
              </div>
            </div>
          )}

          {/* Vendor Dashboard */}
          {role === "vendor" && (
            <div className="row">
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.sales}
                  subheading="Total Sales"
                  iconColor="bg-danger"
                  iconSvg={<TotalSalesIcon />}
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.orders}
                  subheading="No. of Orders"
                  iconSvg={<NoOfOrders />}
                  iconColor="bg-success"
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.products}
                  subheading="Total No. of Products"
                  iconSvg={<NoOfProducts />}
                  iconColor="bg-warning"
                />
              </div>
            </div>
          )}

          {/* Customer Dashboard */}
          {role === "customer" && (
            <div className="row">
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.orders}
                  subheading="Total orders"
                  iconColor="bg-danger"
                  iconSvg={<NoOfProducts />}
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.wishlist}
                  subheading="No. of items in Wishlist"
                  iconSvg={<AiFillHeart />}
                  iconColor="bg-success"
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.cart}
                  subheading="No. of items in cart"
                  iconSvg={<NoOfOrders />}
                  iconColor="bg-warning"
                />
              </div>
              <div className="col col-lg-3 col-md-6 col-12">
                <DashboardCard
                  number={cardData?.orderValue}
                  subheading="Total order value"
                  iconSvg={<BsCashCoin />}
                  iconColor="bg-warning"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardCardsList;
