import { Listener, OrderStatus, PaymentCreatedEvent, Subjects, NotFoundError } from "@soufiane12345/ticketing-common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import {Order} from "../../Models/order"

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent>{
      subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
      queueGroupName=queueGroupName;
      async onMessage(data: { id: string; orderId: string; stripeId: string; }, msg: Message) {
            const order = await Order.findById(data.orderId);
            if(!order){
                  throw new NotFoundError()
            }
            order.set({status: OrderStatus.Complete})
            await order.save();
            msg.ack()

      }
}