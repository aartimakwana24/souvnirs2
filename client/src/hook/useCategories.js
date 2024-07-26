import { useEffect, useState } from "react";
import API_WRAPPER from "../api";

const useCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return categoriesList;
};

export default useCategories;
