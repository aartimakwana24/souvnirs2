import Header from "../../../components/ui/Header";
import { Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import ReusableTable from "../../../components/ui/Tables";
import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import watch1 from "../../../assets/images/watch1.png";
import useProductManagement from "./useProductManagement";

function ProductManagement() {
  const [showModal, setShowModal] = useState(false);
  const {
    alterApproval,
    bulkUpload,
    data,
    deleteSelectedRow,
    disapprovalComment,
    error,
    handleDelete,
    handleEdit,
    loading,
    selectedRow,
    setBulkData,
    setDisapprovalComment,
    seterror,
  } = useProductManagement();

  const columns = useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
      },
      // {
      //   Header: "Variant",
      //   Cell: ({ row }) => {
      //     if (row?.original?.result?.variant) {
      //       const keys = Object.keys(row?.original?.result?.variant);
      //       return keys.map((key) => (
      //         <p key={key}>
      //           {key}:{row?.original?.result?.variant[key]}
      //         </p>
      //       ));
      //     } else {
      //       return <p> </p>;
      //     }
      //   },
      // },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
        Cell: ({ row }) => {
          return getStockStatusStyles(row?.original?.stockStatus);
        },
      },
      // {
      //   Header: "Approval",
      //   Cell: ({ row }) => {
      //     return (
      //       <div>
      //         {row?.original?.approved ? (
      //           <button
      //             onClick={() => {
      //               selectedRow(row?.original);
      //             }}
      //             className="btn btn-sm btn-primary"
      //           >
      //             Disapprove
      //           </button>
      //         ) : (
      //           <button
      //             onClick={() => {
      //               // alterApproval(row?.original?._id, true);
      //             }}
      //             className="btn btn-sm btn-primary"
      //           >
      //             Approve
      //           </button>
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            {/* Header */}
            <Header
              heading="Product Management"
              subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
              image={ProductManagementBannerImage}
            />
            {/*  */}
            <div className="d-flex flex-column">
              {/* Button to open modal */}
              <details className="dropdown dropdown-menu-end align-self-end mt-3">
                <summary className="m-1 btn bg-primary text-white">
                  Add Products
                </summary>
                <ul
                  className="p-2 shadow menu dropdown-content z-[1] bg-base w-52"
                  style={{ listStyle: "none" }}
                >
                  <li>
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowModal(true)}
                      // onChange={(e) => bulkUpload(e.target.files[0])}
                    >
                      {/* <BsUpload size={20} /> */}
                      Bulk Upload
                    </p>
                  </li>
                  <li>
                    <Link
                      to={PATHS.adminAddProducts}
                      className="text-dark text-decoration-none"
                    >
                      {/* <GoPlus size={20} /> */}
                      Add Product
                    </Link>
                  </li>
                </ul>
              </details>
            </div>
            <div className="mt-2 border d-flex flex-column">
              <ReusableTable
                columns={columns}
                data={data}
                showButtons
                onEdit={handleEdit}
                onDelete={handleDelete}
                enableEdit
                enableDelete
                pageSize={10}
                enablePagination
                tableType="Product"
                buttonType="false"
              />
            </div>
            {/* Bootstrap modal */}
            <div
              className={`modal fade ${showModal ? "show" : ""}`}
              tabIndex="-1"
              style={{ display: showModal ? "block" : "none" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Import Product By CSV</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Choose File
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* End of Bootstrap modal */}

            {/* Delete----- */}
            <div
              class="modal fade"
              id="deleteProduct"
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
                      Do you realy want to delete this Product?
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
                      onClick={() => deleteSelectedRow()}
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

export default ProductManagement;
