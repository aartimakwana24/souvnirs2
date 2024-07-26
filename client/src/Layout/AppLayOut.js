import PropTypes from "prop-types";
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import { PATH } from "../Routes/paths.js";
// import { Breadcrumb, Footer } from "../components";

function AppLayOut({ children }) {
  return (
    <>
      <div className="d-flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <Navbar />
        </div>
      </div>
      {children}
    </>
  );
}

export default AppLayOut;
