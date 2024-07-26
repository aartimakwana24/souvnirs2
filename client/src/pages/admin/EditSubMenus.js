import Header from "../../components/ui/Header";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";
import API_WRAPPER from "../../api/index.js";
import Card from "../../components/ui/Card/index.js";
import { useState, useEffect } from "react";
import success from "../../utils/index.js";

function EditSubMenus() {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const [subMenuData, setSubMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [getingSubMenuData, setGetingSubMenuData] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state?.row;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubMenuData((prevData) => ({ ...prevData, [name]: value }));
    setSelectedTypeData([]);
    setSelectedTypeDataValue("");
  };

  useEffect(() => {
    handleApiCalls();
  }, [subMenuData.type]);

  const editSubMenu = async (e) => {
    e.preventDefault();
    let dataToSend = {
      ...subMenuData,
      link: `${subMenuData.type}/${selectedTypeDataValue}`,
      typeValue: selectedTypeDataValue,
    };

    try {
      const response = await API_WRAPPER.put(
        `/sub-menu-edit/${id}`,
        dataToSend
      );
      success("Success", "Sub menu Edited successfully!");
      navigate(PATHS.adminSubMenus, {
        state: { row },
      });
    } catch (e) {
      console.log("Error while createsubMenu ", e);
    }
  };

  const handleApiCalls = async () => {
    if (subMenuData.type === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuData.type === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuData.type === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    }
    //  else if (subMenuData.type === "page") {
    // }
  };

  const getSubMenuById = async () => {
    const response = await API_WRAPPER.get(`/sub-menu-get-by-id/${id}`);
    if (response?.status === 200) {
      const data = response.data;
      setGetingSubMenuData(data);
      setSubMenuData({ title: data.title, type: data.type });
      setSelectedTypeDataValue(data.typeValue);
      setMenuHeaderTitlesList(data);
    }
  };

  useEffect(() => {
    getSubMenuById();
  }, []);

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Edit sub Menu"
            subheading="This sections provides ability to add various types of sub menu headers in the application."
          />
          <div>
            <div className="my-5">
              <Card>
                <div className="mt-2 p-4">
                  <form>
                    <div className="row">
                      <div className="col col-lg-6 col-md-12 col-12 form-group mb-4">
                        <label htmlFor="subMenuTitle" className="form-label">
                          <span className="form-label">sub Menu Heading</span>
                        </label>
                        <input
                          onChange={(e) => handleInputChange(e)}
                          className="form-control form-control-primary"
                          type="text"
                          name="title"
                          id="subMenuTitle"
                          value={subMenuData.title}
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 w-50 form-group mb-4">
                        <label className="form-label">
                          <span className="form-label">Link</span>
                        </label>
                        <input
                          disabled
                          className="form-control form-control-primary join-item"
                          placeholder={`${subMenuData.type}`}
                          value={
                            subMenuData.type || selectedTypeDataValue
                              ? `${subMenuData.type}/${selectedTypeDataValue}`
                              : ""
                          }
                        />
                      </div>
                      <div className="col col-lg-6 col-md-12 col-12 form-group">
                        <label htmlFor="subMenuTitle" className="form-label">
                          <span className="form-label">sub Menu Type</span>
                        </label>
                        <select
                          onChange={(e) => handleInputChange(e)}
                          className="form-select form-select-primary"
                          name="type"
                          id="subMenuType"
                          value={subMenuData.type}
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
                                  subMenuData.type === "collection"
                                    ? selectedType.title
                                    : subMenuData.type === "category"
                                    ? selectedType.name
                                    : subMenuData.type === "productInfo"
                                    ? selectedType.product.name
                                    : ""
                                }
                              >
                                {subMenuData.type === "collection"
                                  ? selectedType.title
                                  : subMenuData.type === "category"
                                  ? selectedType.name
                                  : subMenuData.type === "productInfo"
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
                      onClick={(e) => editSubMenu(e)}
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

export default EditSubMenus;
