import { PATHS } from "../../../Routes/paths";
import { useState, useEffect } from "react";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { AiFillInfoCircle } from "react-icons/ai";
import success, {swalError } from "../../../utils/index";
import SearchableDropdown from "../../../components/ui/SearchableDropdown/index.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useCategories from "../../../hook/useCategories";
import Card from "../../../components/ui/Card/index.js";
import API_WRAPPER from "../../../api/index.js";
import { setProduct } from "../../../features/appConfig/addProductSlice.js";

function AddProductAttributes({ formData, setFormData }) {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [showData, setShowData] = useState(false);
  const [commission, setcommission] = useState(null);
  const [attributesList, setAttributesList] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [showModal,setShowModal] = useState(false);

  const p = useSelector((state) => state.product);
  console.log("p ",p);
  const categories = useCategories();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectedValue = (category) => {
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    setSelectedAttributes([]);
    dispatch(
      setProduct({
        ...formData,
        categoryId: category.id,
      })
    );
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
      swalError( "error",error.message,()=>{
        setShowModal(false);
      });
    }
  };

  const generateValueCombinations = () => {
    const combination = [];
     if (
       !attributeValues ||
       !Array.isArray(attributeValues) ||
       attributeValues.length === 0
     ) {
       swalError("Enter Value", "No attribute values provided", () =>
         setShowModal(false)
       );
       return false;
     }

    function generateCombinations(
      attributes,
      index = 0,
      current = {},
      result = []
    ) {
      if (index === attributes.length) {
        result.push(current);
        return;
      }

      const attribute = attributes[index];
      for (const value of attribute.values) {
        const newCurrent = {
          ...current,
          [attribute.name]: value,
        };
        generateCombinations(attributes, index + 1, newCurrent, result);
      }
      return result;
    }

    combination.push(...generateCombinations(attributeValues));
    setCombinations(combination);
  };

  const isEqualVariants = (variant1, variant2) => {
    return JSON.stringify(variant1) === JSON.stringify(variant2);
  };

  const handleAtttributeValueSelection = (e, attribute) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const existingIndex = attributeValues.findIndex(
        (item) => item.id === attribute._id
      );

      const newEntry = {
        name: attribute.name,
        id: attribute._id,
        values: [e.target.value],
      };

      if (existingIndex !== -1) {
        const updatedAttributeValues = [...attributeValues];
        updatedAttributeValues[existingIndex].values.push(e.target.value);
        setAttributeValues(updatedAttributeValues);
      } else {
        setAttributeValues((prevValues) => [...prevValues, newEntry]);
      }
      e.target.value = "";
    }
  };

  const scrollToSection = () => {
    const targetElement = document.getElementById("selectedattributes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const convertAttributesList = (arr) => {
    return arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };
  const attributeSelection = (e) => {
    const selectedAttribute = attributesList.find(
      (att) => att._id === e.target.value
    );

    if (!selectedAttributes.some((att) => att._id === selectedAttribute._id)) {
      setSelectedAttributes((prevSelectedAttributes) => [
        ...prevSelectedAttributes,
        selectedAttribute,
      ]);
      scrollToSection();
    }
  };

  const removeAttributeValue = (attributeId, valueIndex) => {
    setAttributeValues((prevValues) => {
      const updatedAttributeValues = prevValues.map((elem) => {
        if (elem.id === attributeId) {
          const newValues = elem.values.filter(
            (_, index) => index !== valueIndex
          );
          return {
            ...elem,
            values: newValues,
          };
        }
        return elem;
      });
      return updatedAttributeValues;
    });
  };

  useEffect(() => {
    fetchAllAttributes();
  }, [categoryId]);

  const handleDataSubmit = async () => {
    if (!p.name || !p.vendorId || !p.categoryId || !p.slug) {
      swalError("Validation Error", "Fill all required fields", () =>
        setShowModal(false)
      );
      return;
    }

    try {
      const prodResponse = await API_WRAPPER.post("/products/add-product", p);
      if(prodResponse.status == 200){
       return swalError("Warning ",prodResponse.data.msg,()=>{
          setShowModal(false);
        })
      }
      const productId = prodResponse.data._id;
      const attValResponse = await API_WRAPPER.post("/attribute/add-attributeValue",{attributeValues,productId});
       navigate(`${PATHS.adminAddVariant}?pid=${productId}`);

      combinations.map(async(combination)=>{
        const res = await API_WRAPPER.post("/varients/add-varients2", {
          combination,
          productId,
        });
      })

    } catch (error) {
      console.log("Error in catch  ", error);
    }
  };
  useEffect(() => {
    if (combinations.length > 0) {
      handleDataSubmit();
    }
  }, [combinations]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* {!attSelected && !showData ? ( */}
            <div className="">
              <div className="row p-2">
                <div className="col-lg-6 col-md-12 col-12 ">
                  {/* <div className="bg-light rounded"> */}
                  <SearchableDropdown
                    handleSelect={handleSelectedValue}
                    items={categories}
                    categoryName={categoryName}
                  />
                  {/* </div> */}
                </div>
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
                            {convertAttributesList(attributesList).map(
                              (item) => (
                                <option
                                  className="cursor-pointer bg-light border-1 shadow-lg rounded my-3 py-2 me-4 px-lg-2 w-100"
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </option>
                              )
                            )}
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
                          Enter values for selected attributes, press enter to
                          select.
                        </div>
                        <AiFillInfoCircle className="fs-3 me-1 d-inline ms-2" />
                      </div>
                    </div>
                    {selectedAttributes.map((att) => (
                      <div className="p-1 mx-2">
                        <div className="d-flex justify-content-between bg-light rounded mb-2 p-2">
                          <div className="d-flex align-items-center">
                            <span className="fw-bold me-lg-5">{att.name}:</span>
                            <input
                              placeholder="Enter attribute values"
                              className="form-control form-control-sm"
                              name={att._id}
                              onKeyDown={(e) =>
                                handleAtttributeValueSelection(e, att)
                              }
                            />
                          </div>

                          <div className="d-flex gap-2">
                            {attributeValues.map((elem) => {
                              if (elem.id === att._id) {
                                return elem?.values?.map((a, index) => (
                                  <div
                                    className="d-flex gap-2 align-items-center bg-light rounded-full"
                                    onClick={(e) =>
                                      removeAttributeValue(att._id, index)
                                    }
                                    key={index}
                                  >
                                    {a}
                                    <button className="btn btn-xs btn-circle btn-error">
                                      <GrFormClose className="text-xl text-base-100" />
                                    </button>
                                  </div>
                                ));
                              }
                              return null;
                            })}
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
                        let x = generateValueCombinations();
                        dispatch(
                          setProduct({ attributes: selectedAttributes })
                        );
                        setAttSelected(true);

                        if (x) {
                          success(
                            "Varients Created",
                            "Varient Created Successfully!"
                          );
                        }
                      }
                    }}
                  >
                    create Varients
                  </button>
                </center>
              </div>
            </div>
            {combinations.length > 0 ? (
              <>
                <div className="mt-3" id="varientsDiv">
                  <Card className="relative">
                    <div className="flex flex-col mt-4">
                      <div className="">
                        <div className="text-center flex justify-content-center items-center flex">
                          <h5 className="d-inline mx-1">Variant List</h5>
                          <div className="d-inline">
                            <AiFillInfoCircle />
                          </div>
                        </div>
                        <p>
                          {combinations.map((x, index) => {
                            const matchingVariantIndex = variantData.findIndex(
                              (variant) => isEqualVariants(variant, x)
                            );
                            return (
                              <>
                                <div className="row  mx-5 my-3">
                                  {Object.entries(x).map(([key, value]) => (
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
                                  ))}
                                </div>
                              </>
                            );
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowData(true)}
                      >
                        Next
                      </button>
                    </div>
                  </Card>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Varient End */}
            {/* </>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductAttributes;
