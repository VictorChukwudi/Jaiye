import express from "express";
import { getAllUsers } from "../controllers/adminControllers.js";
import { admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/all-users", admin, getAllUsers);

export default router;
