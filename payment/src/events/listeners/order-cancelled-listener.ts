import { Listener, NotAuthorizedError, OrderCancelEvent, OrderStatus, Subjects } from "@soufiane12345/ticketing-common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import {Order} from "../../models/Orders"

export class OrderCancelledListener extends Listener<OrderCancelEvent>{
      subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
      queueGroupName = queueGroupName;
      async onMessage(data: OrderCancelEvent["data"], msg: Message) {
            //update to canceled + no publisher
            const order = await Order.findById(data.id);
            if(!order){
                  throw new NotAuthorizedError()
            }
            order.set({status:OrderStatus.Canceled})
            await order.save()
            msg.ack()
      }

}