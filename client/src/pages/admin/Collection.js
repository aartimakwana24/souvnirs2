import Header from "../../components/ui/Header";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import ReusableTable from "../../components/ui/Tables";
import success, {
  getStatusStyles,
  getStockStatusStyles,
  swalError,
} from "../../utils/index.js";
import CollectionBannerImage from "../../assets/images/collectionImage.png";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../api";

function Collection() {
  const [showModal, setShowModal] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  const [editedRow, setEditedRow] = useState({});
  const navigate = useNavigate();
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

  const data = useMemo(() => collectionList, [collectionList]);

  const fetchAllCollections = async () => {
    try {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response?.status === 200) {
        setCollectionList(response?.data);
      }
    } catch (error) {
      swalError(error.message, "error", () => {
        setShowModal(false);
      });
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    navigate(`${PATHS.EditCollection}/${row._id}`);
    console.log("ROW TO BE EDITED: ", row);
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `collection/delete-collection-by-id/:${selectedRow._id}`
      );
      if (response.status === 200) {
        success("Collection deleted successfully", "success");
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      console.error("Error occurred while deleting collection:", error);
    }
  };

  useEffect(() => {
    fetchAllCollections();
  }, [apiTrigger]);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div className="col">
            <Header
              heading="Collection"
              subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
              image={CollectionBannerImage}
            />
            <div className="d-flex justify-content-end ">
              <Link
                to={PATHS.adminAddCollection}
                className="m-3 btn bg-primary text-white"
              >
                Add Collection
              </Link>
            </div>
            <div className="mt-2 border d-flex flex-column">
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
                tableType="Collection"
                buttonType="false"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Delete----- */}
      <div
        class="modal fade"
        id="deleteCollection"
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
                Do you realy want to delete this Collection?
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
    </>
  );
}

export default Collection;
