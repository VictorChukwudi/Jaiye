import mongoose from "mongoose";
const schema = mongoose.Schema;

const eventSchema = new schema(
  {
    created_by: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    organizer: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: Array, required: true },
    venue: { type: String, default: "nil" }, //venue is optional
    isOnline: { type: Boolean, default: false }, //optional
    url_link: { type: String, default: "nil" }, //optional
    hasLaterDate: { type: Boolean, default: false }, //optional
    isRecurring: { type: Boolean, default: false }, //optional
    start_date: { type: Date, default: Date.now() }, //optional
    end_date: { type: Date, default: Date.now() + 86400000 }, //optional
    ticket: { type: String, enum: ["free", "paid"], default: "free" },
    img_details: { type: Array },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
