import express from "express";
import authMiddleware from "../middlewares/index.js";
const categoriesRouter = express.Router();
import {
  addCategoryController,
  getParentCategories,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
  updateParentCategory,
  getCategoryBySlug,
} from "../controller/categoryController.js";
categoriesRouter.post("/category/add-category",addCategoryController);
categoriesRouter.get(
  "/category/parent/",
  authMiddleware(["admin"]), 
  getParentCategories
);
categoriesRouter.get(
  "/category/parent/:id",
  authMiddleware(["admin"]),
  updateParentCategory
);
categoriesRouter.get(
  "/category/get-all-categories",
  // authMiddleware(["admin"]),
  getAllCategories
);

categoriesRouter.put(
  "/category/update-category/:id",
  authMiddleware(["admin"]),
  updateCategory
);

categoriesRouter.delete(
  "/category/delete-category/:id",
  authMiddleware(["admin"]),
  deleteCategory
);

categoriesRouter.get(
  "/category/get-category/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCategoryById
);
categoriesRouter.get("/category/:slug",getCategoryBySlug);
export default categoriesRouter;