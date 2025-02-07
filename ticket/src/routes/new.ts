import express , {Request , Response} from "express";
import { requireAuth } from '@soufiane12345/ticketing-common';

const router = express.Router();
router.post(
      "/api/tickets",
      requireAuth,
      async (req: Request,res: Response)=>{
      res.sendStatus(200);

});

export { router as newTicketRouter };