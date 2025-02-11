import express , {Request, Response, NextFunction } from "express";
import { Ticket } from "../models/Ticket";

const router = express.Router();
router.get("/api/tickets", async (req: Request, res: Response, next:NextFunction) => {
      try{
            const tickets = await Ticket.find({});
            res.status(200).send(tickets)

      }catch(err){
            next(err)
      }
})

export {router as getAllTickets}