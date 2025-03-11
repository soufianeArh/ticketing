import { Listener, NotFoundError, OrderCreateEvent, OrderStatus, Subjects } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";
import {Ticket} from "../../models/Ticket"

export class OrderCreatedListener extends Listener<OrderCreateEvent>{
      subject: Subjects.OrderCreated = Subjects.OrderCreated;
      queueGroupName = "ticket-service";
      async onMessage(data:OrderCreateEvent['data'] , msg: Message){
            //lock the ticket that was orderd
            
            const ticket = await Ticket.findById(data.ticket.id);
            if(!ticket){
                  throw new NotFoundError();
            }
            ticket.set({orderId: data.id})
            await ticket.save()

            msg.ack()
      }
}