import mongoose from "mongoose";
const schema = mongoose.Schema;

const orderSchema = new schema(
  {
    eventID:{
      type:schema.Types.ObjectId,
      required:true,
      ref:"Event",
      unique:true
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
    ticketsInfo:[Object],
    minDailySales:Number,
    maxDailySales:Number,
    salesChannel:[String]

  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
