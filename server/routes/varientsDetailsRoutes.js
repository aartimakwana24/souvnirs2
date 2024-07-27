import express from "express";
import authMiddleware from "../middlewares/index.js";
import {
  varientsDetailsController,
  checkVarientController,
  updateVarientController,
  getAllPersonalizedData,
} from "../controller/varientsDetailsController.js";
import { upload } from "../middlewares/ImageUpload.js";
const varientsDetailsRoutes = express.Router();

varientsDetailsRoutes.post(
  "/productsDetails/create-varients",
  authMiddleware(["vendor", "admin", "customer"]),
  upload,
  varientsDetailsController
);

varientsDetailsRoutes.get(
  "/productsDetails/check-varient/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  checkVarientController
);
varientsDetailsRoutes.put(
  "/productsDetails/update-varients/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  upload,
  updateVarientController
);
varientsDetailsRoutes.get(
  "/productsDetails/get-all-personalized",
  getAllPersonalizedData
);
export default varientsDetailsRoutes;
