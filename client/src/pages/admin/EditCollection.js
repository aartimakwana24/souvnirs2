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
} from "../../utils/index.js";
import ReusableTable from "../../components/ui/Tables/EditIndex.js";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";

function EditCollection() {
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
    slug:""
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
  const lastFocusedRef = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
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
    fetchCollectionData(params.id);
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

  // const handleRemoveFilter = (index) => {
  //   setFormData((prevFormData) => {
  //     const updatedStates = prevFormData.filterDivStates.filter(
  //       (_, i) => i !== index
  //     );
  //     return { ...prevFormData, filterDivStates: updatedStates };
  //   });
  //   setFilteredConditionValues((prev) => {
  //     const updatedFilteredConditionValues = prev.filter((_, i) => i !== index);
  //     return updatedFilteredConditionValues;
  //   });
   
  // };

  const handleRemoveFilter = (indexToRemove) => {
    setFormData((prevFormData) => {
      const updatedFilterDivStates = [...prevFormData.filterDivStates];
      const updatedSelectedTitle = [...prevFormData.selectedTitle];
      const updatedConditionValue = [...prevFormData.conditionValue];
      const updatedInputValue = [...prevFormData.inputValue];

      // Remove the filter from filterDivStates
      updatedFilterDivStates.splice(indexToRemove, 1);

      // Also remove the corresponding entries in selectedTitle, conditionValue, and inputValue
      updatedSelectedTitle.splice(indexToRemove, 1);
      updatedConditionValue.splice(indexToRemove, 1);
      updatedInputValue.splice(indexToRemove, 1);

      return {
        ...prevFormData,
        filterDivStates: updatedFilterDivStates,
        selectedTitle: updatedSelectedTitle,
        conditionValue: updatedConditionValue,
        inputValue: updatedInputValue,
        // If radioSelection is per filter, remove it similarly
        // If it's global, handle it separately
      };
    });
  };

  useEffect(() => {
    console.log("Form Data after removing filter:", formData);
    console.log("Filtered Condition Values:", filteredConditionValues);
  }, [formData, filteredConditionValues]);

  const fetchCollectionData = async (id) => {
    try {
      const [
        collectionResponse,
        conditionValuesResponse,
        collectionConditionsResponse,
      ] = await Promise.all([
        API_WRAPPER.get(`/collection/get-collection-by-id/:${id}`),
        API_WRAPPER.get("/condition-value/get-all-condition-values"),
        API_WRAPPER.get("/collection-condition/get-all-collection-conditions"),
      ]);

      if (collectionConditionsResponse.status === 200) {
        setCollectionConditionList(collectionConditionsResponse.data);
      }

      if (conditionValuesResponse.status === 200) {
        setConditionValueList(conditionValuesResponse.data);
      }

      if (collectionResponse.status === 200) {
        const response = collectionResponse.data;
        console.log("collectionResponse response ", response);
        let filterdivStates = [];

        const collectionConditionList = collectionConditionsResponse.data;
        const collectionConditionListIDs = collectionConditionList.map(
          (cond) => cond._id
        );
        for (let i = 0; i < response.collectionConditionId.length; i++) {
          const currentID = response.collectionConditionId[i];

          const condition = collectionConditionList.find(
            (data) => data.title === currentID
          );

          const conditionValueObject = conditionValuesResponse.data.find(
            (cond) => cond._id === response.conditionValue[i]
          );

          const conditionValue = conditionValueObject
            ? conditionValueObject.conditionValue
            : "";

          filterdivStates.push({
            selectedTitle: currentID,
            conditionValue: conditionValue,
            inputValue: response.inputValue[i],
            radioSelection: response.radioSelection,
          });

          console.log("filterdivStates ",filterdivStates);
          setFormData({
            ...response,
            filterDivStates: filterdivStates,
            // radioSelection: radioSelection,
          });

          setDescriptionValue(response?.description);
          if (condition) {
            const filteredConditionValues = conditionValuesResponse.data.filter(
              (cond) =>
                condition.result.some(
                  (val) => val.conditionValue === cond.conditionValue
                )
            );

            setFilteredConditionValues((prev) => {
              const updatedFilteredConditionValues = [...prev];
              updatedFilteredConditionValues[i] = filteredConditionValues;
              return updatedFilteredConditionValues;
            });
          }
        }

        const changedTitleFilterArr = filterdivStates.map((filter) => {
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
            let collectionProductsData = collectionResponse.data;

            if (
              collectionProductsData &&
              Array.isArray(collectionProductsData.diactiveProductId)
            ) {
              const filteredProducts = response?.data.filter((product) => {
                return collectionProductsData.diactiveProductId.includes(
                  product._id
                );
              });

              if (filteredProducts.length > 0) {
                const ids = filteredProducts.map((data) => data._id);
                setDisabledProductIds(ids);
              } else {
                console.error(
                  "Invalid data structure or undefined diactiveProductId in collectionProductsData."
                );
              }
            }
          }
        } catch (error) {
          console.error("Error occurred while posting raw filter data", error);
        }
      }
    } catch (error) {
      console.error("Error fetching collection data:", error);
    }
  };

  const postRawFilterData = async () => {
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
    if (disabledIds.length > 0) {
      setDisabledProductIds(disabledIds);
    }
  };

  const postCollection = async (payload) => {
    try {
      let id = params.id;
      console.log("payload ", payload);
      const response = await API_WRAPPER.put(
        `/collection/update-collection/:${id}`,
        payload
      );
      if (response.status === 200) {
        success("Success", "Collection Edited succesfully!");
        navigate(PATHS.adminCollection);
      }
    } catch (error) {
      console.log("Error in postCollection ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let extractedConditionNames = formData.filterDivStates.map(
      (item) => item.selectedTitle
    );
    let extractedConditionValue = formData.filterDivStates.map(
      (item) => item.conditionValue
    );
    let inputValues = formData.filterDivStates.map((item) => item.inputValue);
    const updatedFormData = {
      ...formData,
      description: descriptionValue,
      collectionConditionId: extractedConditionNames,
      conditionValue: extractedConditionValue,
      inputValue: inputValues,
      diactiveProductId: disabledProductIds,
      radioSelection: radioSelection,
    };
    const { filterDivStates, ...updatedFormDataWithoutFilterDivStates } =
      updatedFormData;

    const { filterDivCount, ...abstractedFormData } =
      updatedFormDataWithoutFilterDivStates;

      console.log("abstractedFormData in dit Collection.js", abstractedFormData);
    await postCollection(abstractedFormData);
    // resetForm();
  };

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading="Edit Collections"
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
                        className="form-control"
                        type="text"
                        name="title"
                        id="title"
                        value={title}
                        min="5"
                        onChange={handleChange}
                        required
                      />
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
                        className="form-select"
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
                    </div>
                    {state.conditionValue && (
                      <div className="col col-lg-3 col-md-6 col-12">
                        <select
                          onChange={(e) =>
                            handleConditionValueChange(index, e.target.value)
                          }
                          value={state.conditionValue}
                          placeholder="Condition Value"
                          className="form-select"
                        >
                          <option value="" selected disabled>
                            Select Condition Value
                          </option>
                          {filteredConditionValues[index]?.map((condition) => (
                            <>
                              <option
                                key={condition.conditionValue}
                                value={condition.conditionValue}
                              >
                                {condition.conditionValue}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="col col-lg-3 col-md-6 col-12">
                      <input
                        type="text"
                        onChange={(e) =>
                          handleInputValueChange(index, e.target.value)
                        }
                        value={state.inputValue}
                        placeholder="Enter Value"
                        className="form-control"
                        ref={(el) => {
                          if (index === filterDivStates.length - 1) {
                            lastFocusedRef.current = el;
                          }
                        }}
                      />
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
                        setDisabledProductIds={setDisabledProductIds}
                        disabledProductIds={disabledProductIds}
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
                  Slug<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="slug"
                  id="slug"
                  value={slug}
                  min="5"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-primary mt-4"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Edit Collection
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

export default EditCollection;
