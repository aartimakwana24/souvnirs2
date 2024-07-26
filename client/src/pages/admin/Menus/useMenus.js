import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import success from "../../../utils";

const useMenus = (titleExists) => {
  const [menuData, setMenuData] = useState([]);
  const [menuToBeEdited, setmenuToBeEdited] = useState({});
  const [subMenuData, setSubMenuData] = useState([]);
  const [childMenuData, setChildMenuData] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedMenu, setEditedMenu] = useState({});
  const [selectedRow, setSelectedRow] = useState();

  const navigate = useNavigate();
  const fetchMenuData = async () => {
    try {
      const response = await API_WRAPPER.get("/main-menu");
      if (response && response.data) {
        setMenuData(response.data);
      }
    } catch (error) {
      console.log("Error in fetchMenuData", error);
    }
  };

  const extractedMenuData = useMemo(() => {
    return menuData.map((element) => ({
      id: element._id,
      title: element.title,
      status: element.status,
      menuId: element.menuId._id,
    }));
  }, [menuData]);

  const handleDelete = async () => {
    const response = await API_WRAPPER.delete(
      `/main-menu-delete/${selectedRow.id}`
    );
    success("Success", "Main menu and related sub menus deleted successfully");
    setApiTrigger((prevState) => !prevState);
  };

  const handleEditModal = (rowToBeEdited) => {
    const { id } = rowToBeEdited;
    navigate(`${PATHS.adminEditMenus}/${id}`, {
      state: { titleExists },
    });
  };

  const handleEditMenu = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.put(
      `/main-menu/${menuToBeEdited.id}`,
      editedMenu
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetchMenuData(),
      ]);
    }
    fetchData();
  }, [apiTrigger]);
  return {
    handleDelete,
    handleEditMenu,
    handleEditModal,
    extractedMenuData,
    subMenuData,
    setEditedMenu,
    setSelectedRow,
    childMenuData,
    selectedRow,
    menuData,
    menuToBeEdited,
  };
};

export default useMenus;
