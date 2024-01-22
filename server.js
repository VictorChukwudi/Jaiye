//https://tickeneft.onrender.com
import express from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";
import { adminMiddie } from "./middlewares/adminAccessMiddleware.js";

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
app.use("/api/events", eventRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/admin", protect, adminMiddie, adminRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`.underline.italic);
});
