import express , {Request , Response, NextFunction } from "express";
import {Ticket} from "../models/Ticket";
import { NotFoundError, requireAuth, NotAuthorizedError, validateRequest } from "@soufiane12345/ticketing-common";
import {body} from "express-validator";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
      "/api/tickets/:id",
      requireAuth,
      [
            body("title")
            .not()
            .isEmpty()
            .withMessage("title is required"),
            body("price")
            .isFloat({gt:0})
            .withMessage("price must be higher than 0")
      ],
      validateRequest,

       async ( req: Request, res: Response, next: NextFunction ) => {
      try{
            const ticket = await Ticket.findById(req.params.id);
            console.log(ticket)
            if(!ticket){
                  next(new NotFoundError())
            }
            else if (ticket!.userId !== req.currentUser!.id){
                  next( new NotAuthorizedError() )
            }
            ticket!.set({
                  title:req.body.title,
                  price:req.body.price
            })
            await ticket!.save()
       
            await new TicketUpdatedPublisher(natsWrapper.client).publish(
                  {
                        id:ticket!.id,
                  title:ticket!.title,
                  price:ticket!.price,
                  userId:ticket!.userId
                  }
            )
            res.send(ticket)
      }catch(err){
            next(err)
      }
})

export {router as updateTickets}