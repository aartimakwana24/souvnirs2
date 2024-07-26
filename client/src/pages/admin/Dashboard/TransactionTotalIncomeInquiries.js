import DashboardChartCart from "../../../components/ui/DashboardChartCard";
import Tabs from "../../../components/ui/Tabs";
import DoughnutChart from "../../../components/ui/Charts/DoughnutChart";
import DashboardPieChartCard from "../../../components/ui/DashboardPieChartCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./transactionTotalIncome.css";
import {
  BlueIncomeIcon,
  GrayVendors,
  GreenProductsIcon,
  SalesRedIcon,
} from "../../../icons";
const transactionTabs = [
  {
    label: "All Transactions",
    content: (
      <div className="max-h-[400px] ">
        <DashboardChartCart
          percentage="10.6%"
          percentageColor="text-danger"
          label="Apple Inc"
          totalAmount="#APLE-PRO-T00232"
          iconText="AI"
          dynamicAmount="$2,800"
        />
        <DashboardChartCart
          percentage="10.6%"
          percentageColor="text-success"
          label="Apple Inc"
          totalAmount="#APLE-PRO-T00232"
          iconText="AI"
          dynamicAmount="$2,800"
        />
        <DashboardChartCart
          percentage="10.6%"
          percentageColor="text-success"
          label="Apple Inc"
          totalAmount="#APLE-PRO-T00232"
          iconText="AI"
          dynamicAmount="$2,800"
        />
        <DashboardChartCart
          percentage="10.6%"
          percentageColor="text-success"
          label="Apple Inc"
          totalAmount="#APLE-PRO-T00232"
          iconText="AI"
          dynamicAmount="$2,800"
        />
        <DashboardChartCart
          percentage="10.6%"
          percentageColor="text-success"
          label="Apple Inc"
          totalAmount="#APLE-PRO-T00232"
          iconText="AI"
          dynamicAmount="$2,800"
        />
      </div>
    ),
  },
  {
    label: "Success",
    content: "Success Content",
  },
  {
    label: "Pending",
    content: "Pending Content",
  },
];

function TransactionTotalIncomeInquiries() {
  const [data, setData] = useState([10, 20, 30, 40]);
  const [labels, setLabels] = useState(["A", "B", "C", "D"]);
  const [fullData, setFullData] = useState();

  return (
    <>
      <div className="container my-5 bg-light">
        <div className="row gx-3">
          <div className="col col-lg-4 col-md-12 col-12 bg-light border border-1">
            <h6 className="text-lg m-1 ">Transactions</h6>
            <Tabs tabs={transactionTabs} />
          </div>
          <div className="col col-lg-5 col-md-12 col-12">
            <div className="col-span-10 md:col-span-4">
              <div className="p-4 py-8 h-full rounded bg-light border border-1">
                <h4 className="text-lg fw-bold">Total Income</h4>
                <div className="d-flex flex-column items-center">
                  <div className="my-4 pb-3 mb-5 doughnoutChart">
                    <DoughnutChart
                      data={{
                        labels: labels,
                        datasets: [
                          {
                            label: "# of Votes",
                            data: data,
                            backgroundColor: [
                              "rgba(255, 99, 132, 0.5)",
                              "rgba(54, 162, 235, 0.5)",
                              "rgba(255, 206, 86, 0.5)",
                              "rgba(75, 192, 192, 0.5)",
                              "rgba(153, 102, 255, 0.5)",
                              "rgba(255, 159, 64, 0.5)",
                            ],
                            borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                              "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                          },
                        ],
                      }}
                    />
                  </div>
                  <div className="row">
                    <div className="col col-lg-6 col-md-12 col-12">
                      <DashboardPieChartCard
                        label="Income"
                        addAmount={fullData?.income}
                        labelColor="bg-primary"
                        amount={fullData?.income}
                        icon={<BlueIncomeIcon />}
                      />
                    </div>
                    <div className="col col-lg-6 col-md-12 col-12">
                      <DashboardPieChartCard
                        label="Sales"
                        addAmount=""
                        labelColor="bg-warning"
                        amount={fullData?.sales}
                        icon={<SalesRedIcon />}
                      />
                    </div>
                    <div className="col col-lg-6 col-md-12 col-12">
                      <DashboardPieChartCard
                        label="Products"
                        addAmount=""
                        labelColor="bg-success"
                        amount={fullData?.products}
                        icon={<GreenProductsIcon />}
                      />
                    </div>
                    <div className="col col-lg-6 col-md-12 col-12">
                      <DashboardPieChartCard
                        label="Vendors"
                        addAmount=""
                        labelColor="bg-primary"
                        amount={fullData?.vendors}
                        icon={<GrayVendors />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-3 col-md-12 col-12 bg-light border border-1">
            <div className="d-flex flex-column mt-4">
              {/* <p className="p-4 border border-1 border-light">Pending requests</p> */}
              <div className="p-3  border-bottom">income requests</div>

              <div className="p-3  border-bottom">
                You have 2 pending requests
              </div>
              <div className="p-3  border-bottom">
                You have 3 pending orders
              </div>
              <div className="p-3  border-bottom">
                You have 2 pending inquiries
              </div>
              <div className="p-3  border-bottom">New order received</div>
              <div className="p-3  border-bottom">
                You have 2 pending requests
              </div>
              <div className="p-3  border-bottom">
                You have 3 pending orders
              </div>
              <div className="p-3  border-bottom">New order received</div>
              <div className="p-3  border-bottom">New order received</div>
              <Link className="d-flex justify-content-end text-primary fw-bold pe-4 mt-4 cursor-pointer text-decoration-none">
                Show More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TransactionTotalIncomeInquiries;
