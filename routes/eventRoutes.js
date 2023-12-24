import express from "express";
import { createEvent, deleteEvent, getEvents, getSingleEvent } from "../controllers/eventControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import checkUpload from "../middlewares/multerError.js";
import validator from "../middlewares/validators.js";
const router = express.Router();

// router.get("/",allEvents);
// router.route("/:id")
// .get(getEvent)
// .delete(deleteEvent)
router.post("/create", protect, checkUpload, validator.event, createEvent);
router.get("/", protect, getEvents)
router.get("/myEvents/:id", getSingleEvent)
router.delete("/myEvents/:id", protect, deleteEvent)
export default router;
