import express from "express";
import authMiddleware from "../middlewares/index.js";
const menuRoutes = express.Router();
import {
  createMenu,
  getMenu,
  createMainMenu,
  getMainMenus,
  editMainMenu,
  getMainMenuData,
  createSubMenu,
  getSubMenus,
  editSubMenu,
  getSubMenuById,
  deleteMainMenu,
  deleteSubMenu,
  getTitleId,
  createChildMenu,
  getChildMenus,
  getChildMenuById,
  editChildMenu,
  deleteChildMenu,
  updateMainMenuOrder,
  fatchOrdersNo,
  updateSubMenuOrder,
  fatchSubOrdersNo,
  getNavbarData,
} from "../controller/menuController.js";

menuRoutes.post(
  "/menu/create",
  authMiddleware(["vendor", "admin", "customer"]),
  createMenu
);

menuRoutes.get(
  "/menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getMenu
);

menuRoutes.post("/main-menu/create", authMiddleware(["admin"]), createMainMenu);
menuRoutes.get(
  "/main-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getMainMenus
);
menuRoutes.get("/main-menu/:id", authMiddleware(["admin"]), getMainMenuData);
menuRoutes.put(
  "/main-menu/edit/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  editMainMenu
);
menuRoutes.delete(
  "/main-menu-delete/:id",
  authMiddleware(["admin"]),
  deleteMainMenu
);

menuRoutes.put(
  "/main-menu/order-update/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateMainMenuOrder
);

menuRoutes.get(
  "/main-menu-order-numbers",
  authMiddleware(["vendor", "admin", "customer"]),
  fatchOrdersNo
);

menuRoutes.post("/sub-menu/create", authMiddleware(["admin"]), createSubMenu);
menuRoutes.get(
  "/sub-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getSubMenus
);
menuRoutes.put(
  "/sub-menu-edit/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  editSubMenu
);
menuRoutes.get(
  "/sub-menu-get-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getSubMenuById
);
menuRoutes.delete(
  "/sub-menu-delete/:id",
  authMiddleware(["admin"]),
  deleteSubMenu
);
menuRoutes.get("/sub-menu-title-id/:id", authMiddleware(["admin"]), getTitleId);

menuRoutes.post(
  "/child-menu/create",
  authMiddleware(["admin"]),
  createChildMenu
);
menuRoutes.get(
  "/child-menu-dataGet",
  authMiddleware(["vendor", "admin", "customer"]),
  getChildMenus
);
menuRoutes.get(
  "/child-menu-get-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getChildMenuById
);
menuRoutes.put(
  "/child-menu-edit/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  editChildMenu
);
menuRoutes.delete(
  "/child-menu-delete/:id",
  authMiddleware(["admin"]),
  deleteChildMenu
);

menuRoutes.put(
  "/sub-menu/order-update/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateSubMenuOrder
);

menuRoutes.get(
  "/sub-menu-order-numbers",
  authMiddleware(["vendor", "admin", "customer"]),
  fatchSubOrdersNo
);

menuRoutes.get("/getNavbarMenu", getNavbarData);
export default menuRoutes;
