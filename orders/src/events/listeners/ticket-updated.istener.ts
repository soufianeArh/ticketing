import { Listener, TicketUpdatevent, Subjects, NotFoundError } from "@soufiane12345/ticketing-common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../Models/ticket";
export class TicketUpdatedListener extends Listener<TicketUpdatevent> {
      subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
      queueGroupName=queueGroupName ;
      async onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message) {
            //find the ticket
            const ticket = await Ticket.findById(data.id);
            if(!ticket) {
                  throw new NotFoundError()
            }
            //update the ticket + save
            ticket.set({
                   title: data.title,
                   price: data.price,
            })
            await ticket.save()
            //ack
            msg.ack()
      }
}