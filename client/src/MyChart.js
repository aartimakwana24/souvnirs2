import React from "react";
import { MDBContainer } from "mdbreact";
import { Doughnut } from "react-chartjs-2";

const MyChart = () => {
  // Sample data
  const data = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        // label: "Hours Studied in Geeksforgeeks",
        data: [2, 5, 6, 7, 3],
        backgroundColor: ["blue", "green", "yellow", "pink", "orange"],
      },
    ],
  };

  return (
    <MDBContainer>
      {/* <div style={{ width: "300px", height: "300px" }}> */}
        <Doughnut data={data} />
      {/* </div> */}
    </MDBContainer>
  );
};
export default MyChart;