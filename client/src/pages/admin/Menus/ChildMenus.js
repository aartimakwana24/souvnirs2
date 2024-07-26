import Header from "../../../components/ui/Header";
import { Suspense, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import ReusableTable from "../../../components/ui/Tables";
import ProductManagementBannerImage from "../../../assets/images/productManagementImage.png";
import { getStatusStyles, getStockStatusStyles } from "../../../utils";
import useChildMenus from "./useChildMenus";

function ChildMenus() {
  const [showModal, setShowModal] = useState(false);
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
    titleId,
  } = useChildMenus(row);

  const pageRendering = () => {
    navigate(PATHS.adminAddChildMenus, {
      state: { row },
    });
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
    ],
    []
  );

  let headerData = [];
  let footerData = [];
  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            {titleId == "6698ba84f57b2df8ed4678f6" &&
            extractedMenuData &&
            extractedMenuData.length > 0 ? (
              <>
                <Header
                  heading={`Child Menus For Header (${row.title})`}
                  subheading="This section shows information about all the added child menus for header in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Child Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.length > 0 &&
                    extractedMenuData.map((data) => {
                      if (row.id == data.subMenuId) {
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
                    tableType="ChildMenu"
                  />
                </div>
              </>
            ) : titleId == "6698bbdbf57b2df8ed4678fd" &&
              extractedMenuData &&
              extractedMenuData.length > 0 ? (
              <>
                <Header
                  heading={`Child Menus For Footer (${row.title})`}
                  subheading="This section shows information about all the added menus for footer in the application. "
                  image={ProductManagementBannerImage}
                />
                <div className="d-flex justify-content-end ">
                  <button
                    onClick={pageRendering}
                    className="m-3 btn bg-primary text-white"
                  >
                    Add Child Menus
                  </button>
                </div>
                <div className="mt-2 border d-flex flex-column">
                  {extractedMenuData.map((data) => {
                    if (row.id === data.subMenuId) {
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
                    tableType="ChildMenu"
                  />
                </div>
              </>
            ) : (
              "Loding"
            )}
            {/* Delete */}
            <div
              class="modal fade"
              id="deleteChildMenu"
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
                      Do you realy want to delete this Child Menu?
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

export default ChildMenus;
