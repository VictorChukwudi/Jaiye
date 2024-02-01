import Ticket from "../models/events/ticketModel.js";
import Event from "../models/events/eventModel.js";
import mongoose from "mongoose"
import { CREATED, NOTFOUND, OK, BADREQUEST, NOCONTENT } from "../utils/statusCodes.js";
import { adminControl } from "../utils/access/adminAccess.js";

const addTicketDetails=async(req,res)=>{
    try {
      const {eventID, eventStatus, eventName,
        ticketQuantity, ticketsInfo, 
        minDailySales, maxDailySales, salesChannel} = req.body
  
        const event= await Event.findById(eventID);
        if(!event){
          res.status(NOTFOUND)
          throw new Error(`Event with ID:
          ${eventID} not found and cannot create ticket details.`);
        }else{
      
          const ticket = await Ticket.findOne({eventID})
        console.log(ticket)
          if(ticket){
            res.status(BADREQUEST)
            throw new Error(`Ticket details for event with ID: ${eventID} has already been created and can only be edited or deleted.`)
          }else{
            const eventTicketDetails= new Ticket({
              eventID,    //ObjectID
              eventStatus,    //String - free or paid
              eventName,  //String - could be same as event title
              ticketQuantity, //Number
              ticketsInfo, // Array of Objects with attributes of type, price and quantity left
              minDailySales,
              maxDailySales,
              salesChannel    //Array of Strings
            }).save()
    
            res.status(CREATED).json({
              status:"success",
              msg:`Ticket details for event with ID: ${eventID} has been created.`,
              data: await Ticket.findOne({eventID})
            })
          }
        }
    } catch (error) {
      res.json({
        status:"error",
        msg:error.message
      })
    }
  }

  const editTicketDetails= async(req,res)=>{
    try {
        const eventID = req.params.ID;
        const {eventStatus, eventName,
            ticketQuantity, ticketsInfo, 
            minDailySales, maxDailySales, salesChannel} = req.body
            
        const TicketDetails= await Ticket.findById(eventID);
        if(!TicketDetails){
            res.status(NOTFOUND)
            throw new Error(`Ticket details for event with ID: ${eventID} not found.`);
        }else{
            const updatedDetails={
                eventStatus: eventStatus || TicketDetails.eventStatus,
                eventName: eventName || TicketDetails.eventName,
                ticketQuantity: ticketQuantity || TicketDetails.ticketQuantity,
                ticketsInfo: ticketsInfo || TicketDetails.ticketsInfo,
                minDailySales: minDailySales || TicketDetails.minDailySales,
                maxDailySales: maxDailySales || TicketDetails.maxDailySales,
                salesChannel: salesChannel || TicketDetails.salesChannel
            }
            const updateTicketDetails= await Ticket.findByIdAndUpdate(eventID,{$set: updatedDetails}, {$new: true})
            res.status(OK).json({
                status:"success",
                msg:`Ticket details for event with ID: ${eventID} updated successfully.`,
                data:updateTicketDetails
             })
        }
    } catch (error) {
        res.json({
            status:"error",
            msg:error.message
        })
    }
  }

  const deleteTicketDetails = async(req,res)=>{
    try {
      const eventID= req.params.id
      const ticketDetails= await Ticket.findOne({eventID})

      if(!ticketDetails){
        res.status(400)
        throw new Error(`Ticket details for event with id: ${eventID} not found.`)
      }else{
        await Ticket.findOneAndDelete({eventID})
        res.status(NOCONTENT).json({
          status:"success",
          msg:`Event with id: ${eventID} ticket details, deleted successfully.` 
        })
      }

    } catch (error) {
      res.json({
        status:"error",
        msg: error.message
      })
    }
  }
  
  export {addTicketDetails, editTicketDetails, deleteTicketDetails}
  
  
  
  
  // "ticketsInfo":[{"type":"Regular", "price":"$10", "quantityLeft":50},{"type":"VIP","price":"$20", "quantityLeft":30},{"type":"VVIP","price":"$50","quantityLeft":20}],
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  