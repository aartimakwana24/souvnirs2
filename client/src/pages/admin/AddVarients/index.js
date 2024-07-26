import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "../../../components/ui/Header";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Draggable from "react-draggable";
import { GrFormClose } from "react-icons/gr";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import Dropzone from "../../../components/ui/Dropzone/index.js";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animations/index";
import img from "../../../assets/images/productManagementImage.png";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER from "../../../api";
import Card from "../../../components/ui/Card/index.js";
import success, { swalError } from "../../../utils/index.js";
import {
  useFormValidation,
  useTableDataValidation,
  usePublishValidation,
} from "../../../utils/index.js";
function AddVarients() {
  const [activeTab, setActiveTab] = useState({ _id: "", tab: "tab1" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [imagePaths, setImagePaths] = useState([]);
  const [formData, setFormData] = useState({ img: [] });
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
  const [isFirstStepCompleted, setIsFirstStepCompleted] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [croppedImageUrl, setCroppedImageUrl] = useState("");
  const [validErr, setValidationErrors] = useState({});
  const [tableValidErr, setTableValidationErrors] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pid = searchParams.get("pid");
  const { validationErrors, validateField, validateNotEmpty, validateForm } =
    useFormValidation(formData, activeTab._id);

  const { tableValidationErrors, validateTableData } =
    useTableDataValidation(tableData);

  const { publishValidationErrors, validatePublish } =
    usePublishValidation(tableData);
  const getAllVarientsData = async () => {
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
      console.log("Error in getAllVarientsData ", error);
    }
  };

  useEffect(() => {
    getAllVarientsData();
  }, [pid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const validations = {
      quantity: { validator: validateField, regex: /^\d+$/ },
      price: { validator: validateField, regex: /^\d+$/ },
      sku: { validator: validateNotEmpty },
      status: { validator: validateNotEmpty },
      readyToShip: { validator: validateNotEmpty },
      freeShipping: { validator: validateNotEmpty },
    };

    const error = validations[name].validator(
      name,
      value,
      validations[name]?.regex
    );
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
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
  useEffect(() => {
    const fetchData = async () => {
      const data = JSON.parse(
        sessionStorage.getItem(`formData${activeTab._id}`)
      );
      if (data && data.tags && Array.isArray(data.tags)) {
        setTagsArray(data.tags);
      }
    };
    fetchData();
  }, [activeTab._id]);

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

  const handleCropImage = () => {
    const parentElement = document.getElementById("parentElement");
    const canvas = document.createElement("canvas");
    canvas.width = foregroundWidth;
    canvas.height = foregroundHeight;
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
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
      inputRefs.current = [
        {
          price: React.createRef(),
          minQuantity: React.createRef(),
          currency: React.createRef(),
        },
      ];
    }
  }, [varientsData, activeTab]);

  const [lastFocused, setLastFocused] = useState({
    index: 0,
    field: "minQuantity",
  });
  const inputRefs = useRef([
    {
      price: React.createRef(),
      minQuantity: React.createRef(),
      currency: React.createRef(),
    },
  ]);

  useEffect(() => {
    const { index, field } = lastFocused;
    if (inputRefs.current[index] && inputRefs.current[index][field].current) {
      inputRefs.current[index][field].current.focus();
    }
  }, [tableData, lastFocused]);

  const addRow = () => {
    setTableData((prevData) => {
      const newData = [
        ...prevData,
        { price: "", minQuantity: "", currency: "" },
      ];
      inputRefs.current.push({
        price: React.createRef(),
        minQuantity: React.createRef(),
        currency: React.createRef(),
      });
      return newData;
    });

    setLastFocused({ index: tableData.length, field: "minQuantity" });
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index][name] = value;
      return newData;
    });

    setLastFocused({ index, field: name });

    console.log("Table data ", tableData);
    const rowToValidate = tableData[index];
    const rowErrors = {
      price: validateField("price", rowToValidate.price, /^\d+$/),
      minQuantity: validateField(
        "minQuantity",
        rowToValidate.minQuantity,
        /^\d+$/
      ),
      currency: validateNotEmpty("currency", rowToValidate.currency),
    };

    setTableValidationErrors((prevErrors) => {
      const newErrors = [...prevErrors];
      newErrors[index] = rowErrors;
      return newErrors;
    });
  };

  const handleSubmit = async (e, _id) => {
    e.preventDefault();

    if (validateForm(_id)) {
      setBackTrack(1);

      let storedData =
        JSON.parse(sessionStorage.getItem(`formData${_id}`)) || {};
      const formDataToSend = {
        ...storedData,
        _id: _id,
      };

      console.log("storedData ", storedData);

      if (description.trim() !== "") {
        formDataToSend.description = description;
      }
      if (tagsArray.length > 0) {
        formDataToSend.tags = tagsArray;
      }
      if (croppedImageUrl && croppedImageUrl.trim() !== "") {
        formDataToSend.croppedImageUrl = croppedImageUrl;
      }
      if (
        foregroundX !== undefined &&
        foregroundY !== undefined &&
        foregroundHeight !== undefined &&
        foregroundWidth !== undefined
      ) {
        formDataToSend.customization = {
          xAxis: foregroundX,
          yAxis: foregroundY,
          height: foregroundHeight,
          width: foregroundWidth,
        };
      }
      if (formData.img && formData.img.length > 0) {
        formDataToSend.img = formData.img;
      }
      if (formData.quantity !== undefined && formData.quantity.trim() !== "") {
        formDataToSend.quantity = formData.quantity;
      }
      if (formData.status !== undefined && formData.status.trim() !== "") {
        formDataToSend.status = formData.status;
      }
      if (formData.price !== undefined && formData.price.trim() !== "") {
        formDataToSend.price = formData.price;
      }
      if (formData.sku !== undefined && formData.sku.trim() !== "") {
        formDataToSend.sku = formData.sku;
      }
      if (
        formData.readyToShip !== undefined &&
        formData.readyToShip.trim() !== ""
      ) {
        formDataToSend.readyToShip = formData.readyToShip;
      }
      if (
        formData.freeShipping !== undefined &&
        formData.freeShipping.trim() !== ""
      ) {
        formDataToSend.freeShipping = formData.freeShipping;
      }
      sessionStorage.setItem(`formData${_id}`, JSON.stringify(formDataToSend));
    } else {
      swalError("Warning", "Form has validation errors.", () => {
        setShowModal(false);
      });
    }
  };

  const handlePublish = async () => {
    try {
      const isTableValid = validateTableData();
      const isPublishValid = validatePublish();
      let publish = document.getElementById("publish").value;
      setFormData({ ...formData, publish });

      if (isTableValid && isPublishValid) {
        const storedFormData = JSON.parse(
          sessionStorage.getItem(`formData${activeTab._id}`)
        );

        if (storedFormData) {
          let totalPrice = 0;
          let totalQuantity = 0;
          let dataIsValid = true;
          let allRowErrors = [];

          tableData.forEach((item, index) => {
            const rowErrors = {
              price: validateField("price", item.price, /^\d+$/),
              minQuantity: validateField(
                "minQuantity",
                item.minQuantity,
                /^\d+$/
              ),
              currency: validateNotEmpty("currency", item.currency),
            };

            allRowErrors.push(rowErrors);

            totalPrice += parseFloat(item.price);
            totalQuantity += parseInt(item.minQuantity);
          });

          let dataValidationMessage = "";
          if (totalPrice > parseFloat(storedFormData.price)) {
            dataIsValid = false;
            dataValidationMessage += `Total price cannot exceed ${storedFormData.price}. `;
          }

          if (totalQuantity > parseInt(storedFormData.quantity)) {
            dataIsValid = false;
            dataValidationMessage += `Total quantity cannot exceed ${storedFormData.quantity}. `;
          }

          setTableValidationErrors(allRowErrors);

          if (!dataIsValid) {
            swalError(
              "Warning",
              dataValidationMessage +
                "Some table data entries are invalid. Please correct them.",
              () => {
                setShowModal(false);
              }
            );
            return;
          }

          const formDataToSend = new FormData();
          formDataToSend.append("quantity", storedFormData.quantity);
          formDataToSend.append("status", storedFormData.status);
          formDataToSend.append("readyToShip", storedFormData.readyToShip);
          formDataToSend.append("freeShipping", storedFormData.freeShipping);
          formDataToSend.append("price", storedFormData.price);
          formDataToSend.append("sku", storedFormData.sku);
          formDataToSend.append("description", storedFormData.description);
          formDataToSend.append("pvid", activeTab._id);
          formDataToSend.append("data", JSON.stringify(tableData));
          formData.img.forEach((file, index) => {
            formDataToSend.append(`img`, file);
          });

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
              setFormData({
                price: "",
                quantity: "",
                status: "",
                freeShipping: "",
                readyToShip: "",
                sku: "",
                publish: "",
                img: [],
              });
              success("Variant Created", "Variant Created Successfully!");

              const currentIndex = varientsData.findIndex(
                (variant) => variant._id === activeTab._id
              );
              const updatedIsPublished = { ...isPublished };
              if (currentIndex < varientsData.length - 1) {
                updatedIsPublished[`tab${currentIndex + 2}`] = true;
                sessionStorage.setItem(`tab${currentIndex + 2}`, "true");
              }
              setIsPublished(updatedIsPublished);

              if (currentIndex < varientsData.length - 1) {
                setActiveTab({
                  _id: varientsData[currentIndex + 1]._id,
                  tab: `tab${currentIndex + 2}`,
                });
                setBackTrack(0);
              } else {
                sessionStorage.clear();
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
              setFormData({
                price: "",
                quantity: "",
                status: "",
                freeShipping: "",
                readyToShip: "",
                sku: "",
                publish: "",
                img: [],
              });

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
                setBackTrack(0);
              } else {
                sessionStorage.clear();
                navigate(PATHS.adminProductManagement);
              }
            }
          }
        } else {
          console.log(`No formData found for activeTab._id ${activeTab._id}`);
        }
      } else {
        swalError("Warning", "Form has validation errors.", () => {
          setShowModal(false);
        });
      }
    } catch (error) {
      console.log("error in handlePublish ", error);
    }
  };

  useEffect(() => {
    if (formData.img.length > 0) {
      const paths = formData.img.map((file) => URL.createObjectURL(file));
      setImagePaths(paths);
      setPreview(paths[0]);
    }
  }, [formData.img]);

  if (!activeTab) {
    return null;
  }

  const backTrackFunc = () => {
    setBackTrack(0);
  };

  const handleImageClick = (e, path) => {
    e.preventDefault();
    setPreview(path);
  };

  const renderContent = (variantList) => {
    const { _id, tab } = activeTab;
    const data = JSON.parse(sessionStorage.getItem(`formData${_id}`));

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
                        defaultValue={data != null ? data.quantity : ""}
                        min="5"
                        required
                      />
                      {validationErrors.quantity && (
                        <span className="text-danger">
                          {validationErrors.quantity}
                        </span>
                      )}
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
                          {data != null ? data.status : "Select Status"}
                        </option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                      {validationErrors.status && (
                        <span className="text-danger">
                          {validationErrors.status}
                        </span>
                      )}
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
                          {data != null ? data.readyToShip : "Default"}
                        </option>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                      </select>
                      {validationErrors.readyToShip && (
                        <span className="text-danger">
                          {validationErrors.readyToShip}
                        </span>
                      )}
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
                          {data != null ? data.freeShipping : "Default"}
                        </option>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                      </select>
                      {validationErrors.freeShipping && (
                        <span className="text-danger">
                          {validationErrors.freeShipping}
                        </span>
                      )}
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
                        // value={description}
                        defaultValue={
                          data != null ? data.description : { description }
                        }
                        onChange={setDescription}
                      />
                      {validationErrors.description && (
                        <span className="text-danger">
                          {validationErrors.description}
                        </span>
                      )}
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
                        type="number"
                        name="price"
                        defaultValue={data != null ? data.price : " "}
                        required
                      />
                      {validationErrors.price && (
                        <span className="text-danger">
                          {validationErrors.price}
                        </span>
                      )}
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
                      {validationErrors.tags && (
                        <span className="text-danger">
                          {validationErrors.tags}
                        </span>
                      )}

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
                        defaultValue={data != null ? data.sku : " "}
                      />
                      {validationErrors.sku && (
                        <span className="text-danger">
                          {validationErrors.sku}
                        </span>
                      )}
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
                      <Dropzone onFilesChange={handleFilesChange} />
                      {validationErrors.images && (
                        <span className="text-danger">
                          {validationErrors.images}
                        </span>
                      )}
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
                          <td>
                            <input
                              ref={inputRefs.current[index]?.price}
                              type="text"
                              placeholder="Price"
                              name="price"
                              className="border"
                              value={entry.price}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                            <br />
                            {tableValidationErrors[index]?.price && (
                              <span className="text-danger">
                                {tableValidationErrors[index].price}
                              </span>
                            )}
                          </td>
                          <td></td>
                          <td>
                            <input
                              ref={inputRefs.current[index]?.minQuantity}
                              type="text"
                              placeholder="Min Quantity"
                              name="minQuantity"
                              className="border"
                              value={entry.minQuantity}
                              onChange={(e) => handleTableChange(index, e)}
                            />
                            <br />
                            {tableValidationErrors[index]?.minQuantity && (
                              <span className="text-danger">
                                {tableValidationErrors[index].minQuantity}
                              </span>
                            )}
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
                              <option value="Rs">Rs</option>
                              <option value="€">€</option>
                              <option value="£">£</option>
                            </select>
                            <br />
                            {tableValidationErrors[index]?.currency && (
                              <span className="text-danger">
                                {tableValidationErrors[index].currency}
                              </span>
                            )}
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
              value="publish"
              name="publish"
              id="publish"
            >
              Publish
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Variants"
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
                        isPublished[`tab${index + 1}`] ? "" : "disabled"
                      } ${
                        activeTab._id === variantList._id &&
                        activeTab.tab === `tab${index + 1}`
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        isPublished[`tab${index + 1}`] &&
                        setActiveTab({
                          _id: variantList._id,
                          tab: `tab${index + 1}`,
                        })
                      }
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

export default AddVarients;
