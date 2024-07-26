// import { useEffect, useMemo, useState } from "react";
// import API_WRAPPER from "../../../api";
// import success, { swalError } from "../../../utils";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "../../../Routes/paths";

// function useProductManagement() {
//   const navigate = useNavigate();
//   const [productsList, setProductsList] = useState([]);
//   const [selectedRow, setSelectedRow] = useState({});
//   const [editedRow, setEditedRow] = useState({});
//   const [apiTrigger, setApiTrigger] = useState(false);
//   const [bulkData, setBulkData] = useState();
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [disapprovalComment, setDisapprovalComment] = useState("");
//   const [error, seterror] = useState("");
//   const fetchProductsList = async () => {
//     try {
//       const response2 = await API_WRAPPER.get("/products/get-all-products2");
//       if (response2.status === 200) {
//         setProductsList(response2?.data);
//       }
//     } catch (error) {
//       console.error({ error, messge: error.message });
//     }
//   };

//   const data = useMemo(() => {
//     return productsList.map((item) => ({
//       id: item._id,
//       pid: item.pid,
//       name: item.product.name,
//       stockStatus: item.product.stockStatus,
//       approval: item.product.approval,
//       status: item.Status,
//       variants: item.varients,
//     }));
//   }, [productsList]);

//   useEffect(() => {
//     fetchProductsList();
//   }, [apiTrigger]);

//   const handleDelete = (row) => {
//     setSelectedRow(row);
//   };

//   const handleEdit = (row) => {
//     console.log("ROW ",row);
//     if (row?.result?.id) {
//       navigate(`${PATHS.EditProduct}/${row._id}?variantID=${row?.result._id}`);
//     } else {
//       console.log("inside else ");
//       navigate(`${PATHS.EditProduct}/${row.id}?pid=${row.pid}`);
//     }
//   };

//   const handleEditChange = (e) => {
//     setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
//   };

//   const submitEditedRow = async (updatedVal) => {
//     const response = await API_WRAPPER.put(
//       `/products/edit-product/:${selectedRow._id}`,
//       updatedVal
//     );
//     if (response.status === 200) {
//       setApiTrigger((prevState) => !prevState);
//     } else {
//       console.log("error in submitEditedRow");
//     }
//   };

//   const handleSave = (inputValues) => {
//     submitEditedRow(inputValues);
//   };

//   const deleteSelectedRow = async () => {
//     const response = await API_WRAPPER.delete(
//       `/products/delete-product/${selectedRow.id}`
//     );
//     if (response.status === 200) {
//       setApiTrigger((prevState) => !prevState);
//       success("Product Deleted", "Product Deleted SucessFully!");
//     } else {
//       swalError("Delete Product", "Error while Deleted Product", () =>
//         setShowModal(false)
//       );
//     }
//   };
//   return {
//     deleteSelectedRow,
//     handleSave,
//     handleEditChange,
//     data,
//     setBulkData,
//     selectedRow,
//     setDisapprovalComment,
//     disapprovalComment,
//     loading,
//     handleDelete,
//     handleEdit,
//     seterror,
//     error,
//   };
// }
// export default useProductManagement;


import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import success, { swalError } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

function useProductManagement() {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [bulkData, setBulkData] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [disapprovalComment, setDisapprovalComment] = useState("");
  const [error, seterror] = useState("");

  const fetchProductsList = async () => {
    try {
      const response2 = await API_WRAPPER.get("/products/get-all-products2");
      if (response2.status === 200) {
        setProductsList(response2?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
  };

  const data = useMemo(() => {
    // Create a map to track unique pids
    const uniqueProductsMap = new Map();

    // Iterate through the productsList and add only unique pids to the map
    productsList.forEach((item) => {
      if (!uniqueProductsMap.has(item.pid)) {
        uniqueProductsMap.set(item.pid, item);
      }
    });

    // Convert the map back to an array
    const uniqueProductsList = Array.from(uniqueProductsMap.values());

    return uniqueProductsList.map((item) => ({
      id: item._id,
      pid: item.pid,
      name: item.product.name,
      stockStatus: item.product.stockStatus,
      approval: item.product.approval,
      status: item.Status,
      variants: item.varients,
    }));
  }, [productsList]);

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);

  const handleDelete = (row) => {
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    if (row?.result?.id) {
      navigate(`${PATHS.EditProduct}/${row._id}?variantID=${row?.result._id}`);
    } else {
      navigate(`${PATHS.EditProduct}/${row.id}?pid=${row.pid}`);
    }
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async (updatedVal) => {
    const response = await API_WRAPPER.put(
      `/products/edit-product/:${selectedRow._id}`,
      updatedVal
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
    } else {
      console.log("error in submitEditedRow");
    }
  };

  const handleSave = (inputValues) => {
    submitEditedRow(inputValues);
  };

  const deleteSelectedRow = async () => {
    const response = await API_WRAPPER.delete(
      `/products/delete-product/${selectedRow.id}`
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      success("Product Deleted", "Product Deleted SucessFully!");
    } else {
      swalError("Delete Product", "Error while Deleted Product", () =>
        setShowModal(false)
      );
    }
  };

  return {
    deleteSelectedRow,
    handleSave,
    handleEditChange,
    data,
    setBulkData,
    selectedRow,
    setDisapprovalComment,
    disapprovalComment,
    loading,
    handleDelete,
    handleEdit,
    seterror,
    error,
  };
}

export default useProductManagement;
