import express from "express";
import authMiddleware from "../middlewares/index.js";
const vendorRoutes = express.Router();
import { getVendors } from "../controller/vendorController.js";
vendorRoutes.get(
  "/vendors/get-vendors",
  authMiddleware(["vendor", "admin", "customer"]),
  getVendors
);
export default vendorRoutes;
