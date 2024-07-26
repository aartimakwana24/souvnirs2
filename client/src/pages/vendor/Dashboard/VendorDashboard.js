import { ToastContainer } from "react-toastify";
import Header from "../../../components/ui/Header";
import DashboardCardsList from "./DashboardCardsList";
import TotalSalesTab from "../../admin/Dashboard/TotalSalesTab";
import TransactionTotalIncomeInquiries from "../../admin/Dashboard/TransactionTotalIncomeInquiries";
import VendorAndOrderList from "../../admin/Dashboard/VendorAndOrderList";

const VendorDashboard = () => {
  return (
 <div className="container my-3">
      <div className="row">
        <div className="col">
         <Header
        heading="Vendor Dashboard"
        subheading="This is Vendor dashboard which provides all the details in a very conscise and user friendly way. You get all the details from all modules on this page"
      />
           
      <DashboardCardsList />
      <TotalSalesTab />
      <TransactionTotalIncomeInquiries />
      <VendorAndOrderList />
      <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
