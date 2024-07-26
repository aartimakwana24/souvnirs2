import { useState } from "react";
import API_WRAPPER from "../../../api";
import { PATHS } from "../../../Routes/paths";
import { useNavigate } from "react-router-dom";
import success from "../../../utils";

const useAddAttributes = () => {
  const navigate = useNavigate();
  const [attributeName, setAttributeName] = useState("");
  const handleAddAttribute = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.post("/attribute/add-attribute", {
        name: attributeName,
      });
        success(
          "Added Attribute ",
          "Attribute added succesfully!",
        );
        navigate(PATHS.adminAttribute)
    } catch (error) {
      console.error("Error in  add attribute hook", error);
    }
  };
  return {
    attributeName,
    setAttributeName,
    handleAddAttribute,
  };
};

export default useAddAttributes;
