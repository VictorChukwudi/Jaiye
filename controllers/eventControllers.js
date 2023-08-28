import Event from "../models/events/eventModel.js";
import { validationResult } from "express-validator";
const createEvent = async (req, res) => {
  try {
    const {
      title,
      organizer,
      type,
      category,
      desc,
      tags,
      venue,
      isOnline,
      url_link,
      hasLaterDate,
      isRecurring,
      start_date,
      end_date,
    } = req.body;
    const id = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      const event = await new Event({
        created_by: id,
        title,
        organizer,
        type,
        category,
        desc,
        tags,
        venue,
        isOnline,
        url_link,
        hasLaterDate,
        isRecurring,
        start_date,
        end_date,
      }).save();
      res.status(201).json({
        status: "success",
        msg: "event created",
        data: event,
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

export { createEvent };
