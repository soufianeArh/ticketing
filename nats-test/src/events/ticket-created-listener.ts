import {Listener} from "./base-listener";
import {Message} from 'node-nats-streaming'

export class TicketCreatedListener extends Listener {
      subject = "ticket:created"
      queueGroupName = "ticket-created-queue"
      onMessage = (data:any, msg: Message)=>{
            msg.ack()
      }
}
