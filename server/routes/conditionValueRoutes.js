import express from "express";
import authMiddleware from "../middlewares/index.js";
const conditionValueRouter = express.Router();
import {
  getAllConditionValues,
  createCollectionCondition,
  getAllCollectionConditions,
  deleteCollectionCondition,
  updateCollectionConditionById,
  getCollectionConditionById,
} from "../controller/conditionValueController.js";

conditionValueRouter.get(
  "/condition-value/get-all-condition-values",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllConditionValues
);

conditionValueRouter.get(
  "/collection-condition/get-all-collection-conditions",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCollectionConditions
);


conditionValueRouter.post(
  "/collection-condition/create-collection-condition",
  authMiddleware(["vendor", "admin", "customer"]),
  createCollectionCondition
);

conditionValueRouter.put(
  "/collection-condition/update-collection-condition/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCollectionConditionById
);

conditionValueRouter.get(
  "/collection-condition/get-collection-condition-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCollectionConditionById
);

conditionValueRouter.delete(
  "/collection-condition/delete-collection-condition/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCollectionCondition
);

export default conditionValueRouter;
