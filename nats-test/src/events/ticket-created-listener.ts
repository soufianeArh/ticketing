import {Listener} from "./base-listener";
import {Message} from 'node-nats-streaming'
import { TicketCreateEvent } from "./ticket-created";
import {Subjects} from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreateEvent> {
      subject: Subjects.TicketCreated = Subjects.TicketCreated
      queueGroupName = "ticket-created-queue"
      onMessage = (data:any, msg: Message)=>{
            msg.ack()
      }
}
