import Header from "../../../components/ui/Header";
import ReusableTable from "../../../components/ui/Tables";
import { Suspense, useMemo, useState } from "react";
import { PATHS } from "../../../Routes/paths";
import { Link } from "react-router-dom";
import watch1 from "../../../assets/images/watch1.png";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import AttributeBannerImage from "../../../assets/images/attributesImage.png";
import useAttribute from "./useAttribute";


function Attributes() {
//   const [selectedRow, setSelectedRow] = useState();
  const {
    attributesList,
    handleDelete,
    handleDeleteSubmit,
    handleEdit,
    handleEditChange,
    handleFormSubmit,
    selectedRow,
  } = useAttribute();

   const columns = [
     {
       Header: "Attribute Id",
       accessor: "_id",
     },
     {
       Header: "Attribute Name",
       accessor: "name",
     },
     {
       Header: "Status",
       accessor: "status",
       Cell: ({ row }) => {
         return getStatusStyles(row?.original?.status);
       },
     },
   ];
  
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Add Attributes"
            subheading="This is admin dashboard which addded attributes here provides all the details in a very concise and user-friendly way."
            // image={AttributeBannerImage}
          />

          <div className="d-flex flex-column">
            <Link
              to={PATHS.adminAddAttributes}
              className="btn btn-primary align-self-end mt-3"
            >
              Add Attribute
            </Link>
          </div>
          <div className="mt-2 border d-flex flex-column">
            {/* <Suspense> */}
            <ReusableTable
              columns={columns}
              data={attributesList}
              onEdit={handleEdit}
              onDelete={handleDelete}
              showButtons
              enableEdit
              enableDelete
              pageSize={10}
              enablePagination
              tableType="Attribute"
              buttonType="true"
            />
            {/* </Suspense> */}

            {/* Edit */}
            <div
              class="modal fade"
              id="updateAttribute"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Edit Attribute
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <form method="" className="modal-box">
                      <div className="row">
                        <div className="col col-lg-12 col-md-12 col-12 my-4">
                          <div className="form-control">
                            <label className="label me-4">Attribute Name</label>
                            <input
                              defaultValue={selectedRow?.name}
                              onChange={(e) => handleEditChange(e)}
                              // className="input input-primary"
                              type="text"
                              name="name"
                              id=""
                            />
                          </div>
                        </div>
                        <div className="col col-lg-12 col-md-12 col-12">
                          <div className="form-control">
                            <label className="label me-5">Status</label>
                            <select
                              defaultValue={selectedRow?.status}
                              onChange={(e) => handleEditChange(e)}
                              className="ms-5"
                              name="status"
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="DEACTIVE">DEACTIVE</option>
                              <option value="PENDING">PENDING</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      className="btn"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>

                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={(e) => handleFormSubmit(e)}
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete */}
            <div
              class="modal fade"
              id="deleteAttribute"
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
                      Do you realy want to delete this attribute?
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
                      onClick={() => handleDeleteSubmit()}
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
    </div>
  );
}

export default Attributes;
