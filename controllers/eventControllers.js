import Event from "../models/events/eventModel.js";

const createEvent = async (req, res) => {
  try {
    const id = req.user.id;
    const { event_info, event_location, event_schedule } = req.body;
    const { title, organizer, type, category, desc, tags } = event_info;
    const { venue, online, later_date } = event_location;
    const { isRecurring, start_date, end_date } = event_schedule;
    if (!event_info || !event_location || !event_schedule) {
      res.status(400);
      throw new Error(
        " event_info, event_location and event_schedule objects are required"
      );
    } else {
      const newEvent = new Event({
        created_by: id,
        event_info: {
          title,
          organizer,
          type,
          category,
          desc,
          tags,
        },
        event_location: {
          venue: venue || "nil",
          online: {
            status: online.status || false,
            link: online.link,
          },
          later_date,
        },
        event_schedule: {
          isRecurring: isRecurring || false,
          start_date: start_date || Date.now(),
          end_date: end_date || Date.now() + 86400000,
        },
      });
      newEvent.save();
      res.status(200).json({
        status: "success",
        msg: "new event created",
        data: newEvent,
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
