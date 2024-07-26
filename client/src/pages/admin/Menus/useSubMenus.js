import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import success from "../../../utils";

const useMenus = (row) => {
  const [menuData, setMenuData] = useState([]);
  const [menuToBeEdited, setmenuToBeEdited] = useState({});
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedMenu, setEditedMenu] = useState({});
  const [selectedRow, setSelectedRow] = useState();
  const navigate = useNavigate();

  const fetchSubmenuData = async () => {
    try {
      const response = await API_WRAPPER.get("/sub-menu");
      setSubMenuData(response.data);
    } catch (error) {
      console.log("Error in fetchSubmenuData ", error);
    }
  };

    const fetchChildmenuData = async () => {
     try {
       const response = await API_WRAPPER.get("/child-menu-dataGet");
       setChildMenuData(response.data);
     } catch (error) {
      console.log("Error in fetchChildmenuData ",error);
     }
    };

  const extractedMenuData = useMemo(() => {
    return subMenuData.map((element) => ({
      id: element._id,
      title: element.title,
      status: element.status,
      mainMenuId: element.mainMenuId,
    }));
  }, [subMenuData]);

  const handleDelete = async () => {
    const response = await API_WRAPPER.delete(
      `/sub-menu-delete/${selectedRow.id}`
    );
    setApiTrigger((prevState) => !prevState);
    success("Success", "Sub menu deleted successfully!");
  };

  const handleEditModal = (rowToBeEdited) => {
    const { id } = rowToBeEdited;
    navigate(`${PATHS.adminEditSubMenus}/${id}`, {
      state: { row },
    });
  };


  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetchSubmenuData(),
        fetchChildmenuData(),
      ]);
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
  };
};

export default useMenus;
