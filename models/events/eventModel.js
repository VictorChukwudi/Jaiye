import mongoose from "mongoose";
const schema = mongoose.Schema;

const eventSchema = new schema(
  {
    created_by: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    event_info: {
      type: schema.Types.Object,
      required: true,
      properties: {
        title: { type: String },
        organizer: { type: String },
        type: { type: String },
        category: { type: String },
        desc: { type: String },
        tags: { type: Array },
      },
    },
    event_location: {
      type: schema.Types.Object,
      required: true,
      properties: {
        venue: { type: String },
        online: {
          type: schema.Types.Object,
          properties: {
            status: { type: Boolean },
            link: { type: String },
          },
        },
        later_date: { type: Boolean },
      },
    },
    event_schedule: {
      type: schema.Types.Object,
      required: true,
      properties: {
        isRecurring: { type: Boolean },
        start_date: { type: Date },
        end_date: { type: Date },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
