import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { orderCheckout } from "../controllers/orderControllers.js";
import validator from "../middlewares/validators.js";
const router = express.Router();


// router.post("/", protect, addTicketDetails)
// router.patch("/:id", protect, editTicketDetails)
// router.delete("/:id", deleteTicketDetails)

router.post("/", validator.checkout, orderCheckout)

export default router;
