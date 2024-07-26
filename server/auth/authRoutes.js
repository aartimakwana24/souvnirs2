import express from 'express';
import { registerVendor, registerCustomer ,loginUser } from "./authController.js";
const router = express.Router();
router.post("/auth/register/vendor", registerVendor);
router.post("/auth/register/customer", registerCustomer);
router.post("/auth/login", loginUser);

export default router;