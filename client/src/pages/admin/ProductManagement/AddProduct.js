import "react-quill/dist/quill.snow.css";
import Header from "../../../components/ui/Header/index.js";
import productManagementImage from "../../../assets/images/productManagementImage.png";
import {
  fadeInFromLeftVariant,
} from "../../../animations/index";
import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import "./addProduct.css";
import { debouncedShowToast } from "../../../utils/index.js";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../features/appConfig/addProductSlice.js";
import API_WRAPPER from "../../../api/index.js";
import AddProductAttributes from "../AddProductAttributes/AddProductAttributes.js";

function AddProduct() {
  const dispatch = useDispatch();
  const [vendorsList, setVendorsList] = useState([]);
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getAllVendors = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorsList(response?.data?.data);
        // need to check what to be done here
        if (vendorsList.length == 1) {
          debouncedShowToast("vendor list is empty array", "error");
        }
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  useEffect(() => {
    dispatch(
      setProduct({
        ...formData,
      })
    );
  });
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading="Add Products"
              subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. isadjv oiasreoi ihusdf bquhwdi euh."
              image={productManagementImage}
            />
            <div className="w-full mt-5">
              <div className="row">
                <div className="col col-lg-7 col-md-12 col-12 me-5 ms-lg-3 bg-light p-4 rounded border my-1">
                  <hr className="mt-4" />
                  <div className="form-group mt-4">
                    <label htmlFor="productName" className="form-label">
                      Product Title<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={(e) => handleInputChange(e)}
                      className="form-control"
                      type="text"
                      name="name"
                      id="productName"
                    />
                  </div>
                </div>
                <div className="col col-lg-4 col-md-12 col-12  bg-light rounded border p-4 my-1">
                  <hr className="mt-4" />
                  <div className="form-group mt-4">
                    <label className="label">
                      <span className="label-text">
                        Vendor<span className="text-danger">*</span>
                      </span>
                    </label>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      className="form-select form-select-lg"
                      name="vendorId"
                      value={formData.vendorId}
                    >
                      <option value="" disabled selected>
                        select vendor
                      </option>
                      {vendorsList?.map((vendor) => {
                        return (
                          <option key={nanoid()} value={vendor._id}>
                            {vendor?.firstName
                              ? vendor.firstName
                              : vendor?.email}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col col-lg-12 col-md-12 col-12 me-5 ms-lg-3 bg-light  p-4 rounded border my-1">
                <motion.div
                  variants={fadeInFromLeftVariant}
                  animate="animate"
                  initial="initial"
                  className="bg-light"
                >
                  <h4>Add Categories Here</h4>
                  <AddProductAttributes formData setFormData />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
