import Header from "../../components/ui/Header";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";
import API_WRAPPER from "../../api/index.js";
import Card from "../../components/ui/Card/index.js";
import { useState, useEffect } from "react";
import success from "../../utils/index.js";

function AddMainMenus() {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [mainMenuData, setMainMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const titleExists = location.state?.titleExists;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainMenuData((prevData) => ({ ...prevData, [name]: value }));
    setSelectedTypeData([]);
    setSelectedTypeDataValue("");
  };

  useEffect(() => {
    handleApiCalls();
  }, [mainMenuData.type]);

  const createMainMenu = async (e) => {
    e.preventDefault();
    let dataToSend = {
      ...mainMenuData,
      link: `${mainMenuData.type}/${selectedTypeDataValue}`,
      menuId: titleExists._id,
      typeValue: selectedTypeDataValue,
    };

    try {
      const response = await API_WRAPPER.post("/main-menu/create", dataToSend);
      success("Success","Main menu created successfully!");
      navigate(PATHS.adminMenus, {
        state: { titleExists },
      });
    } catch (e) {
      console.log("Error while createMainMenu ",e);
    }
  };

  const handleApiCalls = async () => {
    if (mainMenuData.type === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "page") {
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
            heading="Add Main Menu"
            subheading="This sections provides ability to add various types of main menu headers in the application."
          />
          <div>
            <div className="my-5">
              <Card>
                <div className="mt-2 p-4">
                  {/* <form>
                    <div className="form-group my-2">
                      <label htmlFor="menuTitle" className="form-label">
                        <span className="form-label">Menu Title</span>
                      </label>
                      <select
                        className="form-select form-select-primary"
                        name="menuId"
                        id="menuTitle"
                      >
                        <option selected disabled>
                          Select Menu
                        </option>
                        <option>hjhjhhj</option>
                      </select>
                    </div>
                    <div className="form-group form-check form-switch my-3">
                      <label htmlFor="isSubMenu" className="form-label">
                        <span className="form-label">Create Sub Menu</span>
                      </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDisabled"
                      />
                    </div>
                  </form> */}
                  <form>
                    <div className="row">
                      <div className="col col-lg-6 col-md-12 col-12 form-group mb-4">
                        <label htmlFor="subMenuTitle" className="form-label">
                          <span className="form-label">Main Menu Heading</span>
                        </label>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-primary"
                          type="text"
                          name="title"
                          id="subMenuTitle"
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 w-50 form-group mb-4">
                        <label className="form-label">
                          <span className="form-label">Link</span>
                          {/* <span className="form-text cursor-pointer badge text-primary">
                            Copy
                          </span> */}
                        </label>
                        <input
                          disabled
                          className="form-control form-control-primary join-item"
                          placeholder={`${mainMenuData.type}`}
                          value={
                            mainMenuData.type || selectedTypeDataValue
                              ? `${mainMenuData.type}/${selectedTypeDataValue}`
                              : ""
                          }
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 form-group">
                        <label htmlFor="subMenuTitle" className="form-label">
                          <span className="form-label">Main Menu Type</span>
                        </label>
                        <select
                          onChange={(e) => handleInputChange(e)}
                          className="form-select form-select-primary"
                          name="type"
                          id="subMenuType"
                        >
                          <option selected disabled value="">
                            Select Menu Type
                          </option>
                          <option value="collection">Collection</option>
                          <option value="category">Category</option>
                          <option value="productInfo">Product</option>
                          {/* <option value="page">Page</option> */}
                        </select>
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 form-group mt-2">
                        <label className="form-label" htmlFor="">
                          <span className="form-label">
                            Sub Menu Type Value
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
                                  mainMenuData.type === "collection"
                                    ? selectedType.title
                                    : mainMenuData.type === "category"
                                    ? selectedType.name
                                    : mainMenuData.type === "productInfo"
                                    ? selectedType.product.name
                                    : ""
                                }
                              >
                                {mainMenuData.type === "collection"
                                  ? selectedType.title
                                  : mainMenuData.type === "category"
                                  ? selectedType.name
                                  : mainMenuData.type === "productInfo"
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
                      onClick={(e) => createMainMenu(e)}
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

export default AddMainMenus;
