import { Listener, ExpirationCompleteEvent, Subjects, NotFoundError, NotAuthorizedError, OrderStatus } from "@soufiane12345/ticketing-common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { OrderCancelledPublisher } from "../publisher/order-cancelled-publisher";
import {Order} from "../../Models/order"


export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent>{
      subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
      queueGroupName=queueGroupName ;
      async onMessage(data: { orderId: string; }, msg: Message){
             //get the order => error case not found
             const order = await Order.findById(data.orderId).populate("ticket");
             if(!order){
                   throw new NotFoundError()
             }

             //update Order
             order.set({
                  status :OrderStatus.Canceled,
                  ticket: null
            })
             await order.save();
 
             await new OrderCancelledPublisher(this.client).publish({
                         id:order.id,
                         version:order.version,
                         ticket: {
                               id: order.ticket.id
                         }
             })
             msg.ack()
}}