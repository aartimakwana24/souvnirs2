import Header from "../components/ui/Header/index.js";
import AttributeBannerImage from "../assets/images/attributesImage.png";
import API_WRAPPER from "../api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../utils";
import { PATHS } from "../Routes/paths";
import success from "../utils";

function EditCategory() {
  const [attributesList, setAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [parentCategories, setParentCategories] = useState([]);
  const [parentCategoriesName, setParentCategoriesName] = useState();


  const navigate = useNavigate();
  const params = useParams();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error({
        message: "Error occurred while fetching all attributes",
        error,
      });
    }
  };

  const getParentCategories = async () => {
    // const response = await API_WRAPPER.get("/category/parent/");
   try {
     const response = await API_WRAPPER.get(`/category/parent/${params.id}`);
     setParentCategories(response.data.allParentCatData);
     setParentCategoriesName(response.data.parentData[0].name);
     
   } catch (error) {
    console.log("Error in Edit Categories getParentCategories ",error);
   }
  };

  const getCategoryData = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/category/get-category/${params.id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error({
        message: "Error occurred while fetching category data",
        error,
      });
    }
  };

  function setInitialAttributes() {
    const initialAttributes = attributesList.filter((attribute) =>
      formData?.attributes?.includes(attribute._id)
    );
    setSelectedAttributes(initialAttributes);
  }

  const handleAddAttribute = (attribute) => {
    setSelectedAttributes((prevState) => {
      if (prevState.some((selected) => selected._id === attribute._id)) {
        return prevState;
      } else {
        return [...prevState, attribute];
      }
    });
  };
  useEffect(() => {
    const filteredResults = attributesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [attributesList, searchQuery]);

  useEffect(() => {
    getAllAttributes();
    getCategoryData();
    getParentCategories();
  }, []);

  useEffect(() => {
    setInitialAttributes();
  }, [attributesList, formData.attributes]);

  const editCategory = async (e) => {
    e.preventDefault();
    try {
      let data = {
        ...formData,
        attributes: selectedAttributes.map((attribute) => attribute._id),
      }
      const response = await API_WRAPPER.put(
        `/category/update-category/${params.id}`,data
      );
      navigate(PATHS.adminCategories);
      success("Edit Category","Category Edited Sccesfully!");
    } catch (error) {
      //   debouncedShowToast("Something went wrong", "error");
      alert("error ", error);
    }
  };

   const handleAttributeDelete = (attribute) => {
     setSelectedAttributes((prevAttributes) =>
       prevAttributes.filter(
         (selectedAttribute) => selectedAttribute._id !== attribute._id
       )
     );
   };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Edit category"
            subheading="This is admin dashboard which Edit Categories here provides all the details in a very concise and user-friendly way."
            image={AttributeBannerImage}
          />

          <div>
            <h1 className="text-2xl mt-8">Edit Category</h1>
            <form className="row g-4 mt-4 bg-light p-3 rounded">
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="name" className="form-label">
                  Category Name
                </label>
                <input
                  placeholder="Category Name"
                  className="form-control"
                  onChange={handleInputChange}
                  defaultValue={formData?.name}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="description" className="form-label">
                  Category Description
                </label>
                <input
                  placeholder="Category Description"
                  className="form-control"
                  onChange={handleInputChange}
                  defaultValue={formData?.desc}
                  type="text"
                  name="Description"
                  id="description"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="hsnCode" className="form-label">
                  HSN Code
                </label>
                <input
                  placeholder="HSN Code"
                  className="form-control"
                  type="text"
                  name="hsn_code"
                  onChange={handleInputChange}
                  defaultValue={formData.hsn_code}
                  id="hsnCode"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="type" className="form-label">
                  Type
                </label>
                <input
                  placeholder="Category Type"
                  className="form-control"
                  onChange={handleInputChange}
                  defaultValue={formData.type}
                  type="text"
                  name="type"
                  id="type"
                />
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <input
                  placeholder="Search Attributes"
                  className="form-control mb-2"
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  defaultValue={searchQuery}
                />
                <div className="overflow-auto mt-4">
                  {searchResults.map((item) => (
                    <p
                      onClick={() => handleAddAttribute(item)}
                      className={`w-100 btn btn-primary mb-4 cursor-pointer rounded text-white font-semibold shadow-sm `}
                      key={nanoid()}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="col col-lg-6 col-md-12 col-12">
                <h1 className="text-2xl">Selected Attributes</h1>
                <div className="mt-2">
                  {selectedAttributes.map((selectedAttribute) => {
                    return (
                      <p
                        className={`bg-white d-flex justify-content-between w-full mb-4 rounded`}
                        key={nanoid()}
                      >
                        <span className="">{selectedAttribute.name}</span>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleAttributeDelete(selectedAttribute)
                          }
                          type="button"
                        >
                          <AiOutlineDelete size={20} />
                        </button>
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <label for="parentCategory" className="form-label">
                  Parent Category {parentCategoriesName}
                </label>
                <select
                  className="form-select"
                  onChange={(e) => handleInputChange(e)}
                  name="parentId"
                >
                  <option disabled selected>
                  {parentCategoriesName}
                  </option>
                  {parentCategories.map((parent) => (
                    <option key={parent._id} value={parent._id}>
                      {parent.name}
                    </option>
                  ))}
                </select>
                <button
                  className="btn btn-primary w-25 mt-4"
                  onClick={editCategory}
                >
                 Update Category
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditCategory;
