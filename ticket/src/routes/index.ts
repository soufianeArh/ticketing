import express , {Request, Response, NextFunction } from "express";

const router = express.Router();
router.get("/api/tickets/", (req: Request, res: Response) => {
      res.send({})
})

export {router as getAllTickets}