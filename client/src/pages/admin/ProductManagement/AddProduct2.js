import "react-quill/dist/quill.snow.css";
import Header from "../../../components/ui/Header/index.js";
import productManagementImage from "../../../assets/images/productManagementImage.png";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animations/index";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import Dropzone from "../../../components/ui/Dropzone/index.js";
import "./addProduct.css";
import img from "../../../assets/images/productManagementImage.png";
import { debouncedShowToast } from "../../../utils/index.js";
import { useDispatch } from "react-redux";
import { setProduct } from "../../../features/appConfig/addProductSlice.js";
import API_WRAPPER from "../../../api/index.js";
import { PATHS } from "../../../Routes/paths.js";

function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [tagValue, setTagValue] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [preview, setPreview] = useState();
  const [foregroundWidth, setForegroundWidth] = useState(100);
  const [foregroundHeight, setForegroundHeight] = useState(100);
  const [selectedShape, setSelectedShape] = useState("square");
  const [foregroundX, setForegroundX] = useState(0);
  const [foregroundY, setForegroundY] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDrag = (e, data) => {
    const parentElement = document.getElementById("parentElement");
    const newX = Math.floor((data.x / parentElement.clientWidth) * 100);
    const newY = Math.floor((data.y / parentElement.clientHeight) * 100);

    setForegroundX(newX);
    setForegroundY(newY);

    setFormData((prevData) => ({
      ...prevData,
      customization: {
        xAxis: newX,
        yAxis: newY,
        height: foregroundHeight,
        width: foregroundWidth,
      },
    }));
  };

  const handleTagInputChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tagValue.trim() !== "") {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    const filteredTags = tagsArray.filter((tag) => tag !== tagToRemove);
    setTagsArray(filteredTags);
  };

  const handleForegroundWidthChange = (e) => {
    const newWidth = parseInt(e.target.value);
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const maxWidth = img.naturalWidth;

      if (newWidth <= maxWidth) {
        setForegroundWidth(newWidth);

        // Update the formData object with the new width
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: newWidth,
        }));
      } else {
        setForegroundWidth(maxWidth);
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: maxWidth,
        }));
      }
    };
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   !formData.name ||
    //   !description ||
    //   tagsArray.length < 1 ||
    //   !formData.vendorId ||
    //   !preview
    // ) {
    //   debouncedShowToast("Fill all required fields", "info");
    //   return;
    // }
    dispatch(
      setProduct({
        ...formData,
        description,
        tags: tagsArray,
        customization: {
          xAxis: foregroundX,
          yAxis: foregroundY,
          height: foregroundHeight,
          width: foregroundWidth,
        },
      })
    );
    navigate(PATHS.adminAddProductAttributes);
  };

  useEffect(() => {
    getAllVendors();
  }, []);

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
                    <label htmlFor="status" className="form-label">
                      Status<span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      className="form-select"
                      name="status"
                      id="status"
                    >
                      <option disabled selected>
                        select status
                      </option>
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="readyToShip" className="form-label">
                      Ready To Ship:<span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      className="form-select"
                      name="readyToShip"
                      id="readyToShip"
                    >
                      <option disabled selected>
                        Default
                      </option>
                      <option value="true">yes</option>
                      <option value="false">no</option>
                    </select>
                  </div>
                  <div className="form-group mt-4">
                    <label htmlFor="freeShipping" className="form-label">
                      Free Shipping:<span className="text-danger">*</span>
                    </label>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      className="form-select"
                      name="freeShipping"
                      id="freeShipping"
                    >
                      <option disabled selected>
                        Default
                      </option>
                      <option value="true">yes</option>
                      <option value="false">no</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row  mt-4">
              <div className="col col-lg-7 col-md-12 col-12 me-5 ms-lg-3 bg-light  p-4 rounded border my-1">
                <div className="p-4 rounded">
                  <hr className="mt-4" />
                  <div className="form-group mt-4">
                    <label className="label">
                      <span className="label-text">
                        Description<span className="text-danger">*</span>
                      </span>
                    </label>
                    <ReactQuill
                      className="mb-5 reactquill"
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                    />
                  </div>
                </div>
              </div>

              <div className="col col-lg-4 col-md-12 col-12  bg-light rounded border p-4 my-1">
                <div className="p-4 bg-light">
                  <h3 className="font-semibold">Product Organisation</h3>
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

                  <div className="form-group mt-4">
                    <label className="label">
                      <span className="label-text">
                        Tags<span className="text-danger">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={tagValue}
                      onChange={handleTagInputChange}
                      onKeyDown={handleKeyDown} // Use onKeyDown instead of onKeyPress
                      placeholder="Enter a tag and press Enter"
                      className="form-control"
                    />

                    <div className="mt-4 d-flex gap-4 flex-wrap">
                      {tagsArray.map((tag, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center bg-light rounded-lg px-2 py- w-autos"
                        >
                          <span>{tag}</span>
                          <button
                            className="btn btn-outline-danger btn-sm ml-4 my-1"
                            onClick={() => removeTag(tag)}
                          >
                            <GrFormClose />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group mt-4">
                    <label className="label">
                      <span className="label-text">
                        Stock Keeping Unit (SKU)
                        <span className="text-danger">*</span>
                      </span>
                    </label>
                    <input
                      onChange={(e) => handleInputChange(e)}
                      className="form-control"
                      placeholder="Enter SKU"
                      type="text"
                      name="sku"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col col-lg-7 col-md-12 col-12 me-5 ms-lg-3 bg-light  p-4 rounded border my-1">
                <motion.div
                  variants={fadeInFromLeftVariant}
                  animate="animate"
                  initial="initial"
                  className="bg-light"
                >
                  <h3 className="font-semibold">
                    Add Cover Image<span className="text-danger">*</span>
                  </h3>
                  <hr className="mt-4" />

                  <div className="border border-primary rounded flex items-center justify-center mt-4">
                    <Dropzone
                      accept={".png"}
                      onFilesChange={(data) => {
                        console.log(data);
                        setFormData({ ...formData, img: data[0] });
                      }}
                    />
                  </div>
                </motion.div>
              </div>
              <div className="col col-lg-4 col-md-12 col-12  bg-white rounded  p-4 my-1">
                <motion.div
                  variants={fadeInFromRightVariant}
                  animate="animate"
                  initial="initial"
                  className="flex flex-md-column  p-4 bg-light rounded border"
                >
                  {/* {preview ? (
                  <button
                    onClick={() =>
                      document.getElementById("coverImage_Modal").showModal()
                    }
                    className="btn btn-primary"
                  >
                    Show Preview
                  </button>
                ) : (
                  <p>select image</p>
                )} */}
                  <div className="row">
                    <div className="col col-lg-6 col-md-6 col-12 my-1">
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                      >
                        Show Preview
                      </button>
                    </div>
                    <div className="col col-lg-3 col-md-3 col-12 my-1">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Next
                      </button>
                    </div>
                    <div className="col col-lg-3 col-md-3 col-12 my-1">
                      <Link to="/admin/dashboard" className="btn btn-secondary">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bootstrap modal */}
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              tabIndex="-1"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Select Position</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <div style={{ position: "relative" }}>
                        <img
                          id="parentElement"
                          // src={preview}
                          src={img}
                          alt="Cover Image"
                          height="300"
                          style={{ width: "100%" }}
                        />
                        <Draggable bounds="parent" onDrag={handleDrag}>
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: `${foregroundWidth}px`,
                              height: `${foregroundHeight}px`,
                              border: "2px solid red",
                              borderRadius:
                                selectedShape === "circle" ? "50%" : "0",
                            }}
                          ></div>
                        </Draggable>
                      </div>

                      <div className="row mt-4">
                        <div className="col col-lg-6 col-md-12 col-12 my-2">
                          <label htmlFor="foregroundWidth">
                            Foreground Width:
                          </label>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <input
                            className="input border-primary"
                            type="number"
                            id="foregroundWidth"
                            value={foregroundWidth}
                            onChange={handleForegroundWidthChange}
                          />
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <label htmlFor="foregroundHeight">
                            Foreground Height:
                          </label>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <input
                            className="input border-primary"
                            type="number"
                            id="foregroundHeight"
                            value={foregroundHeight}
                            max="150"
                            onChange={(e) =>
                              setForegroundHeight(parseInt(e.target.value))
                            }
                          />
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12 my-2">
                          <label htmlFor="shapeSelect">Select Shape:</label>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12 my-2">
                          <select
                            className="select border-primary border-2"
                            id="shapeSelect"
                            value={selectedShape}
                            onChange={(e) => setSelectedShape(e.target.value)}
                          >
                            <option value="square">Square</option>
                            <option value="circle">Circle</option>
                          </select>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12 my-1">
                          <label htmlFor="xPosition">X Position :</label>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <span id="xPosition">{foregroundX}%</span>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <label htmlFor="yPosition">Y Position:</label>
                        </div>
                        <div className="col col-lg-6 col-md-12 col-12">
                          <span id="yPosition">{foregroundY}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Bootstrap modal */}
          </div>
        </div>
      </div>
    </>
  );
}
export default AddProduct;
