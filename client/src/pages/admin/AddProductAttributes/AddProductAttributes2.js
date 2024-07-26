import { PATHS } from "../../../Routes/paths";
import { useState, useEffect } from "react";
import Header from "../../../components/ui/Header";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { AiFillInfoCircle } from "react-icons/ai";
import { debouncedShowToast } from "../../../utils/index";
import SearchableDropdown from "../../../components/ui/SearchableDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import useCategories from "../../../hook/useCategories";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import Card from "../../../components/ui/Card/index.js";

function AddProductAttributes() {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);

  const [showData, setShowData] = useState(false);
  const [commission, setcommission] = useState(null);
  const p = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useCategories();

  const handleSelectedValue = (category) => {
    setcommission({
      commissionType: category.commissionType,
      commissionTypeValue: category.commissionTypeValue,
    });
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    setSelectedAttributes([
      { _id: 1, name: "Attribute 1" },
      { _id: 2, name: "Attribute 2" },
      { _id: 3, name: "Attribute 3" },
    ]);
    setAttributeValues([
      { id: 1, values: ["Value 1", "Value 2", "Value 3"] },
      { id: 2, values: ["Value A", "Value B", "Value C"] },
      { id: 3, values: ["Value X", "Value Y", "Value Z"] },
    ]);
  };
  const scrollToSection = () => {
    const targetElement = document.getElementById("selectedattributes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // You can use 'auto' for instant scrolling
    }
  };

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading={
                attSelected ? "Add Product Variants" : "Add Product Attributes"
              }
              subheading="Add attributes, categories and their configuration on this page"
              image={AttributeBannerImage}
            />
            {!attSelected && !showData ? (
              <div className="mt-4">
                <div className="row p-4">
                  <div className="col-lg-6 col-md-12 col-12 p-4">
                    <div className="bg-light rounded">
                      <SearchableDropdown
                        handleSelect={handleSelectedValue}
                        items={categories}
                        categoryName={categoryName}
                      />
                    </div>
                  </div>
                  {/* {categoryId && ( */}
                  <div className="col-lg-6 col-md-12 col-12">
                    <Card>
                      <div className="p-4">
                        <div className="d-flex justify-content-between">
                          <div className="col col-lg-12 "></div>
                          <p className="fw-bold">
                            Select Attributes: (Optional)
                          </p>
                          <div className="d-flex align-items-center">
                            <div className="position-relative">
                              <AiFillInfoCircle className="fs-3 me-1" />
                              <div className="tooltip-text">
                                Attributes are optional fields. Add only if
                                product has variants.
                              </div>
                            </div>
                            <div className="dropdown">
                              <button className="btn btn-circle" type="button">
                                <BsCaretDown className="text-primary fs-3 " />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <select
                                    className="form-select"
                                    name=""
                                    multiple={true}
                                  ></select>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Tooltip
                        effect="solid"
                        id="my-tooltip"
                        style={{ zIndex: 9999, background: "#4680ff36" }}
                      />
                    </Card>
                  </div>
                  {/* )} */}
                </div>

                <div id="selectedattributes" className="mx-4">
                  {selectedAttributes.length > 0 && (
                    <Card id="selectedAtt" className="w-full">
                      <div className="d-flex align-items-center p-4">
                        <label className="fw-bold me-4">
                          Selected Attributesss:
                        </label>
                        <div className="position-relative">
                          <AiFillInfoCircle className="fs-3 me-1" />
                          <div className="tooltip-text">
                            Enter values for selected attributes, press enter to
                            select.
                          </div>
                        </div>
                      </div>
                      {selectedAttributes.map((att) => (
                        <div className="p-1 mx-2" key={att._id}>
                          <div className="d-flex justify-content-between bg-light rounded-xl mb-2 p-3">
                            <div className="d-flex align-items-center">
                              {/* <span className="fw-bold me-2">{att.name}:</span> */}
                              <span className="fw-bold me-2">Watch:</span>
                              <input
                                placeholder="Enter attribute values"
                                className="form-control form-control-sm"
                                name={att._id}
                                // onKeyDown={(e) =>
                                //   handleAtttributeValueSelection(e, att)
                                // }
                              />
                            </div>
                            <div className="d-flex gap-2">
                              {attributeValues.map((elem) => {
                                if (elem.id === att._id) {
                                  return elem?.values?.map((a, index) => (
                                    <div
                                      className="d-flex gap-2 align-items-center bg-light p-2 rounded-full"
                                      //   onClick={(e) =>
                                      //     removeAttributeValue(att._id, index)
                                      //   }
                                      key={index}
                                    >
                                      {a}
                                      <button className="btn btn-sm btn-danger">
                                        <GrFormClose className="text-light fs-5" />
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
                  <button
                    className="btn btn-primary float-end mt-4 me-4"
                    onClick={() => {
                      if (!categoryId) {
                        debouncedShowToast("Select Category First");
                        return;
                      }
                      if (selectedAttributes.length < 1) {
                        setShowData(true);
                        return;
                      } else {
                        // generateValueCombinations();
                        dispatch();
                        //   setProduct({ attributes: selectedAttributes })
                        setAttSelected(true);
                      }
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <div className="my-5">
                <Card className="position-relative ">
                  <div className="flex flex-col mt-4">
                    <div className="overflow-auto">
                      <div className="text-center">
                        <label className="fs-2">Variant Data</label>
                        <div className="position-relative d-inline">
                          <AiFillInfoCircle className="fs-3 pb-2 d-inline" />
                          <div className="tooltip-text">
                            Enter price, quantity, and images only for variants
                            you want to create.
                          </div>
                        </div>
                      </div>
                      <table className="table table-striped table-bordered mt-3">
                        <thead>
                          <tr>
                            <th>Variant Name</th>
                            <th>MRP</th>
                            <th>Quantity</th>
                            <th>Images</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Variant 1</td>
                            <td>
                              <input
                                placeholder="Enter price"
                                type="number"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                placeholder="Enter quantity"
                                type="number"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="form-control form-control-sm"
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>Variant 2</td>
                            <td>
                              <input
                                placeholder="Enter price"
                                type="number"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                placeholder="Enter quantity"
                                type="number"
                                className="form-control form-control-sm"
                              />
                            </td>
                            <td>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="form-control form-control-sm"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary float-end mt-4 w-100"
                    onClick={() => setShowData(true)}
                  >
                    Next
                  </button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductAttributes;
