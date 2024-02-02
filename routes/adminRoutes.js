import express from "express";
import { deleteUserByEmail, deleteUserById, getAllUsers, makeAdmin } from "../controllers/adminControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import { adminMiddie } from "../middlewares/adminAccessMiddleware.js";
const router = express.Router();

router.post("/make-admin", makeAdmin)
router.get("/users",  getAllUsers);
router.delete("/users/delete", deleteUserByEmail);
router.delete("/users/delete/:id", deleteUserById);

export default router;
