import mongoose from "mongoose";
const schema = mongoose.Schema;

const eventSchema = new schema(
  {},
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
