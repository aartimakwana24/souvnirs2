import { nanoid } from "nanoid";
import { PATHS } from "./paths";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard.js";
import ProductManagement from "../pages/admin/ProductManagement/ProductManagement.js";
import VendorDashboard from "../pages/vendor/Dashboard/VendorDashboard.js";
import AddProduct from "../pages/admin/ProductManagement/AddProduct.js";
import AddAttributes from "../pages/admin/AddAttributes/AddAttributes.js";
import Attributes from "../pages/admin/AttributesPage/Attribute.js";
import AddCategory from "../pages/admin/AddCategory/AddCategory.js";
import Categories from "../pages/admin/Categories/Categories.js";
import EditCategory from "../pages/EditCategory.js";
import EditProduct from "../pages/admin/Dashboard/EditProduct.js";
import AddVarients from "../pages/admin/AddVarients/index.js";
import EditVarients from "../pages/admin/Dashboard/EditProductVarient.js";
import CollectionConditions from "../pages/admin/CollectionConditions.js";
import Collection from "../pages/admin/Collection.js";
import AddCollection from "../pages/admin/AddCollection.js";
import EditCollection from "../pages/admin/EditCollection.js";
import Menus from "../pages/admin/Menus/Menus.js";
import AddMenus from "../pages/admin/AddMenus/AddMenus.js";
import AddMainMenus from "../pages/admin/AddMainMenus.js";
import EditMainMenus from "../pages/admin/EditMainMenus.js";
import AddSubMenus from "../pages/admin/AddSubMenus.js";
import SubMenus from "../pages/admin/Menus/SubMenus.js";
import EditSubMenus from "../pages/admin/EditSubMenus.js";
import ChildMenus from "../pages/admin/Menus/ChildMenus.js";
import AddChildMenus from "../pages/admin/AddChildMenus.js";
import EditChildMenus from "../pages/admin/EditChildMenus.js";
import LandingPage from "../pages/shop/LandingPage.js";

export const adminRoutes = [
  // {
  //   id: nanoid(),
  //   path: PATHS.adminCart,
  //   defaultRole: "admin",
  //   Component: Cart,
  // },
  {
    id: nanoid(),
    path: PATHS.adminDashboard,
    defaultRole: "admin",
    Component: AdminDashboard,
  },
  {
    id: nanoid(),
    path: PATHS.adminProductManagement,
    defaultRole: "admin",
    Component: ProductManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddProducts,
    defaultRole: "admin",
    Component: AddProduct,
  },
  {
    id: nanoid(),
    path: PATHS.adminAttribute,
    defaultRole: "admin",
    Component: Attributes,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddAttributes,
    defaultRole: "admin",
    Component: AddAttributes,
  },
  {
    id: nanoid(),
    path: PATHS.adminCategories,
    defaultRole: "admin",
    Component: Categories,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCategory,
    defaultRole: "admin",
    Component: AddCategory,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCategory}/:id`,
    defaultRole: "admin",
    Component: EditCategory,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCategory}/:id`,
    defaultRole: "admin",
    Component: EditCategory,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditProduct}/:id`,
    defaultRole: "admin",
    Component: EditProduct,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddVariant,
    defaultRole: "admin",
    Component: AddVarients,
  },
  {
    id: nanoid(),
    path: `${PATHS.adminEditVariant}/:id/:pid`,
    defaultRole: "admin",
    Component: EditVarients,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollectionConditions,
    defaultRole: "admin",
    Component: CollectionConditions,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollection,
    defaultRole: "admin",
    Component: Collection,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCollection,
    defaultRole: "admin",
    Component: AddCollection,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCollection}/:id`,
    defaultRole: "admin",
    Component: EditCollection,
  },
  {
    id: nanoid(),
    path: PATHS.adminMenus,
    Component: Menus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddMenus,
    Component: AddMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddMainMenus,
    Component: AddMainMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: `${PATHS.adminEditMenus}/:id`,
    defaultRole: "admin",
    Component: EditMainMenus,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddSubMenus,
    Component: AddSubMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminSubMenus,
    Component: SubMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: `${PATHS.adminEditSubMenus}/:id`,
    Component: EditSubMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminChildMenus,
    Component: ChildMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddChildMenus,
    Component: AddChildMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path:`${PATHS.adminEditChildMenus}/:id`,
    Component: EditChildMenus,
    defaultRole: "admin",
  },
];

export const vendorRoutes = [
  {
    id: nanoid(),
    path: PATHS.vendorDashboard,
    defaultRole: "vendor",
    Component: VendorDashboard,
  },
];

export const customerRoutes = [
  {
    id: nanoid(),
    path: PATHS.customerDashboard,
    // Component: CustomerDashboard,
    defaultRole: "customer",
  },
];

export const shopRoutes = [
  {
    id: nanoid(),
    path: PATHS.landingPage,
    Component: LandingPage,
  },
];
