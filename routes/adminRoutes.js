import express from "express";
import { deleteUserByEmail, deleteUserById, getAllUsers } from "../controllers/adminControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminMiddie } from "../middlewares/adminAccessMiddleware.js";
const router = express.Router();

router.get("/all-users",  getAllUsers);
router.delete("/delete", deleteUserByEmail);
router.delete("/delete/:id", deleteUserById);

export default router;
