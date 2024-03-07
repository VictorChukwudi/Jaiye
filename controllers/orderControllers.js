import mongoose from "mongoose"
import Ticket from "../models/events/ticketModel.js";
import Event from "../models/events/eventModel.js";
import { CREATED, NOTFOUND, OK, BADREQUEST, NOCONTENT } from "../utils/statusCodes.js";


const orderCheckout= async(req, res)=>{
    try {
        const {eventID, eventStatus, eventName, orderDetails, total}= req.body
    } catch (error) {
        
    }
}