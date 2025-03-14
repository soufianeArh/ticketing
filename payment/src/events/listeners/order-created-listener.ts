import { Listener, OrderCreateEvent, Subjects } from "@soufiane12345/ticketing-common";
import { queueGroupName } from "../listeners/queue-group-name"
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Orders";

export class OrderCreatedListener extends Listener<OrderCreateEvent>{
      subject: Subjects.OrderCreated= Subjects.OrderCreated;
      queueGroupName = queueGroupName;
      async onMessage(data: OrderCreateEvent['data'], msg: Message) {
            //save
            const order = Order.build({
                  id:data.id,
                  status:data.status,
                  version:data.version,
                  userId:data.userId,
                  price:data.ticket.price
            })
            await order.save()
            msg.ack()

      }
}