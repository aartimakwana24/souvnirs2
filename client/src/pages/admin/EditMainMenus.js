import Header from "../../components/ui/Header";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";
import API_WRAPPER from "../../api/index.js";
import Card from "../../components/ui/Card/index.js";
import { useState, useEffect } from "react";
import success from "../../utils/index.js";

function EditMainMenus() {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const [mainMenuData, setMainMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [mainMenus, setMainMenus] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const titleExists = location.state?.titleExists;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainMenuData((prevData) => ({ ...prevData, [name]: value }));
    setSelectedTypeData([]);
    setSelectedTypeDataValue("");
  };

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/main-menu/" + id);
    const data = response.data[0];
    if (response.data) {
      setMainMenuData({ title: data.title, type: data.type });
      setSelectedTypeDataValue(data.typeValue);
    }
  };

  useEffect(() => {
    handleApiCalls();
  }, [mainMenuData.type]);

  useEffect(() => {
    getMainMenus();
  }, []);

  const updateMainMenu = async (e) => {
    e.preventDefault();
    let dataToSend = {
      ...mainMenuData,
      link: `${mainMenuData.type}/${selectedTypeDataValue}`,
      typeValue: selectedTypeDataValue,
    };
    try {
      const response = await API_WRAPPER.put(
        `/main-menu/edit/${id}`,
        dataToSend
      );
      success("Success", "Main menu Updated successfully!");
      navigate(PATHS.adminMenus, {
        state: { titleExists },
      });
    } catch (e) {
      console.log("Error while updateMainMenu ", e);
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
            heading="Edit Main Menu"
            subheading="This sections provides ability to add various types of main menu headers in the application."
          />
          <div>
            <div className="my-5">
              <Card>
                <div className="mt-2 p-4">
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
                          value={mainMenuData.title}
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 w-50 form-group mb-4">
                        <label className="form-label">
                          <span className="form-label">Link</span>
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
                          //   defaultValue={mainMenus.link}
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
                          value={mainMenuData.type}
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
                          value={selectedTypeDataValue}
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
                      className="btn btn-danger mt-4"
                      onClick={(e) => updateMainMenu(e)}
                    >
                      Update
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

export default EditMainMenus;
