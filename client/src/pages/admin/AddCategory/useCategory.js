import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import success from "../../../utils";

function useCategory() {
  const [attributesList, setAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [parentCategories, setParentCategories] = useState([]);

  const navigate = useNavigate();

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error({
        message:
          "Error occurred while fetching all attributes getAllAttributes",
        error,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddAttribute = (attribute) => {
    setSelectedAttributes((prevState) => {
      if (prevState.includes(attribute)) {
        return prevState;
      } else {
        return [...prevState, attribute];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.post("/category/add-category", {
        ...formData,
        attributes: selectedAttributes.map((item) => item._id),
      });
      if (response.status === 201) {
        success("Category Added", "Category added successfully!");
        navigate("/admin/categories");
      }
    } catch (error) {
      console.log("Error in handleSubmit in useCategories ", error);
    }
  };

  const handleAttributeDelete = (attribute) => {
    const updatedAttributes = selectedAttributes.filter(
      (selectedAttribute) => selectedAttribute._id !== attribute._id
    );
    setSelectedAttributes(updatedAttributes);
  };

  const getParentCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/parent/");
      setParentCategories(response.data);
    } catch (error) {
      console.log("error in getParentCategories useCategory.js",error);
    }
  };

  useEffect(() => {
    const filteredResults = attributesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [attributesList, searchQuery]);

  useEffect(() => {
    getAllAttributes();
    getParentCategories();
  }, []);

  return {
    handleInputChange,
    handleSubmit,
    searchResults,
    searchQuery,
    setSearchQuery,
    handleAddAttribute,
    selectedAttributes,
    parentCategories,
    handleAttributeDelete,
  };
}

export default useCategory;
