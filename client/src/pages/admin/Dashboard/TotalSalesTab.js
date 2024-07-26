import Tabs  from "../../../components/ui/Tabs/index.js";
import { Bar } from "react-chartjs-2";
import { options } from "../../../components/ui/Charts/BarChart.js";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";

function TotalSalesTab (){
  // const [chartData, setChartData] = useState();
  // const [dateLabels, setDateLabels] = useState();
  // const [monthLabels, setMonthLabels] = useState();
  // const [yearLabels, setYearLabels] = useState();
  // const [dateData, setDateData] = useState();
  // const [monthData, setMonthData] = useState();
  // const [yearData, setYearData] = useState();
  // const [totalSales, setTotalSales] = useState();

   const yearLabels = ["2019", "2020", "2021", "2022", "2023", "2024"];
   const yearData = [500, 300, 750, 200, 400, 800];

   const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
   const monthData = [200, 400, 600, 800, 1000, 1200];

   const dateLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
   const dateData = [100, 200, 300, 400, 500];
   

  const getBarChartData = async () => {
    // const response = await API_WRAPPER.get("/dashboard/barchart");
    // console.log("TotalSalesTab.jsx", response.data);
    // setChartData(response.data);
    // setDateLabels(response.data.dateData.labels);
    // setDateData(response.data.dateData.counts);
    // setMonthLabels(response.data.monthData.labels);
    // setMonthData(response.data.monthData.counts);
    // setYearLabels(response.data.yearData.labels);
    // setYearData(response.data.yearData.counts);
    // setTotalSales(response.data.totalSales);
  };

  useEffect(() => {
    getBarChartData();
  }, []);

  const tabs = [
    {
      label: "By year",
      content: (
        <div className="row g-4">
          <div className="col-md-6 ">
            {yearData && yearLabels && (
              <Bar
                style={{ height: "200px" }}
                options={options}
                data={{
                  labels: yearLabels,
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: yearData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            )}
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <div className="row g-2 w-100">
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By month",
      content: (
        <div className="row g-2">
          <div className="col col-lg-6 col-md-12 col-12">
            {monthData && monthLabels && (
              <Bar
                style={{ height: "276px" }}
                options={options}
                data={{
                  labels: monthLabels,
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: monthData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            )}
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="row g-4 w-100">
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By week",
      content: (
        <div className="row g-4">
          <div className="col col-lg-6 col-md-12 col-12">
            {dateData && dateLabels && (
              <Bar
                style={{ height: "276px" }}
                options={options}
                data={{
                  labels: dateLabels,
                  datasets: [
                    {
                      label: "Dataset 1",
                      data: dateData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            )}
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="row g-2 w-100">
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mt-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-4 p-3 bg-light rounded shadow">
                  <p className="d-inline">Total Income</p>
                  <p className="d-inline" style={{ paddingLeft: "3.5px" }}>
                    340$
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-100">
        <Tabs enableBorder tabs={tabs} />
    </div>
  );
};

export default TotalSalesTab;
