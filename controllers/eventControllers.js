import Event from "../models/events/eventModel.js";
import { validationResult } from "express-validator";
import { fileUpload } from "../config/cloudinary.js";
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
    const images = req.files;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
    } else {
      if (images.length <= 0) {
        res.status(400);
        throw new Error(
          "An event image is required. Any other 3 images can be added."
        );
      } else {
        const uploader = await fileUpload(images);
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
          img_details: uploader,
        }).save();
        res.status(201).json({
          status: "success",
          msg: "event created",
          data: event,
        });
      }
    }
  } catch (error) {
    res.json({
      status: "error",
      msg: error.message,
    });
  }
};

export { createEvent };
