import DashboardCard from "../../../components/ui/DashboardCard";
import {
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  TotalSalesIcon,
} from "../../../icons/index";
import { useState , useEffect } from "react";
const DashboardCardsList = () => {
  const [cardData, setCardData] = useState();
  const [role, setRole] = useState();

  const fetchdashboardCardsData = async () => {
    const role = localStorage.getItem("role");
    console.log("Role------ ", role);
    // const response = await API_WRAPPER.get("/dashboard/cards");
    // console.log("DashboardCardsList.jsx", response);
    // setCardData(response?.data);
    // const token = localStorage.getItem("token");
    // const { role } = decodeToken(token);
    setRole(role);
  };

  useEffect(() => {
    fetchdashboardCardsData();
  }, []);

  return (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mt-2">
            <DashboardCard
              number={1}
              subheading="Total Sales"
              iconColor="bg-danger"
              iconSvg={<TotalSalesIcon />}
            />
            <DashboardCard
              number={2}
              subheading="No. of Orders"
              iconSvg={<NoOfOrders />}
              iconColor="bg-success"
            />
            <DashboardCard
              number={3}
              subheading="Total No. of Products"
              iconSvg={<NoOfProducts />}
              iconColor="bg-warning"
            />
            <DashboardCard
              number={4}
              subheading="No. of Vendors"
              iconSvg={<NoOfVendors />}
              iconColor="bg-primary"
            />
          </div>
  );
};

export default DashboardCardsList;
