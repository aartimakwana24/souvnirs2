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
  getCollectionBySlug,
} from "../controller/collectionController.js";
collection.post(
  "/collection/filter-data",
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

collection.get("/collection/:slug", getCollectionBySlug);
collection.get("/category/:slug");
export default collection;
