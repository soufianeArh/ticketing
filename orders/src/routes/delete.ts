import express, {Request, Response, NextFunction} from "express";
import { Order } from "../Models/order";
import { NotFoundError, NotAuthorizedError, requireAuth, OrderStatus } from "@soufiane12345/ticketing-common";
import { OrderCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { natsWrapper } from "../nats-wrapper";


const router = express.Router();

router.delete("/api/orders/:orderId", 
      requireAuth,
      async(req: Request, res: Response, next: NextFunction) => {
      // const item = await Model.findById()
      // Item.set({title:…, price…}) … item.save()
      const orderId = req.params.orderId;
      try{
            //get the order => error case not found
            const order = await Order.findById(orderId).populate("ticket");
            if(!order){
                  throw new NotFoundError()
            }
            //check order.userId and currentUser
            if(order.userId !== req.currentUser!.id){
                  throw new NotAuthorizedError()
            }
            //update Order
            order.set({status :OrderStatus.Canceled})
            await order.save();

            await new OrderCancelledPublisher(natsWrapper.client).publish({
                        id:order.id,
                        version:order.version,
                        ticket: {
                              id: order.ticket.id
                        }
               
            })
            res.status(204).send(order);
      }catch(err){
            next(err)
      }
})

export { router as deleteOrderRouter };