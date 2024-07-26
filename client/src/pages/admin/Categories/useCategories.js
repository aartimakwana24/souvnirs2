import { useEffect, useState  } from "react";
import { debouncedShowToast } from "../../../utils";
import API_WRAPPER from "../../../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import success from "../../../utils";


function useCategories(){
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

   const getAllCategories = async () => {
     try {
       const response = await API_WRAPPER.get("/category/get-all-categories");
       console.log("Response----gggfg ",response);
       if (response.status === 200) {
         console.log("cat. data ", response);
         setCategoriesList(response?.data);
       }
     } catch (error) {
       console.error("Error occurred while fetching all categories", {
         error,
       });
     }
   };

     const handleEdit = (row) => {
      setSelectedRow(row);
       navigate(`${PATHS.EditCategory}/${row._id}`);
     };

     const handleEditChange = (e) => {
       setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
       console.log("EDITED ROW: ", editedRow);
     };

    const handleDelete = (row) => {
      setSelectedRow(row);
    };

     const submitDeleteCategory = async () => {
       const response = await API_WRAPPER.delete(
         `/category/delete-category/${selectedRow._id}`
       );
       if (response.status === 200) {
         console.log("CATEGORY DELETED", response?.data);
         setApiTrigger((prevState) => !prevState);
         success("Delete Category ","Category Deleted Succesfully!");
       }
     };

   useEffect(() => {
     getAllCategories();
   }, [apiTrigger]);


  return {
    getAllCategories,
    categoriesList,
    handleEdit,
    handleEditChange,
    submitDeleteCategory,
    handleDelete,
  };
}
export default useCategories;
