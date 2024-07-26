import Header from "../../components/ui/Header";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";
import API_WRAPPER from "../../api/index.js";
import Card from "../../components/ui/Card/index.js";
import { useState, useEffect } from "react";
import success from "../../utils/index.js";

function AddChildMenus() {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [childMenuToggle, setchildMenuToggle] = useState(false);
  const [childMenuData, setchildMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state?.row;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setchildMenuData((prevData) => ({ ...prevData, [name]: value }));
    setSelectedTypeData([]); 
    setSelectedTypeDataValue("");
  };

  useEffect(() => {
    handleApiCalls();
  }, [childMenuData.type]);

  const createChildMenu = async (e) => {
    e.preventDefault();
    let dataToSend = {
      ...childMenuData,
      link: `${childMenuData.type}/${selectedTypeDataValue}`,
      subMenuId: row.id,
      typeValue: selectedTypeDataValue,
    };

    try {
      const response = await API_WRAPPER.post("/child-menu/create", dataToSend);
      success("Success", "child menu created successfully!");
        navigate(PATHS.adminChildMenus, {
          state: { row },
        });
    } catch (e) {
      console.log("Error while createchildMenu ", e);
    }
  };

  const handleApiCalls = async () => {
    if (childMenuData.type === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuData.type === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuData.type === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuData.type === "page") {
      // TODO: Handle page API call
    }
  };

  const getAllMenuHeaderTitles = async () => {
    const response = await API_WRAPPER.get("/menu");
    if (response?.status === 200) {
      setMenuHeaderTitlesList(response?.data);
    }
  };

  useEffect(() => {
    getAllMenuHeaderTitles();
  }, []);

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Child Menu"
            subheading="This sections provides ability to add various types of child menu headers in the application."
          />
          <div>
            <div className="my-5">
              <Card>
                <div className="mt-2 p-4">
                  <form>
                    <div className="row">
                      <div className="col col-lg-6 col-md-12 col-12 form-group mb-4">
                        <label htmlFor="childMenuTitle" className="form-label">
                          <span className="form-label">Child Menu Heading</span>
                        </label>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-primary"
                          type="text"
                          name="title"
                          id="childMenuTitle"
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 w-50 form-group mb-4">
                        <label className="form-label">
                          <span className="form-label">Link</span>
                        </label>
                        <input
                          disabled
                          className="form-control form-control-primary join-item"
                          placeholder={`${childMenuData.type}`}
                          value={
                            childMenuData.type || selectedTypeDataValue
                              ? `${childMenuData.type}/${selectedTypeDataValue}`
                              : ""
                          }
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 form-group">
                        <label htmlFor="childMenuTitle" className="form-label">
                          <span className="form-label">child Menu Type</span>
                        </label>
                        <select
                          onChange={(e) => handleInputChange(e)}
                          className="form-select form-select-primary"
                          name="type"
                          id="childMenuType"
                        >
                          <option selected disabled value="">
                            Select Menu Type
                          </option>
                          <option value="collection">Collection</option>
                          <option value="category">Category</option>
                          <option value="productInfo">Product</option>
                        </select>
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 form-group mt-2">
                        <label className="form-label" htmlFor="">
                          <span className="form-label">
                            child Menu Type Value
                          </span>
                        </label>
                        <select
                          onChange={(e) =>
                            setSelectedTypeDataValue(e.target.value)
                          }
                          className="form-select form-select-primary"
                          name=""
                          id=""
                        >
                          <option selected disabled>
                            Select Menu Type
                          </option>
                          {selectedTypeData.map((selectedType) => (
                            <>
                              <option
                                key={selectedType.id}
                                value={
                                  childMenuData.type === "collection"
                                    ? selectedType.title
                                    : childMenuData.type === "category"
                                    ? selectedType.name
                                    : childMenuData.type === "productInfo"
                                    ? selectedType.product.name
                                    : ""
                                }
                              >
                                {childMenuData.type === "collection"
                                  ? selectedType.title
                                  : childMenuData.type === "category"
                                  ? selectedType.name
                                  : childMenuData.type === "productInfo"
                                  ? selectedType.product.name
                                  : ""}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary mt-4"
                      onClick={(e) => createChildMenu(e)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddChildMenus;
