import express from "express";
import { getAllUsers } from "../controllers/adminControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/all-users", protect, getAllUsers);

export default router;
