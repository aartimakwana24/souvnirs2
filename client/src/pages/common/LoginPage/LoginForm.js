import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER from "../../../api";
import SouvnirsLogoImg from "../../../assets/images/souvnirsLogo.png";
import Swal from "sweetalert2";
import "./loginForm.css";
import { useDispatch } from "react-redux";
import { getLoginInfo } from "../../../features/appConfig/appSlice";
import { BiArrowBack } from "react-icons/bi";


const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API_WRAPPER.post("/auth/login", formData);
      if (response.status === 200) {
        const token = response?.data?.token;
        const { id, role, email } = decodeToken(token);

        localStorage.setItem("role", JSON.stringify(role));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(token));

        dispatch(getLoginInfo(role));

        if (role == "customer") {
          console.log("Customer swal");
          Swal.fire({
            title: "Successfully Login!",
            text: "Customer Login Succefully!",
            icon: "success",
          }).then(function (result) {
            if (result.isConfirmed) {
              navigate(PATHS.customerDashboard);
            }
          });
        } else if (role == "vendor") {
          Swal.fire({
            title: "Successfully Login!",
            text: "Vendore Login Succefully!",
            icon: "success",
          }).then(function (result) {
            if (result.isConfirmed) {
              navigate(PATHS.vendorDashboard);
            }
          });
        }else if (role =="admin" ) {
          Swal.fire({
            title: "Successfully Login!",
            text: "Admin Login Succefully!",
            icon: "success",
          }).then(function (result) {
            if (result.isConfirmed) {
              navigate(PATHS.adminDashboard);
            }
          });
        }
      } else if (response.status === 401) {

        console.log("Inside 401");
        Swal.fire({
          title: "Alert!",
          text: "Please Enter Valid Credentials!",
          icon: "error",
        }).then(function (result) {
          console.log("SWAL result is : ", result);
          if (!result.isConfirmed) {
            navigate(PATHS.login);
          }
        });
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };
  return (
    <>
      <div className="w-100 me-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className=" p-4 rounded-xl  bg-light me-1 leftLoginDiv">
            <div className="btn btn-outline-secondary">
              <BiArrowBack />
              <Link to={PATHS.landingPage} className="btn" style={{padding:"0px"}}>Shop</Link>
            </div>
            <div className="text-center">
              <img
                src={SouvnirsLogoImg}
                alt="Souvnirs Logo"
                height="53"
                width="180"
              />
            </div>
            <center className="my-2">
              <h5>Sign In</h5>
            </center>
            <div className="d-flex justify-content-center gap-2">
              <p>Don't Have an account?</p>
              <Link
                to={"/register"}
                id="gradient-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #4A62C5 60.16%, #F05058 80.27%, #FE8144 100.39%, #F9CA4A 120.51%)",
                  color: "transparent",
                  textDecoration: "none",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                Sign Up here
              </Link>
            </div>

            <div className="container">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Your Email address<span> *</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@companeyName.com"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Password (min 8 characters) <span> *</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    aria-describedby="emailHelp"
                    placeholder="Minimum 8 characters"
                    required
                  />
                </div>

                <button
                  className="btn btn-primary w-100 fw-bold py-2 px-4 hover:shadow-lg text-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, #4C62C3 -4.44%, #F15157 29.82%, #FE7D43 65.26%, #F9CA4A 108.97%)",
                  }}
                  type="submit"
                >
                  SUBMIT
                </button>

                <div className="mb-3 mt-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input radio-red"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Remember Me
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
