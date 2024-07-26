import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const DashboardPieChartCard = ({ label, labelColor, amount, icon }) => {
//   const darkMode = useSelector((x) => x.appConfig.darkMode);

  return (
    <div
      //   className={`w-full d-flex flex-column md:flex-row justify-content-between p-2 ${
      //     darkMode ? "bg-dark" : "bg-light"
      //   } shadow-lg border rounded`}

      className="bg-light shadow-lg border rounded"
    >
      <div className="row">
      {/* left side */}
        <div className="col col-lg-8 col-md-8 col-8">
          <div className="p-2 rounded">
            <div className="d-flex items-center">
              <span className={`${labelColor} rounded-circle mt-2`} style={{height:"5px",width:"5px"}}></span>
              <span className="text-sm mx-2">{label}</span>
            </div>
            <div className="d-flex">
              <p className="text-sm">{amount}</p>
            </div>
          </div>
        </div>
      {/* right side */}
        <div className="col col-lg-4 col-md-4 col-4">
          <div className="d-flex items-center mt-2 md:mt-0 mr-2">{icon}</div>
        </div>
      </div>
    </div>
  );
};

DashboardPieChartCard.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  addAmount: PropTypes.string,
  icon: PropTypes.element.isRequired,
};

export default DashboardPieChartCard;
