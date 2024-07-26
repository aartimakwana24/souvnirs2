// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { motion } from "framer-motion";
// import { fadeInVariants } from "../../../animations";
// import {
//   useTable,
//   useGlobalFilter,
//   useSortBy,
//   usePagination,
//   useRowSelect,
// } from "react-table";
// import Card from "../../ui/Card";
// import IndeterminateCheckbox from "../IndeterminateCheckbox";
// import { useNavigate } from "react-router-dom";
// import { PATHS } from "../../../Routes/paths";

// const ReusableTable = ({
//   tableType,
//   columns,
//   data,
//   onEdit,
//   onDelete,
//   onShow,
//   enableEdit,
//   enableDelete,
//   enableShowDetials,
//   showButtons,
//   onSelectedRowObjectsChange,
//   isSelectable,
//   tableTitle,
//   pageSize,
//   enablePagination,
//   buttonType,
//   actionButton,
//   onUpdateData,
//   subMenu,
// }) => {
//   const [disabledRows, setDisabledRows] = useState([]);
//   const navigate = useNavigate();
//   const handleToggle = (rowId) => {
//     setDisabledRows((prev) => {
//       if (prev.includes(rowId)) {
//         return prev.filter((id) => id !== rowId);
//       } else {
//         return [...prev, rowId];
//       }
//     });
//   };

//   const handleSubMenus = (row) => {
//     navigate(PATHS.adminSubMenus, {
//       state: { row },
//     });
//   };
//   const {
//     editModalId = `update${tableType}`,
//     deleteModalId = `delete${tableType}`,
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     state: { pageIndex, globalFilter, selectedFlatRows },
//     setGlobalFilter,
//     gotoPage,
//     setPageSize,
//     pageCount,
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0, pageSize: Number(pageSize) },
//     },
//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect,
//     (hooks) => {
//       if (isSelectable) {
//         hooks.visibleColumns.push((columns) => [
//           {
//             id: "selection",
//             Header: ({ getToggleAllRowsSelectedProps }) => (
//               <div>
//                 <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
//               </div>
//             ),
//             Cell: ({ row }) => (
//               <div>
//                 <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
//               </div>
//             ),
//           },
//           ...columns,
//         ]);
//       }
//     }
//   );

//   useEffect(() => {
//     if (isSelectable) {
//       const selectedRows = selectedFlatRows.map((row) => row.original);
//       const unselectedRows = page
//         .filter(
//           (row) =>
//             !selectedFlatRows.find((selectedRow) => selectedRow.id === row.id)
//         )
//         .map((row) => row.original);
//       onSelectedRowObjectsChange(selectedRows, unselectedRows);
//     }
//   }, [isSelectable, selectedFlatRows, page, onSelectedRowObjectsChange]);

//   useEffect(() => {
//     if (onUpdateData) {
//       onUpdateData(disabledRows);
//     }
//   }, [disabledRows, onUpdateData]);

//   return (
//     <motion.div
//       initial="initial"
//       animate="animate"
//       variants={fadeInVariants}
//       className="w-screen md:w-auto"
//       style={{ maxHeight: "600px", overflowY: "auto" }}
//     >
//       <div className="flex items-center my-4">
//         <h2 className="text-xl hidden md:block">{tableTitle && tableTitle}</h2>
//         <input
//           type="text"
//           placeholder="Search table here"
//           className="form-control w-25 mb-2 mx-2 md:w-auto md:mb-0"
//           value={globalFilter || ""}
//           onChange={(e) => setGlobalFilter(e.target.value)}
//         />
//       </div>
//       <div className="overflow-x-auto width-full max-w-full">
//         <Card>
//           <table className="table table-striped" {...getTableProps()}>
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers.map((column) => (
//                     <th key={column.accessor}>{column.render("Header")}</th>
//                   ))}
//                   {showButtons && <th>Action</th>}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {page.map((row, index) => {
//                 prepareRow(row);
//                 return (
//                   <tr {...row.getRowProps()} key={index}>
//                     {row.cells.map((cell) => (
//                       <td key={cell.column.accessor}>{cell.render("Cell")}</td>
//                     ))}
//                     {showButtons && (
//                       <td>
//                         {enableShowDetials && (
//                           <button
//                             className="btn btn-info me-2"
//                             onClick={() => onShow(row.original)}
//                           >
//                             Show
//                           </button>
//                         )}
//                         {enableEdit && (
//                           <>
//                             <i
//                               className="fa fa-edit mx-2 text-primary"
//                               style={{ fontSize: "20px" }}
//                               onClick={() => onEdit(row.original)}
//                               type="button"
//                               data-bs-toggle={
//                                 buttonType === "true" ? "modal" : undefined
//                               }
//                               data-bs-target={
//                                 buttonType === "true"
//                                   ? `#${editModalId}`
//                                   : undefined
//                               }
//                             ></i>
//                             {/* <button
//                               className="btn btn-warning me-2"
//                               onClick={() => onEdit(row.original)}
//                               type="button"
//                               data-bs-toggle={
//                                 buttonType === "true" ? "modal" : undefined
//                               }
//                               data-bs-target={
//                                 buttonType === "true"
//                                   ? `#${editModalId}`
//                                   : undefined
//                               }
//                             >
//                               Edit
//                             </button> */}
//                           </>
//                         )}
//                         {actionButton ? (
//                           <button
//                             className={`btn ${
//                               disabledRows.includes(row.original.id)
//                                 ? "btn-danger"
//                                 : "btn-primary"
//                             }`}
//                             onClick={() => handleToggle(row.original.id)}
//                             type="button"
//                           >
//                             {disabledRows.includes(row.original.id)
//                               ? "Disable"
//                               : "Enable"}
//                           </button>
//                         ) : (
//                           ""
//                         )}
//                         {subMenu == "true" ? (
//                           <i
//                             className="fa fa-eye me-2 text-secondary"
//                             style={{ fontSize: "20px" }}
//                             onClick={() => handleSubMenus(row.original)}
//                           ></i>
//                         ) : (
//                           ""
//                         )}
//                         {enableDelete && (
//                           <>
//                             <i
//                               class="fa fa-trash-o text-danger"
//                               style={{ fontSize: "20px" }}
//                               onClick={() => onDelete(row.original)}
//                               type="button"
//                               data-bs-toggle="modal"
//                               data-bs-target={`#${deleteModalId}`}
//                             ></i>
//                             {/* <button
//                             className="btn btn-danger"
//                             onClick={() => onDelete(row.original)}
//                             type="button"
//                             data-bs-toggle="modal"
//                             data-bs-target={`#${deleteModalId}`}
//                           >
//                             Delete
//                           </button> */}
//                           </>
//                         )}
//                       </td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </Card>
//       </div>
//     </motion.div>
//   );
// };

// ReusableTable.propTypes = {
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       Header: PropTypes.string.isRequired,
//       accessor: PropTypes.string.isRequired,
//       Cell: PropTypes.elementType,
//     })
//   ).isRequired,
//   data: PropTypes.arrayOf(PropTypes.object),
//   tableTitle: PropTypes.string.isRequired,
//   onEdit: PropTypes.func,
//   onDelete: PropTypes.func,
//   onShow: PropTypes.func,
//   showButtons: PropTypes.bool,
//   enableEdit: PropTypes.bool,
//   enableDelete: PropTypes.bool,
//   enableShowDetials: PropTypes.bool,
//   onSelectedRowObjectsChange: PropTypes.func,
//   isSelectable: PropTypes.bool,
//   pageSize: PropTypes.string,
//   enablePagination: PropTypes.bool,
//   buttonType: PropTypes.string,
//   actionButton: PropTypes.string,
//   // onUpdateData: PropTypes.func,
// };

// export default ReusableTable;



import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animations";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useRowSelect,
} from "react-table";
import Card from "../../ui/Card";
import IndeterminateCheckbox from "../IndeterminateCheckbox";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

const ReusableTable = ({
  tableType,
  columns,
  data,
  onEdit,
  onDelete,
  onShow,
  enableEdit,
  enableDelete,
  enableShowDetials,
  showButtons,
  onSelectedRowObjectsChange,
  isSelectable,
  tableTitle,
  pageSize,
  enablePagination,
  buttonType,
  actionButton,
  onUpdateData,
  mainMenu,
  subMenu,
  rowData,
}) => {
  const [disabledRows, setDisabledRows] = useState([]);
  const navigate = useNavigate();
  const handleToggle = (rowId) => {
    setDisabledRows((prev) => {
      if (prev.includes(rowId)) {
        return prev.filter((id) => id !== rowId);
      } else {
        return [...prev, rowId];
      }
    });
  };

  const handleMainMenus = (row) => {
    navigate(PATHS.adminSubMenus, {
      state: { row },
    });
  };

    const handleSubMenus = (row) => {
      navigate(PATHS.adminChildMenus, {
        state: { row },
      });
    };
  const {
    editModalId = `update${tableType}`,
    deleteModalId = `delete${tableType}`,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, globalFilter, selectedFlatRows },
    setGlobalFilter,
    gotoPage,
    setPageSize,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: Number(pageSize) },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (isSelectable) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );

  useEffect(() => {
    if (isSelectable) {
      const selectedRows = selectedFlatRows.map((row) => row.original);
      const unselectedRows = page
        .filter(
          (row) =>
            !selectedFlatRows.find((selectedRow) => selectedRow.id === row.id)
        )
        .map((row) => row.original);
      onSelectedRowObjectsChange(selectedRows, unselectedRows);
    }
  }, [isSelectable, selectedFlatRows, page, onSelectedRowObjectsChange]);

  useEffect(() => {
    if (onUpdateData) {
      onUpdateData(disabledRows);
    }
  }, [disabledRows, onUpdateData]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="w-screen md:w-auto"
      style={{ maxHeight: "600px", overflowY: "auto" }}
    >
      <div className="flex items-center my-4">
        <h2 className="text-xl hidden md:block">{tableTitle && tableTitle}</h2>
        <input
          type="text"
          placeholder="Search table here"
          className="form-control w-25 mb-2 mx-2 md:w-auto md:mb-0"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto width-full max-w-full">
        <Card>
          <table className="table table-striped" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th key={column.accessor}>{column.render("Header")}</th>
                  ))}
                  {showButtons && <th>Action</th>}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell) => (
                      <td key={cell.column.accessor}>{cell.render("Cell")}</td>
                    ))}
                    {showButtons && (
                      <td>
                        {enableShowDetials && (
                          <button
                            className="btn btn-info me-2"
                            onClick={() => onShow(row.original)}
                          >
                            Show
                          </button>
                        )}
                        {enableEdit && (
                          <>
                            <i
                              className="fa fa-edit mx-2 text-primary"
                              style={{ fontSize: "20px" }}
                              onClick={() => onEdit(row.original)}
                              type="button"
                              data-bs-toggle={
                                buttonType === "true" ? "modal" : undefined
                              }
                              data-bs-target={
                                buttonType === "true"
                                  ? `#${editModalId}`
                                  : undefined
                              }
                            ></i>
                            {/* <button
                              className="btn btn-warning me-2"
                              onClick={() => onEdit(row.original)}
                              type="button"
                              data-bs-toggle={
                                buttonType === "true" ? "modal" : undefined
                              }
                              data-bs-target={
                                buttonType === "true"
                                  ? `#${editModalId}`
                                  : undefined
                              }
                            >
                              Edit
                            </button> */}
                          </>
                        )}
                        {actionButton ? (
                          <button
                            className={`btn ${
                              disabledRows.includes(row.original.id)
                                ? "btn-danger"
                                : "btn-primary"
                            }`}
                            onClick={() => handleToggle(row.original.id)}
                            type="button"
                          >
                            {disabledRows.includes(row.original.id)
                              ? "Disable"
                              : "Enable"}
                          </button>
                        ) : (
                          ""
                        )}
                        {mainMenu == "true" ? (
                          <i
                            className="fa fa-eye me-2 text-secondary"
                            style={{ fontSize: "20px" }}
                            onClick={() => handleMainMenus(row.original)}
                          ></i>
                        ) : (
                          ""
                        )}
                        {subMenu == "true" ? (
                          <i
                            className="fa fa-eye me-2 text-secondary"
                            style={{ fontSize: "20px" }}
                            onClick={() => handleSubMenus(row.original)}
                          ></i>
                        ) : (
                          ""
                        )}
                        {enableDelete && (
                          <>
                            <i
                              class="fa fa-trash-o text-danger"
                              style={{ fontSize: "20px" }}
                              onClick={() => onDelete(row.original)}
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target={`#${deleteModalId}`}
                            ></i>
                            {/* <button
                            className="btn btn-danger"
                            onClick={() => onDelete(row.original)}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target={`#${deleteModalId}`}
                          >
                            Delete
                          </button> */}
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </motion.div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
      Cell: PropTypes.elementType,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  tableTitle: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onShow: PropTypes.func,
  showButtons: PropTypes.bool,
  enableEdit: PropTypes.bool,
  enableDelete: PropTypes.bool,
  enableShowDetials: PropTypes.bool,
  onSelectedRowObjectsChange: PropTypes.func,
  isSelectable: PropTypes.bool,
  pageSize: PropTypes.string,
  enablePagination: PropTypes.bool,
  buttonType: PropTypes.string,
  actionButton: PropTypes.string,
};

export default ReusableTable;

