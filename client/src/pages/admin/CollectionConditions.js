import Header from "../../components/ui/Header";
import ReusableTable from "../../components/ui/Tables";
import { useEffect, useMemo, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import CollectionBannerImage from "../../assets/images/collectionImage.png";
import success, { swalError, getStatusStyles } from "../../utils";
import { fadeInVariants } from "../../animations";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../api";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths.js";

function CollectionConditions() {
  const [selected, setSelected] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [collectionConditions, setCollectionConditions] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedVal, setSelectedVal] = useState([]);
  const [editedRow, setEditedRow] = useState({});
  const [getDataById, setGetDataById] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllConditionValues();
    getAllCollectionCondition();
  }, [apiTrigger]);

  const handleChange = (e) => {
    setCollectionConditions(e.target.value);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Collection Condition Title",
        accessor: "title",
      },
      //   {
      //     Header: "Condition Values",
      //     accessor: "result",
      //     Cell: ({ row }) => {
      //       return (
      //         <>
      //           {row.original.result.map((condition) => (
      //             <p className="" key={nanoid()}>
      //               {condition.conditionValue}
      //             </p>
      //           ))}
      //         </>
      //       );
      //     },
      //   },
      {
        Header: "Condition Values",
        accessor: "result",
        Cell: ({ value }) => {
          return (
            <>
              {value.map((item) => (
                <p key={nanoid()}>{item.conditionValue}</p>
              ))}
            </>
          );
        },
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

  const data = useMemo(
    () =>
      collectionConditionList.map((item) => ({
        ...item,
        result: item.result || [],
      })),
    [collectionConditionList]
  );

  const convertArr = (arr) => {
    return arr.map((item) => {
      return { label: item.conditionValue, value: item._id, id: item._id };
    });
  };

  const editConvertArr = (arr) => {
    return arr.map((item) => {
      return {
        label: item.conditionValue,
        value: item.conditionValue,
        id: item._id,
      };
    });
  };

  const getAllConditionValues = async () => {
    try {
      const response = await API_WRAPPER.get(
        "/condition-value/get-all-condition-values"
      );
      if (response.status === 200) {
        setConditionValueList(response.data);
      }
    } catch (error) {
      console.log("Error in getAllConditionValues ", error);
    }
  };

  const addCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.post(
        `/collection-condition/create-collection-condition`,
        {
          title: collectionConditions,
          conditionValues: selected.map((item) => item.id),
        }
      );
      setApiTrigger((prevState) => !prevState);
      success("Success", "Collection condition created successfully!");
      setCollectionConditions(null);
      setSelected([]);
      navigate(PATHS.adminCollectionConditions);
    } catch (error) {
      console.error(
        "Error occurred while adding new collection condition",
        error
      );
      swalError("Warning", error.message, () => {
        setShowModal(false);
      });
    }
  };

  const getAllCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.get(
        "/collection-condition/get-all-collection-conditions"
      );
      if (response.status === 200) {
        setCollectionConditionList(response.data);
      }
    } catch (error) {
      swalError("error", error.message, () => {
        setShowModal(false);
      });
      console.error(
        "Error occurred while getting all collection conditions",
        error
      );
    }
  };

  const handleEdit = async (row) => {
    try {
      setSelectedRow(row);
      let response = await API_WRAPPER.get(
        `/collection-condition/get-collection-condition-by-id/:${row._id}`
      );
      const data = response.data;
      setGetDataById(data);
      const selectedConditionValues = data.conditionValues
        .map((id) => {
          const condition = conditionValueList.find((item) => item._id === id);
          return condition
            ? {
                label: condition.conditionValue,
                value: condition.conditionValue,
                id: condition._id,
              }
            : null;
        })
        .filter((item) => item !== null);
      setGetDataById(data);
      setEditedRow({
        title: data.title,
        conditionValues: selectedConditionValues,
      });
      setSelected(selectedConditionValues);
    } catch (error) {
      console.log("Error in handleEdit ", error);
    }
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const handleDelete = (row) => {
    setSelectedRow(row);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addCollectionCondition();
  };

  const deleteCollectionCondition = async (e, id) => {
    try {
      const response = await API_WRAPPER.delete(
        `/collection-condition/delete-collection-condition/${id}`
      );
      if (response.status === 200) {
        setApiTrigger((prevState) => !prevState);
        success("success", "Collection Condition Deleted Successfully");
      }
    } catch (error) {
      console.log("Erorr in deleteCollectionCondition ", error);
    }
  };

  const editFormHandler = async () => {
    try {
      const response = await API_WRAPPER.put(
        `/collection-condition/update-collection-condition/:${selectedRow._id}`,
        { ...editedRow, conditionValues: selected }
      );
      success("Sucess", "Collection Conditions Edited SuccessFully!");
      navigate(PATHS.adminCollectionConditions);
      setApiTrigger((prevState) => !prevState);
    } catch (error) {
      console.log("Error in editFormHandler", error);
    }
  };

  return (
    <div className="container my-3">
      <div className="row">
        <div className="col">
          <Header
            heading="Collection Conditions"
            subheading="This is admin dashboard which added Collection Conditions here provides all the details in a very concise and user-friendly way."
            image={CollectionBannerImage}
          />
          <motion.form
            initial="initial"
            animate="animate"
            variants={fadeInVariants}
            onSubmit={handleSubmit}
            className="mt-4"
          >
            <div className="container row">
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col col-lg-6 col-md-12 col-12">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Sub Conditions
                  </label>
                  <MultiSelect
                    options={convertArr(conditionValueList)}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                  />
                  {/* {selected.length === 0 && ( 
                    <span style={{ color: "red" }}>
                      Please select at least one condition value.
                    </span>
                  )} */}
                </div>
              </div>
              <button className="btn btn-primary w-50 mt-4 text-white">
                Add Title
              </button>
            </div>

            <div className="mt-4 border d-flex flex-column">
              <ReusableTable
                tableTitle="Collection Condition List"
                columns={columns}
                data={data}
                showButtons
                enableDelete
                enableEdit
                onEdit={handleEdit}
                enablePagination
                pageSize={10}
                tableType="Condition"
                buttonType="true"
                onDelete={handleDelete}
              />

              {/* Edit */}
              <div
                class="modal fade"
                id="updateCondition"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit Collection Condition
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
                          <div className="col col-lg-12 col-md-12 col-12">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                onChange={(e) => handleEditChange(e)}
                                defaultValue={getDataById?.title}
                              />
                            </div>
                          </div>
                          <div className="col col-lg-12 col-md-12 col-12">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                              >
                                Sub Conditions
                              </label>
                              <MultiSelect
                                options={editConvertArr(conditionValueList)}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                              />
                            </div>
                          </div>
                          <div className="col col-lg-12 col-md-12 col-12">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Status
                            </label>
                            <select
                              onChange={(e) => handleEditChange(e)}
                              defaultValue={getDataById?.status}
                              className="form-control"
                              name="status"
                              id=""
                            >
                              <option value="ACTIVE">ACTIVE</option>
                              <option value="DEACTIVE">DEACTIVE</option>
                              <option value="PENDING">PENDING</option>
                            </select>
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
                        onClick={(e) => {
                          editFormHandler(e);
                        }}
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
                id="deleteCondition"
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
                        Do you realy want to delete this Condition?
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
                        onClick={(e) =>
                          deleteCollectionCondition(e, selectedRow?._id)
                        }
                        data-bs-dismiss="modal"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
export default CollectionConditions;
