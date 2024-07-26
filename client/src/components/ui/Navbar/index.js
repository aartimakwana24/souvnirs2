import { BellSvg, sunSvg } from "../../../icons/index";
import { BsShop } from "react-icons/bs";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { useDispatch } from "react-redux";
import './navbar.css';
function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
      const handleLogout = () => {
        localStorage.clear();
        // dispatch(getLoginInfo(""));
        navigate(PATHS.login);
      };

      var userInitials = "AM";
  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"></li>
                <li className="nav-item"></li>
              </ul>
              <span className="d-flex">
                <Link to={PATHS.landingPage} className="text-dark cursor-pointer">
                  <BsShop className="fs-3 mx-2 me-3" />
                </Link>
             
                <div className="bg-info mx-1 profileCircle1">
                  {/* <img src="" alt="profile.." /> */}
                  <div className="m-2">AM</div>
                </div>
              </span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
