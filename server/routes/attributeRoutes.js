import express from "express";
import authMiddleware from "../middlewares/index.js";
const attributeRouter = express.Router();
import {
  addAttribute,
  getAllAttributes,
  updateAttributeById,
  deleteAttributeById,
  getattributesbyCategoryId,
  addAttributeValue,
} from "../controller/attributeController.js";

attributeRouter.post(
  "/attribute/add-attribute",
  authMiddleware(["admin"]),
  addAttribute
);
attributeRouter.get(
  "/attribute/get-all-attributes",
  authMiddleware(["vendor", "admin"]),
  getAllAttributes
);
attributeRouter.put(
  "/attribute/update-attribute/:id",
  authMiddleware(["admin"]),
  updateAttributeById
);

attributeRouter.delete(
  "/attribute/delete-attribute/:id",
  authMiddleware(["admin"]),
  deleteAttributeById
);

attributeRouter.get(
  "/attribute/get-all-attributes/:id",
  authMiddleware(["vendor", "admin"]),
  getattributesbyCategoryId
);

attributeRouter.post(
  "/attribute/add-attributeValue",
  authMiddleware(["vendor", "admin"]),
  addAttributeValue
);

export default attributeRouter;