import { Listener, OrderCreateEvent, OrderStatus, Subjects } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";


export class OrderCreatedListener extends Listener<OrderCreateEvent>{
      subject:Subjects.OrderCreated = Subjects.OrderCreated;
      queueGroupName= "expiration-service";
      async onMessage(data: OrderCreateEvent["data"], msg: Message) {
            //we have to save timer inside redis ??
            const delay = new Date(data.expiresAt).getTime() - new Date().getTime()
            await expirationQueue.add(
                  {orderId:data.id},
                  {
                        delay
                  }
            );
            //no delaty config added => so the process (listener will execute it immidiately)
            msg.ack()
      }
}