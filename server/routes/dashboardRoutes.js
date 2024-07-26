import express from 'express';
import authMiddleware from '../middlewares/index.js';
const dashBoardRouter = express.Router();
import { fetchDashboardCardsData } from '../controller/dashboardController.js';
dashBoardRouter.get(
  "/dashboard/cards",
  authMiddleware(["vendor", "admin", "customer"]),
  fetchDashboardCardsData
);
export default dashBoardRouter;
