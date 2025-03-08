import { Listener, Subjects, TicketCreateEvent } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../Models/ticket";

export class TicketCreatedListener extends Listener<TicketCreateEvent> {
      subject:Subjects.TicketCreated = Subjects.TicketCreated;
      queueGroupName= queueGroupName
      async onMessage(data: TicketCreateEvent['data'], msg: Message) {
            //save ticket to ticket collection in OrdersDB
            const ticket = Ticket.build({
                  id:data.id,
                  title:data.title,
                  price:data.price,
            })
            await ticket.save()

            //ack event
            return msg.ack()
      }

}