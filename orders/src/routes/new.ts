import mongoose from "mongoose"
import express, {Request, Response} from "express";
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@soufiane12345/ticketing-common';
import { body } from "express-validator";
import { Ticket } from "../Models/ticket";
import { Order } from "../Models/order";

const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15*60;
router.post(
      "/api/orders",
      requireAuth,
      [
       body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string)=> mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided")
      ]
      ,
      validateRequest,
      async (req: Request, res: Response) => {
            const {ticketId} = req.body
      //find the ticket in db
      const ticket = await Ticket.findById(ticketId)
      if(!ticket){
            throw new NotFoundError()
      }
      //make sure ticket is nore reserved (im a selling only one ticket?)
      const isReserved = await ticket.isReserved();
      if(isReserved){
            //reserved
            throw new BadRequestError("ticket already reserved")
      }
      //calculate an exiration date for order
      const expiration = new Date()
      expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)
      //save order
      //publish an event saying that the order has been created
})

export { router as newOrderRouter };