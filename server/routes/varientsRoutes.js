import express from "express";
import authMiddleware from "../middlewares/index.js";
import {
  createVarient,
  updateVarient,
  getAllVarientById,
  insertVarient,
  deleteVarient,
  getAllVarients,
  getVarientsBasedOnPid,
} from "../controller/varientsController.js";
const varientsRouter = express.Router();

varientsRouter.post(
  "/varients/add-varients2",
  authMiddleware(["vendor", "admin", "customer"]),
  createVarient
);

varientsRouter.post(
  "/varients/update-varients/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateVarient
);

varientsRouter.get(
  "/varients/getAll-varients",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllVarients
);
varientsRouter.get(
  "/varients/getParticular-varients/:pid",
  authMiddleware(["vendor", "admin", "customer"]),
  getVarientsBasedOnPid
);
// "/variants/:pid", getAllVarients;

// varientsRouter.put(
//   "/varients/update-varients2/:id",
//   authMiddleware(["vendor", "admin", "customer"]),
//   updateVarient2
// );


varientsRouter.post("/varients/insert/:pid", insertVarient);

// Route for deleting a varient
varientsRouter.delete("/varients/delete/:pid", deleteVarient);

varientsRouter.get(
  "/varients/getAll-varientsTabs/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllVarientById
);     
export default varientsRouter;
