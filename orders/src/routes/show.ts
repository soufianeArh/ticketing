import { requireAuth } from "@soufiane12345/ticketing-common";
import express, {Request, Response, NextFunction} from "express";
import { Order } from "../Models/order";
import { NotFoundError, NotAuthorizedError } from "@soufiane12345/ticketing-common";

const router = express.Router();

router.get("/api/orders/:orderId",
      requireAuth, 
      async (req: Request, res: Response, next: NextFunction) => {
            try{
      //get the orderId from request
      const orderId = req.params.orderId;
      //check if order exixt
      const order = await Order.findById(orderId).populate("ticket");
      if(!order){
            throw new NotFoundError()
      }
      //compare order userId with currentUser
      if(order.userId !== req.currentUser!.id){
            throw new NotAuthorizedError()
      }
      res.send(order)
      //send the order
      }catch(err){
            next(err)
      }
})

export { router as showOrderRouter };