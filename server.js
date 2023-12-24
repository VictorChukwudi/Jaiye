//https://tickeneft.onrender.com
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//database connection
connectDB();

//morgan route logger
app.use(logger("dev"));

//cors setup
app.use(
  cors({
    origin: "*",
  })
);
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.listen(port, () => {
  console.log(`Server running at port ${port}`.underline.italic);
});
