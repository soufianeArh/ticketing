import express , {Request , Response} from "express";
import { requireAuth, validateRequest } from '@soufiane12345/ticketing-common';
import { body } from "express-validator";
import {Ticket} from "../models/Ticket"
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();
router.post(
      "/api/tickets",
      requireAuth,
      [
            body('title').not().isEmpty().withMessage("Title is Required"),
            body('price')
            .isFloat({gt:0})
            .withMessage("Price should be greated than 0")
      ],
      validateRequest,
      async (req: Request,res: Response)=>{
            const ticket = Ticket.build({
                  title: req.body.title,
                  price: req.body.price,
                  userId: req.currentUser!.id
            })
            await ticket.save();
            console.log('ticketsaved')
            await new TicketCreatedPublisher(natsWrapper.client).publish({
                  id:ticket.id,
                  version:ticket.version,
                  title:ticket.title,
                  price:ticket.price,
                  userId:ticket.userId
            });

           res.status(201).send(ticket);

});

export { router as newTicketRouter };