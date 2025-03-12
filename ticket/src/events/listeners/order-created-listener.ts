import { Listener, NotFoundError, OrderCreateEvent, OrderStatus, Subjects } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";
import {Ticket} from "../../models/Ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { TicketCreatedPublisher } from "../publishers/ticket-created-publisher";
import { natsWrapper } from "../../nats-wrapper";

export class OrderCreatedListener extends Listener<OrderCreateEvent>{
      subject: Subjects.OrderCreated = Subjects.OrderCreated;
      queueGroupName = "ticket-service";
      async onMessage(data:OrderCreateEvent['data'] , msg: Message){
            //lock the ticket that was orderd
            //findoNe?? or check if its locked ??
            const ticket = await Ticket.findById(data.ticket.id);
            if(!ticket){
                  throw new NotFoundError();
            }
            ticket.set({orderId: data.id})
            await ticket.save();
            //this is not desirable to make await
            await new TicketUpdatedPublisher(this.client).publish({
                        id: ticket.id,
                        version: ticket.version,
                        title: ticket.title,
                        price: ticket.price,
                        userId: ticket.userId,
                        orderId:data.id
            })
            msg.ack()
      }
}