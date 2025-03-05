import mongoose from "mongoose"
import express, {Request, Response, NextFunction} from "express";
import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@soufiane12345/ticketing-common';
import { body } from "express-validator";
import { Ticket } from "../Models/ticket";
import { Order } from "../Models/order";
import { natsWrapper } from "../nats-wrapper";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher.ts";


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
      async (req: Request, res: Response, next: NextFunction) => {
            try{
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
      const expiresAt = new Date()
      expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRATION_WINDOW_SECONDS)
      //save order
      const order =  Order.build({
            userId:req.currentUser!.id,
            status: OrderStatus.Created,
            expiresAt,
            ticket
      })
      await order.save();
      console.log({ 
            orderExpiresAttToISO: order.expiresAt.toISOString(),
            orderExpiresAttt :order.expiresAt, 
            expiresAt: new Date(), 
            expiresAtIso:new Date().toISOString()} )
      console.log(order)

      //publish an event saying that the order has been created
      await new OrderCreatedPublisher(natsWrapper.client).publish({
            id:order.id,
            userId:order.userId,
            status: OrderStatus.Created,
            expiresAt: order.expiresAt.toISOString(),
            ticket:{
                  id: ticket.id,
                  price: ticket.price
            }
     })
      //send 201  created order
      res.status(201).send(order);
} catch (err) {
      next(err)
}
})

export { router as newOrderRouter };