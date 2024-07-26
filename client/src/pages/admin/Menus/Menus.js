// // import Header from "../../../components/ui/Header";
// // import { useEffect, useMemo, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { PATHS } from "../../../Routes/paths";
// // import ReusableTable from "../../../components/ui/Tables";
// // import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
// // import { getStatusStyles, swalError } from "../../../utils";
// // import useMenus from "./useMenus";
// // import API_WRAPPER from "../../../api";

// // function Menus() {
// //   const [showModal, setShowModal] = useState(false);
// //   const [orderNumbers, setOrderNumbers] = useState({});
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const titleExists = location.state?.titleExists;
// //   const {
// //     extractedMenuData,
// //     handleDelete,
// //     handleEditMenu,
// //     handleEditModal,
// //     setEditedMenu,
// //     setSelectedRow,
// //     menuData,
// //     menuToBeEdited,
// //   } = useMenus(titleExists);

// //   useEffect(() => {
// //     if (extractedMenuData.length > 0) {
// //       const initialOrderNumbers = {};
// //       extractedMenuData.forEach((menu) => {
// //         initialOrderNumbers[menu.id] = menu.orderNo;
// //       });
// //       setOrderNumbers(initialOrderNumbers);
// //     }
// //   }, [extractedMenuData]);

// //   const pageRendering = () => {
// //     navigate(PATHS.adminAddMainMenus, {
// //       state: { titleExists },
// //     });
// //   };

// //   let totalRecords = extractedMenuData.length;
// //   console.log("totalRecords ", totalRecords);
// //   console.log("extractedMenuData ", extractedMenuData);
// //   if (extractedMenuData.length > 0) {
// //   }
// //   let myArr = [];
// //   let headerData = [];
// //   let footerData = [];

// //   const handleOrderNumberChange = async (e, id) => {
// //     const value = e.target.value;
// //     if (value <= totalRecords) {
// //       setOrderNumbers((prev) => ({
// //         ...prev,
// //         [id]: value,
// //       }));

// //       try {
// //         await API_WRAPPER.put(`/main-menu/order-update/${id}`, {
// //           orderNo: value,
// //         });
// //       } catch (error) {
// //         console.error("Error updating order number", error);
// //       }
// //     } else {
// //       swalError("Warning", `Order number cannot exceed ${totalRecords}`, () => {
// //         setShowModal(false);
// //       });
// //     }
// //   };

// //   const columns = useMemo(
// //     () => [
// //       {
// //         Header: "Title",
// //         accessor: "title",
// //       },
// //       {
// //         Header: "Status",
// //         accessor: "status",
// //         Cell: ({ row }) => {
// //           return getStatusStyles(row?.original?.status);
// //         },
// //       },
// //       {
// //         Header: "Order No.",
// //         accessor: "orderNo",
// //         Cell: ({ row }) => (
// //           <>
// //             {/* {myArr.push(orderNumbers[row.original.id])} */}
// //             <input
// //               type="number"
// //               value={orderNumbers[row.original.id] || ""}
// //               onChange={(e) => handleOrderNumberChange(e, row.original.id)}
// //               className="form-control"
// //             />
// //           </>
// //         ),
// //       },
// //     ],
// //     [orderNumbers]
// //   );

// //   return (
// //     <>
// //       <div className="container my-3">
// //         <div className="row">
// //           <div className="col">
// //             {titleExists.title === "Header" ? (
// //               <>
// //                 <Header
// //                   heading="Menus For Header"
// //                   subheading="This section shows information about all the added menus for header in the application. "
// //                   image={ProductManagementBannerImage}
// //                 />
// //                 <div className="d-flex justify-content-end ">
// //                   <button
// //                     onClick={pageRendering}
// //                     className="m-3 btn bg-primary text-white"
// //                   >
// //                     Add Menus
// //                   </button>
// //                 </div>
// //                 <div className="mt-2 border d-flex flex-column">
// //                   {extractedMenuData.map((data) => {
// //                     if (titleExists._id === data.menuId) {
// //                       headerData.push(data);
// //                     }
// //                   })}
// //                   <ReusableTable
// //                     columns={columns}
// //                     data={headerData}
// //                     showButtons
// //                     onEdit={handleEditModal}
// //                     onDelete={(row) => {
// //                       setSelectedRow(row);
// //                     }}
// //                     enableEdit
// //                     enableDelete
// //                     pageSize={10}
// //                     enablePagination
// //                     buttonType="false"
// //                     mainMenu="true"
// //                     tableType="MainMenu"
// //                   />
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <Header
// //                   heading="Menus For Footer"
// //                   subheading="This section shows information about all the added menus for footer in the application. "
// //                   image={ProductManagementBannerImage}
// //                 />
// //                 <div className="d-flex justify-content-end ">
// //                   <button
// //                     onClick={pageRendering}
// //                     className="m-3 btn bg-primary text-white"
// //                   >
// //                     Add Menus
// //                   </button>
// //                 </div>
// //                 <div className="mt-2 border d-flex flex-column">
// //                   {extractedMenuData.map((data) => {
// //                     if (titleExists._id === data.menuId) {
// //                       footerData.push(data);
// //                     }
// //                   })}
// //                   <ReusableTable
// //                     columns={columns}
// //                     data={footerData}
// //                     showButtons
// //                     onEdit={handleEditModal}
// //                     onDelete={(row) => {
// //                       setSelectedRow(row);
// //                     }}
// //                     enableEdit
// //                     enableDelete
// //                     pageSize={10}
// //                     enablePagination
// //                     buttonType="false"
// //                     mainMenu="true"
// //                     tableType="MainMenu"
// //                   />
// //                 </div>
// //               </>
// //             )}
// //             {/* Delete */}
// //             <div
// //               class="modal fade"
// //               id="deleteMainMenu"
// //               tabindex="-1"
// //               aria-labelledby="exampleModalLabel"
// //               aria-hidden="true"
// //             >
// //               <div class="modal-dialog">
// //                 <div class="modal-content">
// //                   <div class="modal-header">
// //                     <button
// //                       type="button"
// //                       class="btn-close"
// //                       data-bs-dismiss="modal"
// //                       aria-label="Close"
// //                     ></button>
// //                   </div>
// //                   <div class="modal-body">
// //                     <h5 class="modal-title" id="exampleModalLabel">
// //                       Do you realy want to delete this Main Menu?
// //                     </h5>
// //                   </div>
// //                   <div class="modal-footer">
// //                     <button
// //                       type="button"
// //                       class="btn btn-secondary"
// //                       data-bs-dismiss="modal"
// //                     >
// //                       No
// //                     </button>
// //                     <button
// //                       type="button"
// //                       class="btn btn-danger"
// //                       onClick={() => handleDelete()}
// //                       data-bs-dismiss="modal"
// //                     >
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Menus;

// import Header from "../../../components/ui/Header";
// import { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PATHS } from "../../../Routes/paths";
// import ReusableTable from "../../../components/ui/Tables";
// import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
// import { getStatusStyles, swalError } from "../../../utils";
// import useMenus from "./useMenus";
// import API_WRAPPER from "../../../api";

// function Menus() {
//   const [showModal, setShowModal] = useState(false);
//   const [orderNumbers, setOrderNumbers] = useState({});
//   const location = useLocation();
//   const navigate = useNavigate();
//   const titleExists = location.state?.titleExists;
//   const {
//     extractedMenuData,
//     handleDelete,
//     handleEditMenu,
//     handleEditModal,
//     setEditedMenu,
//     setSelectedRow,
//     menuData,
//     menuToBeEdited,
//   } = useMenus(titleExists);

//   useEffect(() => {
//     if (extractedMenuData.length > 0) {
//       const initialOrderNumbers = {};
//       extractedMenuData.forEach((menu) => {
//         initialOrderNumbers[menu.id] = menu.orderNo;
//       });
//       setOrderNumbers(initialOrderNumbers);
//     }
//   }, [extractedMenuData]);

//   const pageRendering = () => {
//     navigate(PATHS.adminAddMainMenus, {
//       state: { titleExists },
//     });
//   };

//   let totalRecords = extractedMenuData.length;
//   console.log("totalRecords ", totalRecords);
//   console.log("extractedMenuData ", extractedMenuData);
//   if (extractedMenuData.length > 0) {
//   }
//   let myArr = [];
//   let headerData = [];
//   let footerData = [];

//   const handleOrderNumberChange = async (e, id) => {
//     const value = e.target.value;
//     if (value <= totalRecords) {
//       setOrderNumbers((prev) => ({
//         ...prev,
//         [id]: value,
//       }));

//       try {
//         await API_WRAPPER.put(`/main-menu/order-update/${id}`, {
//           orderNo: value,
//         });
//       } catch (error) {
//         console.error("Error updating order number", error);
//       }
//     } else {
//       swalError("Warning", `Order number cannot exceed ${totalRecords}`, () => {
//         setShowModal(false);
//       });
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ row }) => {
//           return getStatusStyles(row?.original?.status);
//         },
//       },
//       {
//         Header: "Order No.",
//         accessor: "orderNo",
//         Cell: ({ row }) => (
//           <>
//             {/* {myArr.push(orderNumbers[row.original.id])} */}
//             <input
//               type="number"
//               value={orderNumbers[row.original.id] || ""}
//               onChange={(e) => handleOrderNumberChange(e, row.original.id)}
//               className="form-control"
//             />
//           </>
//         ),
//       },
//     ],
//     [orderNumbers]
//   );

//   return (
//     <>
//       <div className="container my-3">
//         <div className="row">
//           <div className="col">
//             {titleExists.title === "Header" ? (
//               <>
//                 <Header
//                   heading="Menus For Header"
//                   subheading="This section shows information about all the added menus for header in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.map((data) => {
//                     if (titleExists._id === data.menuId) {
//                       headerData.push(data);
//                     }
//                   })}
//                   <ReusableTable
//                     columns={columns}
//                     data={headerData}
//                     showButtons
//                     onEdit={handleEditModal}
//                     onDelete={(row) => {
//                       setSelectedRow(row);
//                     }}
//                     enableEdit
//                     enableDelete
//                     pageSize={10}
//                     enablePagination
//                     buttonType="false"
//                     mainMenu="true"
//                     tableType="MainMenu"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Header
//                   heading="Menus For Footer"
//                   subheading="This section shows information about all the added menus for footer in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.map((data) => {
//                     if (titleExists._id === data.menuId) {
//                       footerData.push(data);
//                     }
//                   })}
//                   <ReusableTable
//                     columns={columns}
//                     data={footerData}
//                     showButtons
//                     onEdit={handleEditModal}
//                     onDelete={(row) => {
//                       setSelectedRow(row);
//                     }}
//                     enableEdit
//                     enableDelete
//                     pageSize={10}
//                     enablePagination
//                     buttonType="false"
//                     mainMenu="true"
//                     tableType="MainMenu"
//                   />
//                 </div>
//               </>
//             )}
//             {/* Delete */}
//             <div
//               class="modal fade"
//               id="deleteMainMenu"
//               tabindex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div class="modal-dialog">
//                 <div class="modal-content">
//                   <div class="modal-header">
//                     <button
//                       type="button"
//                       class="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div class="modal-body">
//                     <h5 class="modal-title" id="exampleModalLabel">
//                       Do you realy want to delete this Main Menu?
//                     </h5>
//                   </div>
//                   <div class="modal-footer">
//                     <button
//                       type="button"
//                       class="btn btn-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       No
//                     </button>
//                     <button
//                       type="button"
//                       class="btn btn-danger"
//                       onClick={() => handleDelete()}
//                       data-bs-dismiss="modal"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Menus;

// import Header from "../../../components/ui/Header";
// import { useEffect, useMemo, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PATHS } from "../../../Routes/paths";
// import ReusableTable from "../../../components/ui/Tables";
// import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
// import { getStatusStyles, swalError } from "../../../utils";
// import useMenus from "./useMenus";
// import API_WRAPPER from "../../../api";

// function Menus() {
//   const [showModal, setShowModal] = useState(false);
//   const [orderNumbers, setOrderNumbers] = useState({});
//   const location = useLocation();
//   const navigate = useNavigate();
//   const titleExists = location.state?.titleExists;
//   const {
//     extractedMenuData,
//     handleDelete,
//     handleEditMenu,
//     handleEditModal,
//     setEditedMenu,
//     setSelectedRow,
//     menuData,
//     menuToBeEdited,
//   } = useMenus(titleExists);

//   useEffect(() => {
//     if (extractedMenuData.length > 0) {
//       const initialOrderNumbers = {};
//       extractedMenuData.forEach((menu) => {
//         initialOrderNumbers[menu.id] = menu.orderNo;
//       });
//       setOrderNumbers(initialOrderNumbers);
//     }
//   }, [extractedMenuData]);

//   const pageRendering = () => {
//     navigate(PATHS.adminAddMainMenus, {
//       state: { titleExists },
//     });
//   };

//   let totalRecords = extractedMenuData.length;
//   console.log("totalRecords ", totalRecords);
//   console.log("extractedMenuData ", extractedMenuData);
//   if (extractedMenuData.length > 0) {
//   }
//   let myArr = [];
//   let headerData = [];
//   let footerData = [];

//   const handleOrderNumberChange = async (e, id) => {
//     const value = e.target.value;
//     if (value <= totalRecords) {
//       setOrderNumbers((prev) => ({
//         ...prev,
//         [id]: value,
//       }));

//       try {
//         await API_WRAPPER.put(`/main-menu/order-update/${id}`, {
//           orderNo: value,
//         });
//       } catch (error) {
//         console.error("Error updating order number", error);
//       }
//     } else {
//       swalError("Warning", `Order number cannot exceed ${totalRecords}`, () => {
//         setShowModal(false);
//       });
//     }
//   };

//   const columns = useMemo(
//     () => [
//       {
//         Header: "Title",
//         accessor: "title",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ row }) => {
//           return getStatusStyles(row?.original?.status);
//         },
//       },
//       {
//         Header: "Order No.",
//         accessor: "orderNo",
//         Cell: ({ row }) => (
//           <>
//             {/* {myArr.push(orderNumbers[row.original.id])} */}
//             <input
//               type="number"
//               value={orderNumbers[row.original.id] || ""}
//               onChange={(e) => handleOrderNumberChange(e, row.original.id)}
//               className="form-control"
//             />
//           </>
//         ),
//       },
//     ],
//     [orderNumbers]
//   );

//   return (
//     <>
//       <div className="container my-3">
//         <div className="row">
//           <div className="col">
//             {titleExists.title === "Header" ? (
//               <>
//                 <Header
//                   heading="Menus For Header"
//                   subheading="This section shows information about all the added menus for header in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.map((data) => {
//                     if (titleExists._id === data.menuId) {
//                       headerData.push(data);
//                     }
//                   })}
//                   <ReusableTable
//                     columns={columns}
//                     data={headerData}
//                     showButtons
//                     onEdit={handleEditModal}
//                     onDelete={(row) => {
//                       setSelectedRow(row);
//                     }}
//                     enableEdit
//                     enableDelete
//                     pageSize={10}
//                     enablePagination
//                     buttonType="false"
//                     mainMenu="true"
//                     tableType="MainMenu"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Header
//                   heading="Menus For Footer"
//                   subheading="This section shows information about all the added menus for footer in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.map((data) => {
//                     if (titleExists._id === data.menuId) {
//                       footerData.push(data);
//                     }
//                   })}
//                   <ReusableTable
//                     columns={columns}
//                     data={footerData}
//                     showButtons
//                     onEdit={handleEditModal}
//                     onDelete={(row) => {
//                       setSelectedRow(row);
//                     }}
//                     enableEdit
//                     enableDelete
//                     pageSize={10}
//                     enablePagination
//                     buttonType="false"
//                     mainMenu="true"
//                     tableType="MainMenu"
//                   />
//                 </div>
//               </>
//             )}
//             {/* Delete */}
//             <div
//               class="modal fade"
//               id="deleteMainMenu"
//               tabindex="-1"
//               aria-labelledby="exampleModalLabel"
//               aria-hidden="true"
//             >
//               <div class="modal-dialog">
//                 <div class="modal-content">
//                   <div class="modal-header">
//                     <button
//                       type="button"
//                       class="btn-close"
//                       data-bs-dismiss="modal"
//                       aria-label="Close"
//                     ></button>
//                   </div>
//                   <div class="modal-body">
//                     <h5 class="modal-title" id="exampleModalLabel">
//                       Do you realy want to delete this Main Menu?
//                     </h5>
//                   </div>
//                   <div class="modal-footer">
//                     <button
//                       type="button"
//                       class="btn btn-secondary"
//                       data-bs-dismiss="modal"
//                     >
//                       No
//                     </button>
//                     <button
//                       type="button"
//                       class="btn btn-danger"
//                       onClick={() => handleDelete()}
//                       data-bs-dismiss="modal"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Menus;

import Header from "../../../components/ui/Header";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import ReusableTable from "../../../components/ui/Tables";
import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
import { getStatusStyles, swalError } from "../../../utils";
import useMenus from "./useMenus";
import API_WRAPPER from "../../../api";

function Menus() {
  const [showModal, setShowModal] = useState(false);
  const [orderNumbers, setOrderNumbers] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const titleExists = location.state?.titleExists;
  const {
    extractedMenuData,
    handleDelete,
    handleEditMenu,
    handleEditModal,
    setEditedMenu,
    setSelectedRow,
    menuData,
    menuToBeEdited,
  } = useMenus(titleExists);

  useEffect(() => {
    fetchOrderNumbers();
  }, [extractedMenuData]);
  const fetchOrderNumbers = async () => {
    try {
      const response = await API_WRAPPER.get("/main-menu-order-numbers");
      console.log("response aaya  ", response.data);
      const orderNumbersData = response.data.reduce((acc, item) => {
        acc[item.id] = item.orderNo;
        return acc;
      }, {});
      console.log("orderNumbersData ", orderNumbersData);
      setOrderNumbers(orderNumbersData);
    } catch (error) {
        if (error.response) {
          console.error("Error fetching order numbers", error.response.data);
        } else if (error.request) {
          console.error(
            "Error fetching order numbers: No response received",
            error.request
          );
        } else {
          console.error("Error fetching order numbers: ", error.message);
        }
    }
  };


  useEffect(() => {
    if (extractedMenuData.length > 0) {
      const initialOrderNumbers = {};
      extractedMenuData.forEach((menu) => {
        initialOrderNumbers[menu.id] = menu.orderNo;
      });
      setOrderNumbers(initialOrderNumbers);
    }
  }, [extractedMenuData]);

  const pageRendering = () => {
    navigate(PATHS.adminAddMainMenus, {
      state: { titleExists },
    });
  };

  if (extractedMenuData.length > 0) {
  }
  let myArr = [];
  let headerData = [];
  let footerData = [];

  if (extractedMenuData) {
    headerData = extractedMenuData.filter((data) => data.menuType === "Header");
    footerData = extractedMenuData.filter((data) => data.menuType === "Footer");
  }

  const handleOrderNumberChange = async (e, id) => {
    const value = e.target.value;
    if (
      value <=
      (titleExists.title === "Header" ? headerData.length : footerData.length)
    ) {
      setOrderNumbers((prev) => ({
        ...prev,
        [id]: value,
      }));

      try {
        await API_WRAPPER.put(`/main-menu/order-update/${id}`, {
          orderNo: value,
        });
      } catch (error) {
        console.error("Error updating order number", error);
      }
    } else {
      swalError(
        "Warning",
        `Order number cannot exceed ${
          titleExists.title === "Header" ? headerData.length : footerData.length
        }`,
        () => {
          setShowModal(false);
        }
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
      {
        Header: "Order No.",
        accessor: "orderNo",
        Cell: ({ row }) => (
          <>
            <input
              type="number"
              value={orderNumbers[row.original.id] || ""}
              onChange={(e) => handleOrderNumberChange(e, row.original.id)}
              className="form-control"
            />
          </>
        ),
      },
    ],
    [orderNumbers]
  );

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            {titleExists.title === "Header" ? (
              <>
                <Header
                  heading="Menus For Header"
                  subheading="This section shows information about all the added menus for header in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.map((data) => {
                    if (titleExists._id === data.menuId) {
                      headerData.push(data);
                    }
                  })}
                  <ReusableTable
                    columns={columns}
                    data={headerData}
                    showButtons
                    onEdit={handleEditModal}
                    onDelete={(row) => {
                      setSelectedRow(row);
                    }}
                    enableEdit
                    enableDelete
                    pageSize={10}
                    enablePagination
                    buttonType="false"
                    mainMenu="true"
                    tableType="MainMenu"
                  />
                </div>
              </>
            ) : (
              <>
                <Header
                  heading="Menus For Footer"
                  subheading="This section shows information about all the added menus for footer in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.map((data) => {
                    if (titleExists._id === data.menuId) {
                      footerData.push(data);
                    }
                  })}
                  <ReusableTable
                    columns={columns}
                    data={footerData}
                    showButtons
                    onEdit={handleEditModal}
                    onDelete={(row) => {
                      setSelectedRow(row);
                    }}
                    enableEdit
                    enableDelete
                    pageSize={10}
                    enablePagination
                    buttonType="false"
                    mainMenu="true"
                    tableType="MainMenu"
                  />
                </div>
              </>
            )}
            {/* Delete */}
            <div
              class="modal fade"
              id="deleteMainMenu"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Do you realy want to delete this Main Menu?
                    </h5>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => handleDelete()}
                      data-bs-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menus;
