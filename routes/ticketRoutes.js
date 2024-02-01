import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addTicketDetails, editTicketDetails, deleteTicketDetails } from "../controllers/ticketContollers.js";
const router = express.Router();


router.post("/", protect, addTicketDetails)
router.patch("/:id", protect, editTicketDetails)
router.delete("/:id", protect, deleteTicketDetails)

export default router;
