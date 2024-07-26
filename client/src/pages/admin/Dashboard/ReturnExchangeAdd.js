import { MdCurrencyExchange } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

const ReturnExchangeAdd = () => {
  return (
    <div className="row  mt-4  bg-light">
      <div className="col col-lg-3 col-md-12 col-12">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
            <MdCurrencyExchange className="text-success fs-3 mb-1" />
            <h3 className="text-center fs-4 fw-bold mb-4">Return</h3>
            <h3 className="text-success fs-3 fw-medium">310</h3>
            <p className="text-center text-success fs-6">
              Over last month 1.3% ↑
            </p>
          </div>
        </div>
      </div>
      <div className="col col-lg-3 col-md-12 col-12">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
            <TbTruckReturn className="text-warning fs-3 mb-1" />
            <h3 className="text-center fs-4 fw-bold mb-4">Exchange</h3>
            <h3 className="text-warning fs-3 fw-medium">310</h3>
            <p className="text-center text-warning fs-6">
              Over last month 2.4% ↓
            </p>
          </div>
        </div>
      </div>
      <div className="col col-lg-6 col-md-12 col-12 ">
        <div className="card">
          <div className="card-body d-flex flex-column justify-content-center align-items-center p-4  rounded-xl" style={{backgroundColor:"orange"}}>
            <h3 className="text-white fs-5">Discount 5%</h3>
            <h3 className="text-white fs-5">for repairs</h3>
            <p className="text-white text-center">
              Action in honor of the company&apos;s
            </p>
            <p className="text-white text-center">5th anniversary</p>
            <button className="btn btn-sm btn-danger rounded-pill">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnExchangeAdd;
