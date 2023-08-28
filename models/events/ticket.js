import mongoose from "mongoose";
const schema = mongoose.Schema;

const ticketSchema = new schema(
  {},
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
