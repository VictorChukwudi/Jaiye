import express from "express";
import { createEvent } from "../controllers/eventControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import validator from "../middlewares/validators.js";
const router = express.Router();

// router.get("/",allEvents);
// router.route("/:id")
// .get(getEvent)
// .delete(deleteEvent)
router.post("/create", protect, validator.event, createEvent);
export default router;
