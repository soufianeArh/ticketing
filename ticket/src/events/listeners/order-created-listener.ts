import { Listener, OrderCreateEvent, OrderStatus, Subjects } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";

export class OrderCreatedListener extends Listener<OrderCreateEvent>{
      subject: Subjects.OrderCreated = Subjects.OrderCreated;
      queueGroupName = "ticket-service";
      async onMessage(data:OrderCreateEvent['data'] , msg: Message){
            //lock the ticket that was orderd
      }
}