import express from "express";
import { createEvent } from "../controllers/eventControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.get("/",allEvents);
// router.route("/:id")
// .get(getEvent)
// .delete(deleteEvent)
router.post("/create", protect, createEvent);
export default router;
