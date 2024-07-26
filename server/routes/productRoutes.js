import express from "express";
import authMiddleware from "../middlewares/index.js";
import {
  createProduct,
  getProducts,
  getProductVariants,
  // updateProduct,
  deleteProduct,
  getVarients2,
  getProductVariants2,
  updateProduct2,
} from "../controller/productController.js";
const productRouter = express.Router();
productRouter.post("/products/add-product",authMiddleware(["vendor", "admin", "customer"]),createProduct);
productRouter.get( "/products/get-all-products", getProducts);
productRouter.get(
  "/products/get-all-products2",
  authMiddleware(["vendor", "admin", "customer"]),
  getVarients2
);

// productRouter.put(
//   "/product/update/:id",
//   authMiddleware(["vendor", "admin", "customer"]),
//   updateProduct
// );
productRouter.delete(
  "/products/delete-product/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteProduct
);

// -----------------------------------------------------------

productRouter.get(
  "/product/variants2/:productId",
  authMiddleware(["vendor", "admin", "customer"]),
  getProductVariants2
);

productRouter.put(
  "/product/update2/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateProduct2
);
export default productRouter;
