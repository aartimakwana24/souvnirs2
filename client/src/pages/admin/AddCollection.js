import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Header from "../../components/ui/Header";
import { nanoid } from "@reduxjs/toolkit";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animations/index.js";
import CollectionBannerImage from "../../assets/images/collectionImage.png";
import API_WRAPPER from "../../api/index.js";
import success, {
  getStatusStyles,
  getStockStatusStyles,
  swalError,
} from "../../utils/index.js";
import ReusableTable from "../../components/ui/Tables/index.js";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";

function AddCollection() {
  const [showModal, setShowModal] = useState(false);
  const initialFormData = {
    title: "",
    status: "ACTIVE",
    radioSelection: "all",
    filterDivStates: [
      {
        selectedTitle: "",
        conditionValue: "",
        inputValue: "",
      },
    ],
    slug:"",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { title, status, radioSelection, filterDivStates, slug } = formData;
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState("");
  const [conditionValueList, setConditionValueList] = useState([]);
  const [filteredConditionValues, setFilteredConditionValues] = useState([]);
  const [disabledProductIds, setDisabledProductIds] = useState([]);
  const [collectionProductTableList, setCollectionProductTableList] = useState(
    []
  );
  const [formErrors, setFormErrors] = useState({});
  const lastFocusedRef = useRef(null);
  const navigate = useNavigate();
  const getAllCollectionConditions = async () => {
    const response = await API_WRAPPER.get(
      "/collection-condition/get-all-collection-conditions"
    );
    if (response.status === 200) {
      setCollectionConditionList(response?.data);
    }
  };

  const getAllConditionValues = async () => {
    const response = await API_WRAPPER.get(
      "/condition-value/get-all-condition-values"
    );
    if (response.status === 200) {
      setConditionValueList(response?.data);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getAllCollectionConditions();
    getAllConditionValues();
  }, []);

  const handleRadioChange = (e) => {
    setFormData({ ...formData, radioSelection: e.target.value });
  };

  const handleInputValueChange = useCallback((index, value) => {
    setFormData((prevFormData) => {
      const updatedStates = prevFormData.filterDivStates.map((item, i) =>
        i === index ? { ...item, inputValue: value } : item
      );
      return { ...prevFormData, filterDivStates: updatedStates };
    });
  }, []);

  const handleTitleChange = (index, e) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedFilterDivStates = prevData.filterDivStates.map(
        (state, i) => {
          if (i === index) {
            return {
              ...state,
              selectedTitle: value,
              conditionValue: "",
            };
          }
          return state;
        }
      );

      const selectedCondition = collectionConditionList.find(
        (condition) => condition.title === value
      );

      if (selectedCondition) {
        const filteredConditionValues = conditionValueList.filter(
          (condition) => {
            return selectedCondition.result.some(
              (val) => val.conditionValue === condition.conditionValue
            );
          }
        );

        const updatedFilterDivStatesWithConditionValue =
          updatedFilterDivStates.map((state, i) => {
            if (i === index) {
              return {
                ...state,
                conditionValue:
                  filteredConditionValues.length > 0
                    ? filteredConditionValues[0]._id
                    : "",
              };
            }
            return state;
          });

        setFilteredConditionValues((prev) => {
          const updatedFilteredConditionValues = [...prev];
          updatedFilteredConditionValues[index] = filteredConditionValues;
          return updatedFilteredConditionValues;
        });
        return {
          ...prevData,
          filterDivStates: updatedFilterDivStatesWithConditionValue,
        };
      } else {
        setFilteredConditionValues((prev) => {
          const updatedFilteredConditionValues = [...prev];
          updatedFilteredConditionValues[index] = [];
          return updatedFilteredConditionValues;
        });
        return { ...prevData, filterDivStates: updatedFilterDivStates };
      }
    });
  };

  const handleConditionValueChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedStates = prevFormData.filterDivStates.map((item, i) =>
        i === index ? { ...item, conditionValue: value } : item
      );
      return { ...prevFormData, filterDivStates: updatedStates };
    });
  };

  const handleAddFilter = () => {
    setFormData((prevData) => ({
      ...prevData,
      filterDivStates: [
        ...prevData.filterDivStates,
        { selectedTitle: "", conditionValue: "", inputValue: "" },
      ],
    }));
    setFilteredConditionValues((prev) => [...prev, []]);
  };

  const handleRemoveFilter = (index) => {
    setFormData((prevFormData) => {
      const updatedStates = prevFormData.filterDivStates.filter(
        (_, i) => i !== index
      );
      return { ...prevFormData, filterDivStates: updatedStates };
    });
    setFilteredConditionValues((prev) => {
      const updatedFilteredConditionValues = prev.filter((_, i) => i !== index);
      return updatedFilteredConditionValues;
    });
  };

  const postRawFilterData = async () => {
    const isValid = filterDivStates.every((state, index) => {
      if (!state.selectedTitle || !state.conditionValue || !state.inputValue) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [`selectedTitle_${index}`]: !state.selectedTitle
            ? "Please select a title"
            : "",
          [`conditionValue_${index}`]: !state.conditionValue
            ? "Please select a condition value"
            : "",
          [`inputValue_${index}`]: !state.inputValue
            ? "Please enter a value"
            : "",
            [`slug_${index}`]: !state.slug
            ? "Please enter a value"
            : "",
        }));
        return false;
      }

      const numericRegex = /^\d+$/;

      if (
        state.selectedTitle === "price" ||
        state.selectedTitle === "quantity"
      ) {
        if (!numericRegex.test(state.inputValue)) {
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            [`inputValue_${index}`]: "Numeric value required",
          }));
          return false;
        }
      }

      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [`selectedTitle_${index}`]: "",
        [`conditionValue_${index}`]: "",
        [`inputValue_${index}`]: "",
        [`slug_${index}`]: "",
      }));

      return true;
    });

    if (!isValid) {
      swalError("Warning","Please fill in all fields correctly.",()=>{
        setShowModal(false);
      });
      return;
    }
    const changedTitleFilterArr = filterDivStates.map((filter) => {
      switch (filter.selectedTitle) {
        case "varients price":
          return { ...filter, selectedTitle: "compareAtPrice" };

        case "Product Title":
          return { ...filter, selectedTitle: "name" };

        case "Category":
          return { ...filter, selectedTitle: "category" };

        case "Vendor":
          return { ...filter, selectedTitle: "Vendor" };

        case "varients Tag":
          return { ...filter, selectedTitle: "tags" };

        case "min price":
          return { ...filter, selectedTitle: "price" };

        case "varients attribute":
          return { ...filter, selectedTitle: "attributes" };

        default:
          return filter;
      }
    });

    try {
      const response = await API_WRAPPER.post("/collection/filter-data", {
        changedTitleFilterArr,
        radioSelection,
      });

      if (response.status === 200) {
        setCollectionProductTableList(response?.data);
      }
    } catch (error) {
      console.error("Error occurred while posting raw filter data", error);
    }
  };

  useEffect(() => {
    const selectedCondition = collectionConditionList.find(
      (condition) => condition.title === formData.selectedTitle
    );

    if (selectedCondition) {
      const filteredIds = selectedCondition.conditionValues.filter((value) =>
        conditionValueList.some((condition) => condition._id === value)
      );
      setFilteredConditionValues(filteredIds);
    } else {
      setFilteredConditionValues([]);
    }
  }, [formData.selectedTitle, collectionConditionList, conditionValueList]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ row }) => {
          return getStockStatusStyles(row?.original?.stockStatus);
        },
      },
    ],
    []
  );

  const resetForm = () => {
    setFormData(initialFormData);
    setDescriptionValue("");
  };

  const data = useMemo(() => {
    return collectionProductTableList.map((item) => ({
      id: item._id,
      name: item.name,
      stockStatus: item.stockStatus,
      approval: item.approval,
      status: item.stockStatus,
    }));
  }, [collectionProductTableList]);

  const handleUpdateData = (disabledIds) => {
    setDisabledProductIds(disabledIds);
  };

  const postCollection = async (payload) => {
    const response = await API_WRAPPER.post(
      "/collection/create-collection",
      payload
    );
    if (response.status === 201) {
      success("Success", "Collection created succesfully!");
      navigate(PATHS.adminCollection);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required";
      isValid = false;
    }

    if (filterDivStates.some((state) => !state.selectedTitle)) {
      errors.selectedTitle = "Select Title for all conditions";
      isValid = false;
    }

    if (descriptionValue.trim().length === 0) {
      errors.description = "Description is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      swalError("Warning", "Some fields are invalid", () => {
        setShowModal(false);
      });
      return;
    } else {
      let extractedConditionNames = formData.filterDivStates.map(
        (item) => item.selectedTitle
      );
      let extractedConditionValue = formData.filterDivStates.map(
        (item) => item.conditionValue
      );
      let inputValues = formData.filterDivStates.map((item) => item.inputValue);
      let selectedTitle = formData.filterDivStates.map(
        (item) => item.selectedTitle
      );
      const updatedFormData = {
        ...formData,
        description: descriptionValue,
        collectionConditionId: extractedConditionNames,
        conditionValue: extractedConditionValue,
        inputValue: inputValues,
        diactiveProductId: disabledProductIds,
        radioSelection: radioSelection,
        selectedTitle: selectedTitle
      };
      const { filterDivStates, ...updatedFormDataWithoutFilterDivStates } =
        updatedFormData;

      const { filterDivCount, ...abstractedFormData } =
        updatedFormDataWithoutFilterDivStates;

        console.log("abstractedFormData ", abstractedFormData);
      await postCollection(abstractedFormData);
      resetForm();
    }
  };

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading="Add Collections"
              subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
              image={CollectionBannerImage}
            />
            <div className="container">
              <div className="w-full mt-5">
                <div className="row">
                  <div className="col col-lg-7 col-md-12 col-12 me-5 ms-lg-3 bg-light p-4 rounded border my-1">
                    <hr className="mt-4" />
                    <div className="form-group mt-4">
                      <label htmlFor="productName" className="form-label">
                        Collection Title<span className="text-danger">*</span>
                      </label>
                      <input
                        className={`form-control ${
                          formErrors.title ? "is-invalid" : ""
                        }`}
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        min="5"
                        onChange={handleChange}
                        required
                      />
                      {formErrors.title && (
                        <span className="invalid-feedback">
                          {formErrors.title}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col col-lg-4 col-md-12 col-12 bg-light rounded border p-4 my-1">
                    <hr className="mt-4" />
                    <div className="form-group mt-4">
                      <label htmlFor="status" className="form-label">
                        Status<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="status"
                        id="status"
                        value={status}
                        onChange={handleChange}
                      >
                        <option disabled selected>
                          Select Status
                        </option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container bg-light rounded border my-1">
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
                      value={descriptionValue}
                      onChange={setDescriptionValue}
                    />
                    {formErrors.description && (
                      <span className="invalid-feedback">
                        {formErrors.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInVariants}
                className="col-12 bg-light border p-3 my-2 rounded-3"
              >
                <h1>Collections</h1>
                <div className="form-control d-flex align-items-center">
                  <label className="form-label">
                    <span className="label-text">Product must match:</span>
                  </label>
                  <div className="d-flex gap-4 ms-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioSelection"
                      id="radioAll"
                      value="all"
                      checked={radioSelection === "all"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="radioAll">
                      <span className="label-text">all conditions</span>
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="radioSelection"
                      id="radioAny"
                      value="any"
                      checked={radioSelection === "any"}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="radioAny">
                      <span className="label-text">any conditions</span>
                    </label>
                  </div>
                </div>
                {filterDivStates.map((state, index) => (
                  <div
                    id={`filter-div-${index + 1}`}
                    className="row g-3 mt-4"
                    key={index}
                  >
                    <div className="col col-lg-3 col-md-6 col-12">
                      <select
                        onChange={(e) => handleTitleChange(index, e)}
                        value={state.selectedTitle}
                        placeholder="Title"
                        className={`form-select ${
                          formErrors[`selectedTitle_${index}`]
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="" selected disabled>
                          Select Title
                        </option>
                        {collectionConditionList?.map((item) => (
                          <option key={nanoid()} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                      {formErrors[`selectedTitle_${index}`] && (
                        <span className="invalid-feedback">
                          {formErrors[`selectedTitle_${index}`]}
                        </span>
                      )}
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                      <select
                        onChange={(e) =>
                          handleConditionValueChange(index, e.target.value)
                        }
                        value={state.conditionValue}
                        placeholder="Condition Value"
                        className={`form-select ${
                          formErrors[`conditionValue_${index}`]
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="" selected disabled>
                          Select Condition Value
                        </option>
                        {filteredConditionValues[index]?.map((condition) => (
                          <option key={condition._id} value={condition._id}>
                            {condition.conditionValue}
                          </option>
                        ))}
                      </select>
                      {formErrors[`conditionValue_${index}`] && (
                        <span className="invalid-feedback">
                          {formErrors[`conditionValue_${index}`]}
                        </span>
                      )}
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                      <input
                        type="text"
                        onChange={(e) =>
                          handleInputValueChange(index, e.target.value)
                        }
                        value={state.inputValue}
                        placeholder="Enter Value"
                        className={`form-control ${
                          formErrors[`inputValue_${index}`] ? "is-invalid" : ""
                        }`}
                        ref={(el) => {
                          if (index === filterDivStates.length - 1) {
                            lastFocusedRef.current = el;
                          }
                        }}
                      />
                      {formErrors[`inputValue_${index}`] && (
                        <span className="invalid-feedback">
                          {formErrors[`inputValue_${index}`]}
                        </span>
                      )}
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveFilter(index)}
                        type="button"
                      >
                        Remove Filter
                      </button>
                    </div>
                  </div>
                ))}
                <div className="row g-3 mt-3">
                  <div className="col col-lg-3 col-md-6 col-12">
                    <button
                      className="btn btn-outline-primary"
                      onClick={handleAddFilter}
                      type="button"
                    >
                      Add Filter
                    </button>
                  </div>
                  <div className="col col-lg-9 col-md-6 col-12">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={postRawFilterData}
                    >
                      Submit Filters
                    </button>
                  </div>
                </div>

                {collectionProductTableList ? (
                  <>
                    <div className="border mt-3">
                      <ReusableTable
                        columns={columns}
                        data={data}
                        showButtons
                        pageSize={10}
                        enablePagination
                        actionButton="FilterCollection"
                        buttonType="false"
                        onUpdateData={handleUpdateData}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p>Loading....</p>
                  </>
                )}
              </motion.div>

              <div className="form-group mt-4">
                <label htmlFor="productName" className="form-label">
                  Add Slug<span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control ${
                    formErrors.slug ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="slug"
                  id="slug"
                  value={slug}
                  min="5"
                  onChange={handleChange}
                  required
                />
                {formErrors.slug && (
                  <span className="invalid-feedback">{formErrors.slug}</span>
                )}
              </div>

              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-primary mt-4"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Add Collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCollection;
