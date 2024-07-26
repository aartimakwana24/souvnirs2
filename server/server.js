import express from 'express';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import connect from './db/db.js';
import router from './auth/authRoutes.js';
import dashBoardRouter from './routes/dashboardRoutes.js';
import vendorRoutes from './routes/vendorRoutes.js';
import attributeRouter from './routes/attributeRoutes.js';
import categoriesRouter from './routes/categoryRoutes.js';
import productRouter from './routes/productRoutes.js';
import varientsRouter from './routes/varientsRoutes.js';
import varientsDetailsRoutes from './routes/varientsDetailsRoutes.js';
import conditionValueRouter from "./routes/conditionValueRoutes.js"; 
import collection from './routes/collectionRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "middlewares", "uploads"))
);

app.use("/",router);
app.use(dashBoardRouter);
app.use(vendorRoutes);
app.use(attributeRouter);
app.use(categoriesRouter);
app.use(productRouter);
app.use(varientsRouter);
app.use(varientsDetailsRoutes);
app.use(conditionValueRouter);
app.use(collection);
app.use(menuRoutes);

connect();
app.listen(3001,()=>{
    console.log("Server started");
});

