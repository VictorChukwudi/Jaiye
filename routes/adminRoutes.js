import express from "express";
import { getAllUsers } from "../controllers/adminControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/all-users", protect, admin, getAllUsers);

export default router;
