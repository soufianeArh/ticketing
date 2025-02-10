import express , {Request , Response, NextFunction } from "express";
import {Ticket} from "../models/Ticket";
import { NotFoundError } from "@soufiane12345/ticketing-common";

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response , next: NextFunction) => {
      try{
            const ticket = await Ticket.findById(req.params.id);
            // console.log(ticket)
          
            if (!ticket) {
                return  next(  new NotFoundError());
            }
          
            res.status(201).send(ticket);
      }catch(err){
            next(err)
      }
    
    });
    
    export { router as showTicketRouter };