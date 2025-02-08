import express , {Request , Response} from "express";
import { requireAuth, validateRequest } from '@soufiane12345/ticketing-common';
import { body } from "express-validator";
import {Ticket} from "../models/Ticket"

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
            console.log(req.currentUser)
            const ticket = Ticket.build({
                  title: req.body.title,
                  price: req.body.price,
                  userId: req.currentUser!.id
            })
            await ticket.save();
      res.status(201).send(ticket);

});

export { router as newTicketRouter };