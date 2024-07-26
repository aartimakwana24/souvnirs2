import { useState } from "react";
import "./registerForm.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SouvnirsLogoImg from "../../../assets/images/souvnirsLogo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerLevelOneSchema } from "../../../validations";
import { useForm } from "react-hook-form";
import API_WRAPPER from "../../../api";
import { PATHS } from "../../../Routes/paths";
import { decodeToken } from "react-jwt";
import Swal from "sweetalert2";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [levelOneRegisterData, setLevelOneRegisterData] = useState({});
  const [levelTwoRegisterData, setLevelTwoRegisterData] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [query] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerLevelOneSchema()),
    defaultValues: {
      option: query.get("sell") == "true" ? "vendor" : "customer",
    },
  });

  const onSubmitFirstLevel = async (data) => {
    if (data) {
      const levelOnepayload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        password: data.password,
      };
      setLevelOneRegisterData(levelOnepayload);

      if (data.option === "vendor") {
        setSelectedRole("vendor");
      }

      if (data.option === "customer") {
        setSelectedRole("customer");
      }
    }
  };

  const onSubmitSecondLevel = async (e) => {
    e.preventDefault();
    try {
      let token;
      if (selectedRole === "vendor") {
        const levelOneResponse = await API_WRAPPER.post(
          "/auth/register/vendor",
          levelOneRegisterData
        );
        if (levelOneResponse?.status === 200) {
          Swal.fire({
            title: "Successfully Registered!",
            text: "Vendore Registered Sucesfully",
            icon: "success",
          }).then(function (result) {
            if (result.isConfirmed) {
              token = levelOneResponse?.data?.token;
              console.log("TOKEN: ", token);
              const { id, role } = decodeToken(token);
              localStorage.setItem("role", JSON.stringify(role));
              localStorage.setItem(
                "token",
                JSON.stringify(levelOneResponse?.data?.token)
              );
              navigate(PATHS.vendorDashboard);
            }
          });
        } else if (levelOneResponse?.status === 400) {
          Swal.fire({
            title: "Alert!",
            text: "This Email Is Alreay Exist!",
            icon: "error",
          }).then(function (result) {
            if (!result.isConfirmed) {
              navigate(PATHS.register);
            }
          });
        }
        // if (levelOneResponse?.status === 200) {
        //   // console.log("LEVEL ONE RESPONSE: ", levelOneResponse?.data);
        // token = levelOneResponse?.data?.token;
        // console.log("TOKEN: ", token);

        // const { id, role } = decodeToken(token);
        // console.log("ROLE AND ID: ", id, role);
        //   const levelTwoResponse = await API_WRAPPER.post(
        //     "/store/create-store",
        //     { ...levelTwoRegisterData, vendorId: id }
        //   );
        //   if (levelTwoResponse.status === 200) {
        //     // console.log("LEVEL TWO RESPONSE: ", levelTwoResponse?.data);
        //     localStorage.setItem("role", JSON.stringify(role));
        //     localStorage.setItem("token", JSON.stringify(token));
        //     navigate(PATHS.vendorDashboard);
        //   }
        // }
      }

      if (selectedRole === "customer") {
        console.log("CUSTOMER SELECTED");
        const payload = { ...levelOneRegisterData, ...levelTwoRegisterData };
        console.log("PAYLOAD: ", payload);

        const response = await API_WRAPPER.post(
          "/auth/register/customer",
          payload
        );
        if (response?.status === 200) {
          Swal.fire({
            title: "Successfully Registered!",
            text: "Customer Registered Sucesfully",
            icon: "success",
          }).then(function (result) {
            if (result.isConfirmed) {
              const { role } = decodeToken(response?.data?.token);
              console.log("ROLE: ", role);
              localStorage.setItem("role", JSON.stringify(role));
              localStorage.setItem(
                "token",
                JSON.stringify(response?.data?.token)
              );
               navigate(PATHS.customerDashboard);
            } else {
              navigate(PATHS.register);
            }
          });
        }
        // if (response?.status === 200) {
        //   // console.log("RESPONSE OBJECT: ", response.data);
        //   const { role } = decodeToken(response?.data?.token);
        //   console.log("ROLE: ", role);
        //   localStorage.setItem("role", JSON.stringify(role));
        //   localStorage.setItem("token", JSON.stringify(response?.data?.token));
        //   navigate(PATHS.customerDashboard);
        // }
      }
    } catch (error) {
      console.log("RegisterForm.jsx", error);
      // debouncedShowToast(error, "error");
    }
  };

  const handleSecondLevelHandleChange = (e) => {
    const { name, value } = e.target;
    setLevelTwoRegisterData({ ...levelTwoRegisterData, [name]: value });
  };

  return (
    <>
      <div className="w-100 me-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className=" p-4 rounded-xl  bg-light me-1 leftDiv">
            <div className="text-center">
              <img
                src={SouvnirsLogoImg}
                alt="Souvnirs Logo"
                height="53"
                width="180"
              />
            </div>
            <div className="d-flex justify-content-center gap-2">
              <p>Already have an account?</p>
              <Link
                to={"/login"}
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
                Sign in here
              </Link>
            </div>

            <div className="container">
              <form>
                <div className="row">
                  <div className="col col-lg-12 my-2">
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox2"
                    >
                      please select :
                    </label>

                    <div className="form-check form-check-inline mx-4">
                      <input
                        className="form-check-input radio-red"
                        type="radio"
                        id="buy"
                        value="customer"
                        name="option"
                        defaultChecked={!query.get("sell")}
                        {...register("option")}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="inlineCheckbox2"
                      >
                        BUY FROM SOUVNIRS
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input radio-red"
                        type="radio"
                        id="sell"
                        value="vendor"
                        name="option"
                        defaultChecked={query.get("sell")}
                        {...register("option")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineCheckbox3"
                      >
                        SELL ON SOUVNIRS
                      </label>
                    </div>
                  </div>
                  <div className="col col-lg-6 col-md-12 col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        First Name <span> *</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter First Name"
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-danger">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-6 col-md-12 col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Last Name <span> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Last Name"
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-danger">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Email address (username)<span> *</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="name@companeyName.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                </div>
                <div className="row">
                  <div className="col col-lg-6 col-md-12 col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Password (min 8 characters) <span> *</span>
                      </label>
                      <input
                        // type={showPassword ? "text" : "password"}
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Minimum 8 characters"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-6 col-md-12 col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Mobile Number <span> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter without country code"
                        {...register("mobile")}
                      />
                      {errors.mobile && (
                        <p className="text-danger">{errors.mobile.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input radio-red"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Standard <span className="text-danger"> T&C </span>* apply,
                    please check the box to proceed.
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input radio-red"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I would like to receive emails on new products & offers. (We
                    don’t spam)
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input radio-red"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Happy to receive non promotional Order updates on Whatsapp
                  </label>
                </div>
                <button
                  className="btn btn-primary w-100 fw-bold py-2 px-4 hover:shadow-lg text-2xl"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  type="button"
                  style={{
                    background:
                      "linear-gradient(90deg, #4C62C3 -4.44%, #F15157 29.82%, #FE7D43 65.26%, #F9CA4A 108.97%)",
                  }}
                  onClick={handleSubmit(onSubmitFirstLevel)}
                >
                  CREATE ACCOUNT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          {/* Set width to 75% and center the modal */}
          <div className="modal-content">
            <div className="modal-header ">
              <p className="modal-title mx-5 ps-5" id="exampleModalLabel">
                <h6 className="mx-5 px-5">
                  Hi {levelOneRegisterData.firstName}! Complete your profile to
                  continue
                </h6>
                <p>
                  This is required to ensure a trusted platform for buyers and
                  sellers
                </p>
              </p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="my-1 col col-lg-6 col-md-12 col-12">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Organization Name
                      </label>
                      <input
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        type="text"
                        className="form-control inputBorder"
                        name="organizationName"
                        aria-describedby="emailHelp"
                        placeholder="Minimum 2 chracters"
                      />
                    </div>
                  </div>
                  <div className="col col-lg-6 col-md-12 col-12 my-1">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputCountry"
                        className="form-label"
                      >
                        Country
                      </label>
                      <select
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        className="form-select inputBorder"
                        name="country"
                        id="country"
                      >
                        <option defaultChecked value="select country">
                          Select Country
                        </option>
                        <option value="India">India</option>
                        <option value="USA">United States</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="USA">Japan</option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-6  col-md-12 col-12 my-1">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        City
                      </label>
                      <input
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        type="text"
                        className="form-control inputBorder"
                        name="city"
                        placeholder="Minimum 2 chracters"
                      />
                    </div>
                  </div>

                  <div className="col col-lg-6 col-md-12 col-12 my-1">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputCountry"
                        className="form-label"
                      >
                        Organisation Type
                      </label>
                      <select
                        className="form-select inputBorder"
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        name="organizationType"
                        id="organization-type"
                      >
                        <option defaultChecked value="organization Type">
                          Select Country
                        </option>
                        <option value="Degital/Online Retailer">
                          Degital/Online Retailer
                        </option>
                        <option value="Independent Owner">
                          Independent Owner
                        </option>
                        <option value="Multi Channerl Retailer">
                          Multi Channerl Retailer
                        </option>
                        <option value="Lifestyle Brand">Lifestyle Brand</option>
                        <option value="WhleSeller/Importer">
                          WhleSeller/Importer
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-6 col-md-12 col-12 my-1">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputCountry"
                        className="form-label"
                      >
                        Order Type Intrested In
                      </label>
                      <select
                        className="form-select inputBorder"
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        name="orderTypeInterested"
                        id="order-type"
                      >
                        <option
                          defaultChecked
                          value="Select  Order Type Intrested In"
                        >
                          Select Order Type
                        </option>
                        <option value="Ready To Ship Small Quantity">
                          Ready To Ship Small Quantity
                        </option>
                        <option value=" Ready To Ship Large Quantity">
                          Ready To Ship Large Quantity
                        </option>
                        <option value="  Made To Order Medium Quantity">
                          Made To Order Medium Quantity
                        </option>
                        <option value="Made To Order Large Quantity">
                          Made To Order Large Quantity
                        </option>
                        <option value="Lifestyle Brand">Lifestyle Brand</option>
                        <option value="WhleSeller/Importer">
                          WhleSeller/Importer
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col col-lg-6  col-md-12 col-12 my-1">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Postal / pin /Zip Code
                      </label>
                      <input
                        onChange={(e) => handleSecondLevelHandleChange(e)}
                        type="text"
                        className="form-control inputBorder"
                        placeholder="Minimum 2 chracters"
                        name="pinCode"
                      />
                    </div>
                  </div>
                </div>
                <center>
                  <button
                    className="my-1 btn btn-primary w-50 fw-bold py-2 px-4 hover:shadow-lg text-2xl"
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(90deg, #4C62C3 -4.44%, #F15157 29.82%, #FE7D43 65.26%, #F9CA4A 108.97%)",
                    }}
                    onClick={(e) => onSubmitSecondLevel(e)}
                  >
                    SUBMIT
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* modal end */}
    </>
  );
};

export default RegisterForm;
