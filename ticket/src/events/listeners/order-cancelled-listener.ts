import { Listener, NotFoundError, OrderCancelEvent, Subjects } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";
import {Ticket} from "../../models/Ticket"
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelEvent>{
      subject: Subjects.OrderCancelled = Subjects.OrderCancelled ;
      queueGroupName = "ticket-service";
      async onMessage(data: OrderCancelEvent['data'], msg: Message) {
            //get ticket
            //update orderId to indefined
            //save ticket
            //publish ticket updatated 
            const ticket = await Ticket.findById(data.ticket.id);
            if(!ticket){
                  throw new NotFoundError()
            }
            ticket.set({orderId: undefined})
            await ticket.save()
            await new TicketUpdatedPublisher(this.client).publish({
                  id: ticket.id,
                  version: ticket.version,
                  title: ticket.title,
                  price: ticket.price,
                  userId: ticket.userId,
                  orderId: ticket.orderId
            })
            msg.ack()

      }
}