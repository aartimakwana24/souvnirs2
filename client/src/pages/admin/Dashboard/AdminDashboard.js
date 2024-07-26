import React from "react";
import Header from "../../../components/ui/Header";
import adminDashBoardLeft from "../../../assets/images/adminDashboardLeft.png";
import DashboardCardsList from "./DashboardCardsList";
import TotalSalesTab from './TotalSalesTab';
import VendorAndOrderList from "./VendorAndOrderList";
import TransactionTotalIncomeInquiries from "./TransactionTotalIncomeInquiries";
import ReturnExchangeAdd from "./ReturnExchangeAdd";


function AdminDashboard() {
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          {/* Header */}
          <Header
            heading="Admin Dashboard"
            subheading="This is admin dashboard which provides all the details in a very concise and user-friendly way."
            image={adminDashBoardLeft}
          />
          <DashboardCardsList />
          <TotalSalesTab />
          <VendorAndOrderList/>
          <TransactionTotalIncomeInquiries/>
          <ReturnExchangeAdd/>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
