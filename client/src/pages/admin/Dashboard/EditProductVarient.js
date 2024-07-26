import React, { useState, useEffect } from "react";
import Header from "../../../components/ui/Header";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import Dropzone from "../../../components/ui/Dropzone/EditIndex.js";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animations/index";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER, { baseUrl } from "../../../api";
import Card from "../../../components/ui/Card/index.js";
import success from "../../../utils/index.js";
function EditVarients() {
  const [activeTab, setActiveTab] = useState({ _id: "", tab: "tab1" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState({});
  const [tableData, setTableData] = useState([
    { price: "", minQuantity: "", currency: "" },
  ]);
  const [tagValue, setTagValue] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [preview, setPreview] = useState();
  const [foregroundWidth, setForegroundWidth] = useState(100);
  const [foregroundHeight, setForegroundHeight] = useState(100);
  const [selectedShape, setSelectedShape] = useState("square");
  const [foregroundX, setForegroundX] = useState(0);
  const [foregroundY, setForegroundY] = useState(0);
  const [backTrack, setBackTrack] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [varientsData, setVarientsData] = useState([]);
  const [allVarientsData, setAllVarientsData] = useState([]);
  const [isPublished, setIsPublished] = useState(true);
  const [imagePaths, setImagePaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const { id, pid } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleFilesChange = (files) => {
    setFormData({ ...formData, img: files });
  };

  const handleSubmit = async (e, _id) => {
    e.preventDefault();
    setBackTrack(1);
    const formDataToSend = {
      ...formData,
      description,
      tags: tagsArray,
      croppedImageUrl: croppedImageUrl,
      customization: {
        xAxis: foregroundX,
        yAxis: foregroundY,
        height: foregroundHeight,
        width: foregroundWidth,
      },
      _id: _id,
    };
    let storedData = JSON.parse(sessionStorage.getItem(`formData${_id}`));
    if (storedData) {
      const updatedData = {
        ...storedData,
        ...formDataToSend,
      };
      sessionStorage.setItem(`formData${_id}`, JSON.stringify(updatedData));
    } else {
      sessionStorage.setItem(`formData${_id}`, JSON.stringify(formDataToSend));
    }
  };

  const handleCropImage = () => {
    const parentElement = document.getElementById("parentElement");
    const canvas = document.createElement("canvas");
    canvas.width = foregroundWidth;
    canvas.height = foregroundHeight;
    const ctx = canvas.getContext("2d");
    // const img = document.createElement("img");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const scale = img.naturalWidth / parentElement.offsetWidth;
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;

      const cropStartX = Math.floor((foregroundX / 100) * imageWidth);
      const cropStartY = Math.floor((foregroundY / 100) * imageHeight);

      const cropWidth = Math.floor((foregroundWidth / 100) * imageWidth);
      const cropHeight = Math.floor((foregroundHeight / 100) * imageHeight);

      const maxCropWidth = imageWidth - cropStartX;
      const maxCropHeight = imageHeight - cropStartY;

      const finalCropWidth = Math.min(cropWidth, maxCropWidth);
      const finalCropHeight = Math.min(cropHeight, maxCropHeight);

      ctx.drawImage(
        img,
        cropStartX,
        cropStartY,
        finalCropWidth,
        finalCropHeight,
        0,
        0,
        foregroundWidth,
        foregroundHeight
      );

      const croppedImageUrl = canvas.toDataURL("image/png");
      setCroppedImageUrl(croppedImageUrl);
    };
    img.src = preview;
  };
  useEffect(() => {
    getAllVarientsTabs();
  }, [pid]);

  useEffect(() => {
    if (activeTab._id) {
      getAllVarietData(activeTab._id);
    }
  }, [activeTab._id]);

  useEffect(() => {
    if (formData.img && formData.img.length > 0) {
      const paths = formData.img.map((file) => URL.createObjectURL(file));
      setImagePaths(paths);
      setPreview(paths[0]);
    }
  }, [formData.img]);

  useEffect(() => {
    if (activeTab) {
      const matchingVariant = varientsData.find(
        (variantData) => variantData._id === activeTab._id
      );
      if (matchingVariant) {
        setTableData([
          {
            price: matchingVariant.initialPrice || "",
            minQuantity: "",
            currency: "",
          },
        ]);
      } else {
        setTableData([{ price: "", minQuantity: "", currency: "" }]);
      }
    }
  }, [varientsData, activeTab]);

  const addRow = () => {
    setTableData((prevData) => [
      ...prevData,
      { price: "", minQuantity: "", currency: "" },
    ]);
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index][name] = value;
      return newData;
    });
  };

  const handlePublish = async () => {
    try {
      setBackTrack(0);
      const storedFormData = JSON.parse(
        sessionStorage.getItem(`formData${activeTab._id}`)
      );

      if (storedFormData) {
        const formDataToSend = new FormData();
        formDataToSend.append("quantity", storedFormData.quantity);
        formDataToSend.append("status", storedFormData.status);
        formDataToSend.append("readyToShip", storedFormData.readyToShip);
        formDataToSend.append("freeShipping", storedFormData.freeShipping);
        formDataToSend.append("price", storedFormData.price);
        formDataToSend.append("sku", storedFormData.sku);
        formDataToSend.append("description", storedFormData.description);
        formDataToSend.append("pvid", activeTab._id);

        if (formData.img) {
          formData.img.forEach((file, index) => {
            formDataToSend.append(`img`, file);
          });
        }
        if (storedFormData.croppedImageUrl) {
          formDataToSend.append(
            "croppedImageUrl",
            storedFormData.croppedImageUrl
          );
        }

        formDataToSend.append(
          "customization",
          JSON.stringify(storedFormData.customization)
        );

        if (storedFormData.tags && Array.isArray(storedFormData.tags)) {
          storedFormData.tags.forEach((tag, index) => {
            formDataToSend.append(`tags[${index}]`, tag);
          });
        }

        formDataToSend.append("data", JSON.stringify(tableData));

        let existRes = await API_WRAPPER.get(
          `/productsDetails/check-varient/${activeTab._id}`
        );

        const ifExist = existRes.data.exists;
        if (!ifExist) {
          let varientResp = await API_WRAPPER.post(
            "/productsDetails/create-varients",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (varientResp.status === 201) {
            success("Variant Created", "Variant Created Successfully!");
            const currentIndex = varientsData.findIndex(
              (variant) => variant._id === activeTab._id
            );
            const updatedIsPublished = { ...isPublished };
            if (currentIndex < varientsData.length - 1) {
              updatedIsPublished[`tab${currentIndex + 2}`] = true;
            }
            setIsPublished(updatedIsPublished);

            if (currentIndex < varientsData.length - 1) {
              setActiveTab({
                _id: varientsData[currentIndex + 1]._id,
                tab: `tab${currentIndex + 2}`,
              });
            } else {
              navigate(PATHS.adminProductManagement);
            }
          }
        } else {
          let updateVarientResp = await API_WRAPPER.put(
            `/productsDetails/update-varients/${activeTab._id}`,
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (updateVarientResp.status === 200) {
            success("Variant Update", "Variant Update Successfully!");
            const currentIndex = varientsData.findIndex(
              (variant) => variant._id === activeTab._id
            );

            const updatedIsPublished = { ...isPublished };
            if (currentIndex < varientsData.length - 1) {
              updatedIsPublished[`tab${currentIndex + 2}`] = true;
            }
            setIsPublished(updatedIsPublished);

            if (currentIndex < varientsData.length - 1) {
              setActiveTab({
                _id: varientsData[currentIndex + 1]._id,
                tab: `tab${currentIndex + 2}`,
              });
            } else {
              navigate(PATHS.adminProductManagement);
            }
          }
        }
      } else {
        console.log(`No formData found for activeTab._id ${activeTab._id}`);
      }
    } catch (error) {
      console.log("error in handlePublish ", error);
    }
  };

  if (!activeTab) {
    return null;
  }

  const backTrackFunc = () => {
    setBackTrack(0);
  };
  const getAllVarietData = async (_id) => {
    try {
      setLoading(true);
      // setAllVarientsData([]);
      let allVarientsRes = await API_WRAPPER.get(
        `/productsDetails/check-varient/${_id}`
      );
      if (allVarientsRes.data.variant) {
        setAllVarientsData(allVarientsRes.data.variant);
        setTagsArray(allVarientsRes.data.variant.tags);
        setTableData(
          allVarientsRes.data.variant.data || [
            { price: "", minQuantity: "", currency: "" },
          ]
        );
        if (allVarientsRes.data.variant.images.length > 0) {
          const imagePathsFromDB = allVarientsRes.data.variant.images.map(
            (img) => {
              const fullImagePath = `${baseUrl}/${encodeURIComponent(img)}`;
              return fullImagePath;
            }
          );
          setImagePaths(imagePathsFromDB);
          setPreview(imagePathsFromDB[0]);
        }
        setForegroundWidth(allVarientsRes.data.variant.foregroundWidth || 100);
        setForegroundHeight(
          allVarientsRes.data.variant.foregroundHeight || 100
        );
        setSelectedShape(allVarientsRes.data.variant.selectedShape || "square");
      } else {
        setAllVarientsData([]);
        setTagsArray([]);
        setTableData([{ price: "", minQuantity: "", currency: "" }]);
        setImagePaths([]);
        setPreview();
        setForegroundHeight(100);
        setForegroundWidth(100);
        setSelectedShape("square");
      }
    } catch (error) {
      console.log("Error in getAllVarietData rendoreContent ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (e, path) => {
    e.preventDefault();
    setPreview(path);
  };

  const renderContent = (variantList) => {
    const { _id, tab } = activeTab;
    const data = JSON.parse(sessionStorage.getItem(`formData${_id}`));

    if (loading) {
      return (
        <>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </>
      );
    }
      if (backTrack == 0) {
        switch (`${activeTab.tab}`) {
          case `${activeTab.tab}`:
            return (
              <>
                <div className="w-full mt-5">
                  <div className="row">
                    <div className="col col-lg-7 col-md-12 col-12 me-5 ms-lg-3 bg-light p-4 rounded border my-1">
                      <hr className="mt-4" />
                      <div className="form-group mt-4">
                        <label htmlFor="productName" className="form-label">
                          Varient Quantity<span className="text-danger">*</span>
                        </label>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          className="form-control"
                          type="number"
                          name="quantity"
                          id="productQuantity"
                          defaultValue={
                            data?.quantity
                              ? data.quantity
                              : allVarientsData.quantity ?? ""
                          }
                          // defaultValue={
                          //   data?.quantity
                          //     ? data.quantity
                          //     : allVarientsData?.quantity
                          //     ? allVarientsData.quantity
                          //     : ""
                          // }
                          min="5"
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
                          // defaultValue={
                          //   data?.status
                          //     ? data.status
                          //     : allVarientsData.Status ?? ""
                          // }
                          defaultValue={
                            data?.status
                              ? data.status
                              : allVarientsData.Status ?? ""
                          }
                        >
                          <option disabled selected>
                            {data?.status
                              ? data.status
                              : allVarientsData.Status ?? ""}
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
                          defaultValue={
                            data?.readyToShip
                              ? data.readyToShip
                              : allVarientsData.readyToShip ?? ""
                          }
                        >
                          <option disabled selected>
                            {data?.readyToShip
                              ? data.readyToShip
                              : allVarientsData.readyToShip ?? ""}
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
                          defaultValue={
                            data?.freeShipping
                              ? data.freeShipping
                              : allVarientsData.freeShipping ?? ""
                          }
                        >
                          <option disabled selected>
                            {data?.freeShipping
                              ? data.freeShipping
                              : allVarientsData.freeShipping ?? ""}
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
                          defaultValue={
                            data?.description
                              ? data.description
                              : allVarientsData.desc ?? ""
                          }
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
                            Price
                            <span className="text-danger">*</span>
                          </span>
                        </label>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          className="form-control"
                          placeholder="Enter Price"
                          type="text"
                          name="price"
                          // defaultValue={
                          //   data != null ? data.price : allVarientsData.price
                          // }
                          defaultValue={
                            allVarientsData?.price ?? data?.price ?? ""
                          }
                        />
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
                          //  defaultValue={data != null ? data.tags : ""}
                          onChange={handleTagInputChange}
                          onKeyDown={handleKeyDown}
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
                          // defaultValue={
                          //   data != null ? data.sku : allVarientsData.sku
                          // }
                          // defaultValue={allVarientsData?.sku ?? data?.sku ?? ""}
                          defaultValue={
                            data?.sku ? data.sku : allVarientsData.sku ?? ""
                          }
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
                        {/* <Dropzone
                        setFormData={setFormData}
                        formData={formData}
                        data={data}
                      /> */}
                        <Dropzone onFilesChange={handleFilesChange} />
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
                      <div className="row">
                        <div className="col col-lg-6 col-md-6 col-12 my-1">
                          {imagePaths.length > 0 ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => setShowModal(true)}
                            >
                              Show Preview
                            </button>
                          ) : (
                            <p>select image</p>
                          )}
                        </div>
                        <div className="col col-lg-3 col-md-3 col-12 my-1">
                          <Link
                            onClick={(e) => {
                              handleSubmit(e, _id);
                              // navigate(PATHS.adminAddProductPrices);
                            }}
                            className="btn btn-primary"
                          >
                            Next
                          </Link>
                        </div>
                        <div className="col col-lg-3 col-md-3 col-12 my-1">
                          <Link to="" className="btn btn-secondary">
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
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
                          <div className="container mt-4">
                            <div className="row">
                              {imagePaths.map((path, index) => (
                                <div
                                  className="col-6 col-md-4 col-lg-3 mb-4"
                                  key={index}
                                >
                                  <div
                                    className="card"
                                    style={{
                                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                    onClick={(event) =>
                                      handleImageClick(event, path)
                                    }
                                  >
                                    <img
                                      src={path}
                                      className="card-img-top"
                                      alt={`Preview ${index}`}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div style={{ position: "relative" }}>
                            <img
                              id="parentElement"
                              src={preview}
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
                                // defaultValue={
                                //   data != null
                                //     ? data.foregroundWidth
                                //     : { foregroundWidth }
                                // }
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
                                onChange={(e) =>
                                  setSelectedShape(e.target.value)
                                }
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
                            <button
                              className="btn btn-danger my-2"
                              onClick={handleCropImage}
                            >
                              Crop Image
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of Bootstrap modal */}
              </>
            );
          default:
            return <div>No data?</div>;
        }
      } else {
        return (
          <>
            <div className="container mt-5">
              <Card>
                <label>
                  <div className="">
                    <table className="table table-sm ">
                      <thead>
                        <tr>
                          <th>Variant</th>
                          <th>price</th>
                          <th>Quantity</th>
                          <th>Currency</th>
                        </tr>
                      </thead>
                      <tbody className="" id="rowChange">
                        <tr>
                          <td>
                            {/* {alert("inside else ")} */}
                            {console.log("varientsData ", varientsData)}
                            {varientsData.find(
                              (variantData) => variantData._id === activeTab._id
                            ) ? (
                              varientsData
                                .find(
                                  (variantData) =>
                                    variantData._id === activeTab._id
                                )
                                .varients.map((variant, index) => {
                                  const variantAttributes = Object.entries(
                                    variant
                                  )
                                    .map(([key, value]) => `${key}: ${value}`)
                                    .join(", ");
                                  return (
                                    <pre key={index}>{variantAttributes}</pre>
                                  );
                                })
                            ) : (
                              <p>No matching variant found.</p>
                            )}
                          </td>
                          <td>
                            <label>{formData.price}</label>
                          </td>
                          <td>
                            <label>{formData.quantity}</label>
                          </td>
                          <td></td>
                        </tr>
                        {tableData.map((entry, index) => (
                          <tr key={nanoid()}>
                            {console.log("entry ", entry)}
                            <td>
                              <input
                                type="number"
                                placeholder="Price"
                                name="price"
                                className="border"
                                value={entry.price}
                                // defaultValue={(allVarientsData != null)?allVarientsData.data[0].price:entry.price}
                                onChange={(e) => handleTableChange(index, e)}
                              />
                            </td>
                            <td></td>
                            <td>
                              <input
                                type="text"
                                placeholder="Min Quantity"
                                name="minQuantity"
                                className="border"
                                value={entry.minQuantity}
                                onChange={(e) => handleTableChange(index, e)}
                              />
                            </td>
                            <td>
                              <select
                                name="currency"
                                className="form-select border"
                                value={entry.currency}
                                onChange={(e) => handleTableChange(index, e)}
                              >
                                <option value="" disabled>
                                  Select Currency
                                </option>
                                <option value="$">$</option>
                                <option value="Rs.">Rs.</option>
                                <option value="€">€</option>
                                <option value="£">£</option>
                              </select>
                            </td>
                            <td>
                              {index === tableData.length - 1 && (
                                <button
                                  id="addRow"
                                  style={{ border: "none" }}
                                  className="bg-white"
                                  onClick={addRow}
                                >
                                  +
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </label>
              </Card>
              <button
                className="btn btn-secondary float-start mt-2 w-25 mx-2"
                onClick={backTrackFunc}
              >
                Back
              </button>
              <button
                className="btn btn-danger float-start mt-2 w-25"
                onClick={handlePublish}
              >
                Update
              </button>
            </div>
          </>
        );
      }
  };

  const getAllVarientsTabs = async () => {
    try {
      let getAllVarientsResponse = await API_WRAPPER.get(
        `/varients/getAll-varientsTabs/${pid}`
      );
      const variants = getAllVarientsResponse.data;
      setVarientsData(variants);

      if (variants.length > 0) {
        setActiveTab({ _id: variants[0]._id, tab: "tab1" });

        const initialPublishState = {};
        variants.forEach((variantList, index) => {
          const tabKey = `tab${index + 1}`;
          initialPublishState[tabKey] =
            sessionStorage.getItem(tabKey) === "true" || index === 0;
        });
        setIsPublished(initialPublishState);
      }
    } catch (error) {
      console.log("Error in getAllVarientsTabs ", error);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Edit Variants"
            subheading="This is admin dashboard which added Variants here provides all the details in a very concise and user-friendly way."
            image={AttributeBannerImage}
          />
          <div className="container mt-3">
            <ul
              className="nav nav-tabs"
              role="tablist"
              style={{ overflowX: "auto" }}
            >
              {varientsData.map((variantList, index) => {
                const variantAttributes = variantList.varients.map((variant) =>
                  Object.entries(variant)
                    .map(([key, value]) => `${key}: ${value}`)
                    .join(", ")
                );
                return (
                  <li className="nav-item" key={index}>
                    <a
                      className={`cursor-pointer nav-link ${
                        activeTab._id === variantList._id &&
                        activeTab.tab === `tab${index + 1}`
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveTab({
                          _id: variantList._id,
                          tab: `tab${index + 1}`,
                        });
                      }}
                    >
                      {variantAttributes.join(" , ")}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="tab-content mt-3">
              {varientsData.map((variantList, index) => (
                <React.Fragment key={index}>
                  {activeTab._id === variantList._id &&
                    activeTab.tab === `tab${index + 1}` &&
                    renderContent(variantList)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditVarients;
