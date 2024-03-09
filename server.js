//https://tickeneft.onrender.com
import express, { application } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet"
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js"
import { protect } from "./middlewares/authMiddleware.js";
import { adminMiddie } from "./middlewares/adminAccessMiddleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
export const protocol = process.env.NODE_ENV == "development" ? "http" : "https";
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
app.use("/api/tickets", ticketRoutes);
app.use("/api/checkout", checkoutRoutes)
app.use("/api/admin", protect, adminMiddie, adminRoutes);

app.listen(port, () => {
  console.log(`Server running at port ${port}`.underline.italic);
});


//65e97c5e5c64e4db0acc57b2 - eventID with just one ticket type
//65e979bb778d40a0c14ee224 - eventID with three ticket types