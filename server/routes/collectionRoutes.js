import express from "express";
import authMiddleware from "../middlewares/index.js";
const collection = express.Router();
import {
  getRawDataForFilter,
  createCollection,
  getAllCollections,
  deleteCollectionById,
  getCollectionById,
  updateCollection,
} from "../controller/collectionController.js";
collection.post(
  "/collection/filter-data",
  authMiddleware(["vendor", "admin", "customer"]),
  getRawDataForFilter
);
collection.post(
  "/collection/create-collection",
  authMiddleware(["vendor", "admin", "customer"]),
  createCollection
);
collection.get(
  "/collection/get-all-collections",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCollections
);

collection.delete(
  "/collection/delete-collection-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCollectionById
);

collection.get(
  "/collection/get-collection-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCollectionById
);

collection.put("/collection/update-collection/:id", updateCollection);
export default collection;
