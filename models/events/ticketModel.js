import mongoose from "mongoose";
const schema = mongoose.Schema;

const ticketSchema = new schema(
  {
    eventID:{
      type:schema.Types.ObjectId,
      required:true,
      ref:"Event"
    },
    eventStatus:{
      type:String,
      enum:["paid","free"],
      default:"free",
      lowercase: true
    },
    eventName:{
      type:String,
      required:true,
      trim:true
    },
    ticketQuantity:{
      type:Number,
      required:true
    },
    ticketTypeAndPrice:[Object],
    minDailySales:Number,
    maxDailySales:Number,
    salesChannel:[String]

  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
