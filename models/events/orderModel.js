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
    user: Object,
    orderDetails:[Object],
    total: Object

  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model("Order", orderSchema);
export default Order;
