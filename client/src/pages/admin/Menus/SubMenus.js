// import Header from "../../../components/ui/Header";
// import { Suspense, useMemo, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { PATHS } from "../../../Routes/paths";
// import ReusableTable from "../../../components/ui/Tables";
// import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
// import { getStatusStyles, getStockStatusStyles } from "../../../utils";
// import useSubMenus from "./useSubMenus";

// function SubMenus() {
//   const [showModal, setShowModal] = useState(false);
//    const location = useLocation();
//    const navigate = useNavigate();
//   const row = location.state?.row;
//   const {
//     extractedMenuData,
//     handleDelete,
//     handleEditMenu,
//     handleEditModal,
//     setEditedMenu,
//     setSelectedRow,
//     menuToBeEdited,
//     subMenuData,
//   } = useSubMenus(row);

//   const pageRendering = () => {
//     navigate(PATHS.adminAddSubMenus, {
//       state: { row },
//     });
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
//     ],
//     []
//   );

//   let headerData = [];
//   let footerData = [];

//     if (extractedMenuData) {
//       headerData = extractedMenuData.filter(
//         (data) => data.menuType === "Header"
//       );
//       footerData = extractedMenuData.filter(
//         (data) => data.menuType === "Footer"
//       );
//     }
//   return (
//     <>
//       <div className="container my-3">
//         <div className="row">
//           <div className="col">
//             {row.menuId == "6698ba84f57b2df8ed4678f6" &&
//             extractedMenuData.length > 0 ? (
//               <>
//                 <Header
//                   heading={`Sub Menus For Header (${row.title})`}
//                   subheading="This section shows information about all the added menus for header in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Sub Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.length > 0 &&
//                     extractedMenuData.map((data) => {
//                       if (row.id == data.mainMenuId) {
//                         headerData.push(data);
//                       }
//                     })}

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
//                     tableType="SabMenu"
//                     subMenu="true"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Header
//                   heading={`Sub Menus For Footer (${row.title})`}
//                   subheading="This section shows information about all the added menus for footer in the application. "
//                   image={ProductManagementBannerImage}
//                 />
//                 <div className="d-flex justify-content-end ">
//                   <button
//                     onClick={pageRendering}
//                     className="m-3 btn bg-primary text-white"
//                   >
//                     Add Sub Menus
//                   </button>
//                 </div>
//                 <div className="mt-2 border d-flex flex-column">
//                   {extractedMenuData.map((data) => {
//                     if (row.id === data.mainMenuId) {
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
//                     tableType="SabMenu"
//                     subMenu="true"
//                   />
//                 </div>
//               </>
//             )}
//             {/* Delete */}
//             <div
//               class="modal fade"
//               id="deleteSabMenu"
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
//                       Do you realy want to delete this Sub Menu?
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

// export default SubMenus;

import Header from "../../../components/ui/Header";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import ReusableTable from "../../../components/ui/Tables";
import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import useSubMenus from "./useSubMenus";
import { swalError } from "../../../utils";
import API_WRAPPER from "../../../api";

function SubMenus() {
  const [showModal, setShowModal] = useState(false);
  const [orderNumbers, setOrderNumbers] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state?.row;
  const {
    extractedMenuData,
    handleDelete,
    handleEditMenu,
    handleEditModal,
    setEditedMenu,
    setSelectedRow,
    menuToBeEdited,
    subMenuData,
  } = useSubMenus(row);

  const pageRendering = () => {
    navigate(PATHS.adminAddSubMenus, {
      state: { row },
    });
  };
   useEffect(() => {
     fetchOrderNumbers();
   }, [extractedMenuData]);
   const fetchOrderNumbers = async () => {
     try {
       const response = await API_WRAPPER.get("/sub-menu-order-numbers");
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

  const handleOrderNumberChange = async (e, id) => {
    const value = e.target.value;
    if (
      value <=
      (row.menuId === "6698ba84f57b2df8ed4678f6"
        ? headerData.length
        : footerData.length)
    ) {
      setOrderNumbers((prev) => ({
        ...prev,
        [id]: value,
      }));

      console.log("Value ", {
        orderNo: value,
      });
       try {
         await API_WRAPPER.put(`/sub-menu/order-update/${id}`, {
           orderNo: value,
         });
       } catch (error) {
         console.error("Error updating order number", error);
       }
    } else {
      swalError(
        "Warning",
        `Order number cannot exceed ${
          row.menuId === "6698ba84f57b2df8ed4678f6"
            ? headerData.length
            : footerData.length
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

  let headerData = [];
  let footerData = [];

  if (extractedMenuData) {
    headerData = extractedMenuData.filter((data) => data.menuType === "Header");
    footerData = extractedMenuData.filter((data) => data.menuType === "Footer");
  }
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            {row.menuId == "6698ba84f57b2df8ed4678f6" &&
            extractedMenuData.length > 0 ? (
              <>
                <Header
                  heading={`Sub Menus For Header (${row.title})`}
                  subheading="This section shows information about all the added menus for header in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Sub Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.length > 0 &&
                    extractedMenuData.map((data) => {
                      if (row.id == data.mainMenuId) {
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
                    tableType="SabMenu"
                    subMenu="true"
                  />
                </div>
              </>
            ) : (
              <>
                <Header
                  heading={`Sub Menus For Footer (${row.title})`}
                  subheading="This section shows information about all the added menus for footer in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Sub Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.map((data) => {
                    if (row.id === data.mainMenuId) {
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
                    tableType="SabMenu"
                    subMenu="true"
                  />
                </div>
              </>
            )}
            {/* Delete */}
            <div
              class="modal fade"
              id="deleteSabMenu"
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
                      Do you realy want to delete this Sub Menu?
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

export default SubMenus;
