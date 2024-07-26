import souvnirsLogo from "../../../assets/images/souvnirsLogo.png";
import { PATHS } from "../../../Routes/paths";
import { Link , useNavigate} from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import {
  RiDashboardLine,
  RiHeartLine,
  RiShoppingCartLine,
} from "react-icons/ri";

import { nanoid } from "nanoid";
import {
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";

function SouvnirsHeader({ badgeColor, buttonColor }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={PATHS.landingPage} className="navbar-brand">
            <img
              src={souvnirsLogo}
              alt="souvnirs logo"
              height="50"
              className="mx-3"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex flex-grow-1 mx-3">
              <input
                name="searchInput"
                className="form-control w-50 rounded-0"
                placeholder="Search products"
              />
              <select name="selectedFilter" className="form-select w-25">
                <option value="">Filter</option>
                <option value="productInfo">Products</option>
                <option value="category">Category</option>
                <option value="collection">Collection</option>
                <option value="vendor">Vendor</option>
              </select>
              <button className={`btn ${buttonColor} rounded-0`}>
                <CiSearch color="white" className="text-2xl" />
              </button>
            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">
              {token && token.length > 0 ? (
                <>
                    <Link
                      to={
                        role === "vendor"
                          ? PATHS.vendorDashboard
                          : PATHS.adminDashboard
                      }
                      className="bg-light text-dark"
                    >
                      <RiDashboardLine className="fs-2 me-3" />
                    </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      localStorage.clear();
                      navigate(PATHS.login);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="d-flex align-items-center gap-2">
                  <Link
                    className="btn btn-outline-primary text-decoration-none"
                    to={PATHS.login}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-secondary text-decoration-none text-dark"
                    to={`${PATHS.register}?sell=true`}
                  >
                    Sell on Souvnirs
                  </Link>
                </div>
              )}
              <div className="d-flex gap-2 mt-3">
                <Link to={PATHS.wishlist} className="btn btn-link">
                  <RiHeartLine className="fs-4 text-danger" />
                </Link>
                <Link to={PATHS.cart} className="btn btn-link">
                  <RiShoppingCartLine className="fs-4 text-dark" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SouvnirsHeader;
