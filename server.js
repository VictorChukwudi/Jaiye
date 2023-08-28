import express, { urlencoded } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import swaggerOptions from "./config/docs.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//swagger documentation setup
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//database connection
connectDB();

//morgan route logger
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.listen(port, () => {
  console.log(`Server running at port ${port}`.underline.italic);
});
