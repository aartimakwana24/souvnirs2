import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import success from "../../../utils";

const useChildMenus = (row) => {
  const [menuData, setMenuData] = useState([]);
  const [menuToBeEdited, setmenuToBeEdited] = useState({});
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedMenu, setEditedMenu] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const [titleId, setTitleId] = useState();
  const navigate = useNavigate();

  const fetchChildmenuData = async () => {
    try {
      const response = await API_WRAPPER.get("/child-menu-dataGet");
      setChildMenuData(response.data);
    } catch (error) {
      console.log("Error in fetchChildmenuData ", error);
    }
  };

  const extractedMenuData = useMemo(() => {
    if (childMenuData && childMenuData.length > 0) {
      return childMenuData.map((element) => ({
        id: element._id,
        title: element.title,
        status: element.status,
        subMenuId: element.subMenuId,
      }));
    }
  }, [childMenuData]);
  const handleDelete = async () => {
    const response = await API_WRAPPER.delete(
      `/child-menu-delete/${selectedRow.id}`
    );
    setApiTrigger((prevState) => !prevState);
    success("Success", "Child menu deleted successfully!");
  };

  const handleEditModal = (rowToBeEdited) => {
    const { id } = rowToBeEdited;
    navigate(`${PATHS.adminEditChildMenus}/${id}`, {
      state: { row },
    });
  };

  const fatchTitleId = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/sub-menu-title-id/${row.mainMenuId}`
      );
      setTitleId(response.data);
    } catch (error) {
      console.log("Error in fatchTitleId ", error);
    }
  };
  useEffect(() => {
    fatchTitleId();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([fetchChildmenuData()]);
    }
    fetchData();
  }, [apiTrigger]);

  return {
    handleDelete,
    handleEditModal,
    extractedMenuData,
    setEditedMenu,
    setSelectedRow,
    childMenuData,
    selectedRow,
    menuToBeEdited,
    titleId,
  };
};

export default useChildMenus;
