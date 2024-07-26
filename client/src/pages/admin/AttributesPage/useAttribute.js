import { useEffect, useState } from "react";
import { debouncedShowToast } from "../../../utils";
import API_WRAPPER from "../../../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import success from "../../../utils";

const useAttribute = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [getApiTrigger, setGetApiTrigger] = useState(false);
  const [editedRowObject, setEditedRowObject] = useState({});
  const navigate = useNavigate();

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error("Error occurred in fatch all attributes list", error);
    }
  };
  const handleEdit = (row) => {
    setSelectedRow(row);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
  };
  const handleEditChange = (e) => {
    setEditedRowObject({
      ...editedRowObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await API_WRAPPER.put(
       `/attribute/update-attribute/${selectedRow._id}`,
       editedRowObject
     );
      if (response.status === 200) {
        setGetApiTrigger((prevState) => !prevState);
        success("Attribute Edited ","Attribute Added Succesfully");
      }
    } catch (error) {
      console.error("Error occurred while updating attribute:", error);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/attribute/delete-attribute/${selectedRow._id}`
      );
      if (response?.status === 200) {
        setGetApiTrigger((prevState) => !prevState);
        success("Delete Attribute","Attribute deleted succesfully!")
      }
    } catch (error) {
      console.error("Error occurred while deleting attribute:", error);
    }
  };

  useEffect(() => {
    fetchAllAttributes();
  }, [getApiTrigger]);

  return {
    handleDeleteSubmit,
    handleFormSubmit,
    handleEditChange,
    handleDelete,
    handleEdit,
    attributesList,
    selectedRow,
  };
};

export default useAttribute;
