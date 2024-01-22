import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { addTicketDetails, editTicketDetails } from "../controllers/ticketContollers.js";
const router = express.Router();

router.route("/")
    .post(protect, addTicketDetails)
    .patch(protect, editTicketDetails)

export default router;
