import mongoose from "mongoose"
import { validationResult } from "express-validator";
import Ticket from "../models/events/ticketModel.js";
import Event from "../models/events/eventModel.js";
import Order from "../models/events/orderModel.js"
import { CREATED, NOTFOUND, OK, BADREQUEST, NOCONTENT } from "../utils/statusCodes.js";


const orderCheckout= async(req, res)=>{
    try {
        const {eventID, user, orderDetails, total}= req.body
        const event= await Event.findById(eventID)
        const ticketDetails= await Ticket.findOne({eventID})

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(BADREQUEST).json(errors.array());
        }else{
            if(!event || !ticketDetails){
                res.status(400)
                throw new Error("Cannot proceed to checkout. Event and ticket not found.")
            }else{
                // const checkout= new Order({
                //     eventID,
                //     eventStatus,
                //     eventName,
                //     orderDetails,
                //     total
                // }).save()
    
                res.status(200).json(req.body)
            }
        }
    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
}

export {
    orderCheckout
}