import Ticket from "../models/events/ticketModel.js";
import { CREATED, NOTFOUND, OK } from "../utils/statusCodes.js";

const addTicketDetails=async(req,res)=>{
    try {
      const {eventID, eventStatus, eventName,
        ticketQuantity, ticketTypeAndPrice, 
        minDailySales, maxDailySales, salesChannel} = req.body
  
        const event= await Event.findById(eventID);
        if(!event){
          res.status(NOTFOUND)
          throw new Error(`Event with ID:
          ${eventID} not found and cannot create ticket details.`);
        }else{
          const eventTicketDetails= new Ticket({
            eventID,    //ObjectID
            eventStatus,    //String - free or paid
            eventName,  //String - could be same as event title
            ticketQuantity, //Number
            ticketTypeAndPrice, // Array of Objects with attributies of type and price
            ticketQuantity,
            minDailySales,
            maxDailySales,
            salesChannel    //Array of Strings
          }).save()
  
          res.status(CREATED).json({
            status:"success",
            msg:`Ticket details for event with ID: ${eventID} has been created.`,
            data:eventTicketDetails
          })
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
            ticketQuantity, ticketTypeAndPrice, 
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
                ticketTypeAndPrice: ticketTypeAndPrice || TicketDetails.ticketTypeAndPrice,
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
      const id= req.params.eventID
        
    } catch (error) {
      
    }
  }
  
  export {addTicketDetails, editTicketDetails}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  