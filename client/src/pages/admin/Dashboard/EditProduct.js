import { PATHS } from "../../../Routes/paths";
import { useState, useEffect } from "react";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { AiFillInfoCircle } from "react-icons/ai";
import SearchableDropdown from "../../../components/ui/SearchableDropdown/EditIndex.js";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import useCategories from "../../../hook/useCategories";
import Header from "../../../components/ui/Header/index.js";
import { nanoid } from "@reduxjs/toolkit";
import { motion } from "framer-motion";
import { fadeInFromLeftVariant } from "../../../animations/index.js";
import success from "../../../utils/index.js";
import React from "react";
import {
  Form,
  Link,
  Navigate,
  useNavigate,
  useParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Card from "../../../components/ui/Card/index.js";
import API_WRAPPER from "../../../api/index.js";
import { setProduct } from "../../../features/appConfig/addProductSlice.js";
import { swalError } from "../../../utils/index.js";

function EditProduct() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [vendoreName, setVendoreName] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [showData, setShowData] = useState(false);
  const [vendorsList, setVendorsList] = useState([]);
  const [formData, setFormData] = useState({});
  const [attributesList, setAttributesList] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [allVariantData, setAllVariantData] = useState([]);
  const [showModal,setShowModal] = useState(false);

  const categories = useCategories();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

   const pid = searchParams.get("pid");
  const { id} = useParams();
  const [query] = useSearchParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getAllVendors = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorsList(response?.data?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };

  const handleSelectedValue = (category) => {
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    setSelectedAttributes([]);
    setFormData((prevData) => ({
      ...prevData,
      categoryId: category?.id,
      categoryName: category?.name,
      selectedAttributes: [],
    }));
  };

  const fetchAllAttributes = async () => {
    try {
      if (categoryId) {
        const response = await API_WRAPPER.get(
          `/attribute/get-all-attributes/${categoryId}`
        );
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.log("Error in fetchAllAttributes in edit product ", error);
    }
  };

  const scrollToSection = () => {
    const targetElement = document.getElementById("selectedattributes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const attributeSelection = (e) => {
    const selectedAttribute = attributesList.find(
      (att) => att._id === e.target.value
    );
    const currentSelectedAttributes = formData.selectedAttributes || [];

    if (
      !selectedAttributes.some((att) => att._id === selectedAttribute._id) ||
      !currentSelectedAttributes.some(
        (att) => att._id === selectedAttribute._id
      )
    ) {
      setSelectedAttributes((prevSelectedAttributes) => [
        ...prevSelectedAttributes,
        selectedAttribute,
      ]);
      const updatedSelectedAttributes = [
        ...currentSelectedAttributes,
        selectedAttribute,
      ];
      setFormData((prevData) => ({
        ...prevData,
        selectedAttributes: updatedSelectedAttributes,
      }));
      scrollToSection();
    }
  };

  const convertAttributesList = (arr) => {
    return arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };

  const isEqualVariants = (variant1, variant2) => {
    return JSON.stringify(variant1) === JSON.stringify(variant2);
  };

  const removeAttributeValue = (attributeName, valueToRemove) => {
    setAttributeValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [attributeName]: prevValues[attributeName].map(
          (value) =>
            Array.isArray(value)
              ? value.filter((item) => item !== valueToRemove)
              : value !== valueToRemove
              ? value
              : null // If the value is equal to the valueToRemove, replace it with null
        ),
      };
      const isAttributeEmpty = updatedValues[attributeName].every(
        (value) => value === null
      );

      if (isAttributeEmpty) {
        const { [attributeName]: removedAttribute, ...remainingAttributes } =
          updatedValues;
        setFormData(remainingAttributes);
      } else {
        setFormData(updatedValues);
      }
      return updatedValues;
    });
  };

  const handleAtttributeValueSelection = (e, att) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newValue = e.target.value.trim();
      if (newValue) {
        setAttributeValues((prevValues) => {
          const existingValues = prevValues[att.name] || [];
          let flatArray = Array.isArray(existingValues[0])
            ? existingValues[0]
            : existingValues;

          if (!flatArray.includes(newValue)) {
            flatArray = [...flatArray, newValue];
          }

          const updatedValues = [flatArray];
          setFormData((prevFormData) => ({
            ...prevFormData,
            [att.name]: updatedValues,
          }));

          return {
            ...prevValues,
            [att.name]: updatedValues,
          };
        });

        e.target.value = "";
      }
    }
  };

  const getProductVariants = async () => {
    try {
      const response = await API_WRAPPER.get(`/product/variants2/${id}`);
      const productData = response.data;
      setProductName(productData.result[0].name);
      setVendoreName(productData.vName);
      setProduct(productData);
      setCategoryName(productData.catData.name);
      setCategoryId(productData.result[0].categoryId);
      setSelectedAttributes(productData.attributeObjects);
      fetchAllAttributes();
      setCombinations(productData.showVarients.varients);
      const attributeMap = {};

      productData.varients.forEach((variant) => {
        Object.entries(variant).forEach(([key, value]) => {
          if (!attributeMap[key]) {
            attributeMap[key] = new Set();
          }
          attributeMap[key].add(value);
        });
      });

      setFormData({
        productName: productData.result[0].name,
        vendorName: productData.vName,
        categoryName: productData.catData.name,
        categoryId: productData.result[0].categoryId,
        selectedAttributes: productData.attributeObjects,
        vendorId: productData.result[0].vendorId,
        price: productData.result[0].price,
        quantity: productData.result[0].quantity,
      });
      setAttributeValues(productData.attValues);
    } catch (error) {
      console.log("Error in getProductVariants in editProduct.js ", error);
    }
  };

  useEffect(() => {
    getProductVariants();
  }, []);

  useEffect(() => {
    getAllVendors();
  }, []);

  useEffect(() => {
    fetchAllAttributes();
  }, [categoryId]);

const handleSubmitUpdate = async () => {
  try {
    const response = await API_WRAPPER.put(`/product/update2/${id}`, {
      formData: { ...formData, selectedAttributes },
    });

    if (response.status === 200) {
      const allAttributesValues = response.data.allAttributesValues;
      const allMatchingAttributesName = response.data.attributesName;
      const productId = response.data.id;

      const generateCombinations = (attributes, names) => {
        const mapIdToName = names.reduce((acc, item) => {
          acc[item._id] = item.name;
          return acc;
        }, {});

        const structuredAttributes = attributes.map((attr) => ({
          name: mapIdToName[attr.paid],
          values: attr.attvalue,
        }));

        const combinations = (prefix, attributes) => {
          if (attributes.length === 0) return [prefix];

          const [first, ...rest] = attributes;
          const result = [];
          for (const value of first.values) {
            result.push(
              ...combinations([...prefix, { [first.name]: value }], rest)
            );
          }
          return result;
        };

        return combinations([], structuredAttributes);
      };
       const allVarientsResponse = await API_WRAPPER.get(
         `/varients/getParticular-varients/${pid}`
       );
      if (allVarientsResponse.status === 200) {
        const allVarientsData = allVarientsResponse.data;
        const newCombinations = generateCombinations(
          allAttributesValues,
          allMatchingAttributesName
        );
        const organizedCombinations = newCombinations.map((combination) => {
          const obj = {};
          combination.forEach((attribute) => {
            const key = Object.keys(attribute)[0];
            const value = attribute[key];
            obj[key] = value;
          });
          return obj;
        });
        setCombinations(organizedCombinations);

        const uniqueVariants = [];

        for (const variant of allVarientsData) {
          const variantObj = variant.varients[0];
          if (
            !organizedCombinations.some((orgVariant) =>
              isEqual(orgVariant, variantObj)
            )
          ) {
            uniqueVariants.push(variantObj);
          }
        }

        for (const variant of organizedCombinations) {
          if (
            !allVarientsData.some((data) => isEqual(data.varients[0], variant))
          ) {
            uniqueVariants.push(variant);
          }
        }

        if (uniqueVariants.length === 0) {
          console.log("No unique variants found.");
        }
        uniqueVariants.map(async(uniqueVariant)=>{
             let varientsResponse = await API_WRAPPER.post(
               `/varients/update-varients/${productId}`,
               uniqueVariant
             );
        })
      }
    }
  } catch (error) {
    console.log("Error in handleSubmitUpdate ", error);
    swalError("Update Failed", "Failed to update the product", () =>
        setShowModal(false));
  }
};

const isEqual = (obj1, obj2) => {
  const values1 = Object.values(obj1).sort().join(",");
  const values2 = Object.values(obj2).sort().join(",");
  return values1 === values2;
};

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading="Edit Products"
              subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. isadjv oiasreoi ihusdf bquhwdi euh."
              //   image={productManagementImage}
            />
            <div className="w-full mt-5">
              <form>
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
                        defaultValue={productName}
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
                        value={formData?.vendorId}
                      >
                        <option value="" disabled selected>
                          {vendoreName}
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
              </form>
              <div className="row mt-4">
                <div className="col col-lg-12 col-md-12 col-12 me-5 ms-lg-3 bg-light  p-4 rounded border my-1">
                  <motion.div
                    variants={fadeInFromLeftVariant}
                    animate="animate"
                    initial="initial"
                    className="bg-light"
                  >
                    <h4>Add Categories Here</h4>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          {/* {!attSelected && !showData ? ( */}
                          <div className="">
                            <div className="row p-2">
                              <div className="col-lg-6 col-md-12 col-12 ">
                                <div className="bg-light rounded">
                                  <SearchableDropdown
                                    handleSelect={handleSelectedValue}
                                    items={categories}
                                    categoryName={categoryName}
                                    setFormData={setFormData}
                                  />
                                </div>
                              </div>
                              {/* {categoryId && (
                                <div className="col-lg-6 col-md-12 col-12">
                                  <Card>
                                    <div className="p-2">
                                      <div className="d-lg-flex ">
                                        <div className="col col-lg-9 col-md-3 col-12">
                                          <p className="fw-bold">
                                            Select Attributes: (Optional)
                                          </p>
                                        </div>
                                        <div className="col col-lg-2 col-md-6 col-12">
                                          <AiFillInfoCircle className="fs-4 my-2" />
                                        </div>
                                        <div className="col col-lg-2 col-md-3 col-12">
                                          <div className="dropdown dropdown-left">
                                            <button
                                              className="btn btn-circle"
                                              id="dropdownMenuButton1"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <BsCaretDown className="text-primary fs-3 " />
                                            </button>
                                            <ul className="dropdown-menu ">
                                              <li className="">
                                                <select
                                                  className="form-select"
                                                  name=""
                                                  onChange={(e) => {
                                                    attributeSelection(e);
                                                  }}
                                                  multiple={true}
                                                >
                                                  {convertAttributesList(
                                                    attributesList
                                                  ).map((item) => (
                                                    <option
                                                      className="cursor-pointer border-1 shadow-lg rounded my-3 py-2 me-4 px-lg-2"
                                                      key={item.value}
                                                      value={item.value}
                                                    >
                                                      {item.label}
                                                    </option>
                                                  ))}
                                                </select>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <Tooltip
                                      effect="solid"
                                      id="my-tooltip"
                                      style={{
                                        zIndex: 9999,
                                        background: "#4680ff36",
                                      }}
                                    />
                                  </Card>
                                </div>
                              )} */}
                              {categoryId && (
                                <div className="col-lg-6 col-md-12 col-12 border">
                                  <div className="dropdown w-100">
                                    <button
                                      className="btn btn-circle w-100"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Select Attributes
                                      <BsCaretDown className="text-primary fs-3 " />
                                    </button>
                                    <ul className="dropdown-menu w-100">
                                      <li className="">
                                        <select
                                          className="form-select"
                                          name=""
                                          onChange={(e) => {
                                            attributeSelection(e);
                                          }}
                                          multiple={true}
                                        >
                                          {convertAttributesList(
                                            attributesList
                                          ).map((item) => (
                                            <option
                                              className="cursor-pointer bg-light border-1 shadow-lg rounded my-3 py-2 me-4 px-lg-2 w-100"
                                              key={item.value}
                                              value={item.value}
                                            >
                                              {item.label}
                                            </option>
                                          ))}
                                        </select>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div id="selectedattributes" className="mx-4">
                              {selectedAttributes.length > 0 && (
                                <Card id="selectedAtt" className="w-full">
                                  <div className="d-flex align-items-center p-4">
                                    <label className="fw-bold me-4">
                                      Selected Attributes:
                                    </label>
                                    <div className="position-relative">
                                      <div className="tooltip-text d-inline">
                                        Enter values for selected attributes,
                                        press enter to select.
                                      </div>
                                      <AiFillInfoCircle className="fs-3 me-1 d-inline ms-2" />
                                    </div>
                                  </div>
                                  {selectedAttributes.map((att) => (
                                    <div className="p-1 mx-2" key={att._id}>
                                      <div className="d-flex justify-content-between bg-light rounded mb-2 p-2">
                                        <div className="d-flex align-items-center">
                                          <span className="fw-bold me-lg-5">
                                            {att.name}:
                                          </span>
                                          <input
                                            placeholder="Enter attribute values"
                                            className="form-control form-control-sm"
                                            name={att._id}
                                            onKeyDown={(e) =>
                                              handleAtttributeValueSelection(
                                                e,
                                                att
                                              )
                                            }
                                          />
                                        </div>
                                        <div className="d-flex gap-2">
                                          {attributeValues[att.name]?.map(
                                            (value, index) => (
                                              <div
                                                key={index}
                                                className="d-flex gap-2 align-items-center bg-light rounded-full"
                                                onClick={() =>
                                                  removeAttributeValue(
                                                    att.name,
                                                    index
                                                  )
                                                }
                                              >
                                                {Array.isArray(value) ? (
                                                  value.map(
                                                    (item, subIndex) => (
                                                      <div
                                                        key={subIndex}
                                                        className="d-flex gap-2 align-items-center bg-light rounded-full"
                                                      >
                                                        {typeof item ===
                                                        "string" ? (
                                                          <React.Fragment
                                                            key={subIndex}
                                                          >
                                                            {item}
                                                            <button
                                                              className="btn btn-xs btn-circle btn-error"
                                                              onClick={() =>
                                                                removeAttributeValue(
                                                                  att.name,
                                                                  item
                                                                )
                                                              }
                                                            >
                                                              <GrFormClose className="text-xl text-base-100" />
                                                            </button>
                                                          </React.Fragment>
                                                        ) : (
                                                          item
                                                        )}
                                                      </div>
                                                    )
                                                  )
                                                ) : (
                                                  <React.Fragment>
                                                    {typeof value ===
                                                    "string" ? (
                                                      <React.Fragment>
                                                        {value}
                                                        <button className="btn btn-xs btn-circle btn-error">
                                                          <GrFormClose className="text-xl text-base-100" />
                                                        </button>
                                                      </React.Fragment>
                                                    ) : (
                                                      value
                                                    )}
                                                  </React.Fragment>
                                                )}
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </Card>
                              )}
                              <center>
                                <button
                                  className="btn border mt-3"
                                  onClick={() => {
                                    if (!categoryId) {
                                      swalError(
                                        "Select category",
                                        "Select Category First",
                                        () => setShowModal(false)
                                      );
                                      return;
                                    }
                                    if (selectedAttributes.length < 1) {
                                      setShowData(true);
                                      return;
                                    } else {
                                      // generateValueCombinations();
                                      dispatch(
                                        setProduct({
                                          attributes: selectedAttributes,
                                        })
                                      );
                                      handleSubmitUpdate();
                                      setAttSelected(true);
                                      success(
                                        "Varients Updated",
                                        "Varient Updated Successfully!"
                                      );
                                    }
                                  }}
                                >
                                  Update Varients
                                </button>
                              </center>
                            </div>
                          </div>
                          {/* // ) : (
            //   <> */}
                          {/* Varient Start */}

                          <div className="mt-3" id="varientsDiv">
                            <Card className="relative">
                              <div className="flex flex-col mt-4">
                                <div className="">
                                  <div className="text-center flex justify-content-center items-center flex">
                                    <h5 className="d-inline mx-1">
                                      Variant List
                                    </h5>
                                    <div className="d-inline">
                                      <AiFillInfoCircle />
                                    </div>
                                  </div>
                                  <p>
                                    {combinations.map((x, index) => {
                                      const matchingVariantIndex =
                                        variantData.findIndex((variant) =>
                                          isEqualVariants(variant, x)
                                        );
                                      return (
                                        <div className="row  mx-5 my-3">
                                          {Object.entries(x).map(
                                            ([key, value]) => (
                                              <>
                                                <div className="col col-lg-3 col-md-3 col-6 bg-light">
                                                  <span className="font-semibold ">
                                                    {key}:
                                                  </span>
                                                  <span className="text-primary mx-1">
                                                    {value}
                                                  </span>
                                                </div>
                                              </>
                                            )
                                          )}
                                        </div>
                                      );
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center my-2">
                                <Link
                                  className="btn btn-secondary"
                                  onClick={() => setShowData(true)}
                                  to={`${PATHS.adminEditVariant}/${id}/${pid}`}
                                  // id
                                >
                                  Next
                                </Link>
                              </div>
                            </Card>
                          </div>

                          {/* Varient End */}
                          {/* </>
            )} */}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EditProduct;
