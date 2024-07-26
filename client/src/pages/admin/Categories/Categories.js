import Header from "../../../components/ui/Header";
import ReusableTable from "../../../components/ui/Tables";
import { Suspense, useMemo, useState ,useEffect } from "react";
import { PATHS } from "../../../Routes/paths";
import { Link } from "react-router-dom";
import watch1 from "../../../assets/images/watch1.png";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import useCategories from "./useCategories";
import { useNavigate } from "react-router-dom";

function Categories() {
  const {
    attributesList,
    categoriesList,
    convertAttributesList,
    handleDelete,
    handleEdit,
    handleEditChange,
    selectedRow,
    submitDeleteCategory,
    submitEditedRow,
    selectedAttributes,
    setSelectedAttributes,
  } = useCategories();

   const columns = useMemo(
     () => [
       {
         Header: "Name",
         accessor: "name",
       },
       {
         Header: "HSN Id",
         accessor: "hsn_code",
       },
       {
         Header: "Type",
         accessor: "type",
       },
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
  
   const navigate = useNavigate();
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Category"
            subheading="This is admin dashboard which addded attributes here provides all the details in a very concise and user-friendly way."
            // image={AttributeBannerImage}
          />

          <div className="d-flex flex-column">
            <Link
              to={PATHS.adminAddCategory}
              className="btn btn-primary align-self-end mt-3"
            >
              Add Categories
            </Link>
          </div>
          <div className="mt-2 border d-flex flex-column">
            <Suspense>
              <ReusableTable
                columns={columns}
                data={categoriesList}
                showButtons
                enableEdit
                enableDelete
                pageSize={10}
                enablePagination
                onEdit={handleEdit}
                onDelete={handleDelete}
                tableType="Categories"
                buttonType ="false"
              />
            </Suspense>

            {/* Delete */}
            <div
              className="modal fade"
              id="deleteCategories"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Do you realy want to delete this Category?
                    </h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => submitDeleteCategory()}
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

export default Categories;
