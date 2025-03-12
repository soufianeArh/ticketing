import mongoose from "mongoose";
import {Ticket} from "../../../models/Ticket";
import { OrderCancelledListener } from "../order-cancelled-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelEvent } from "@soufiane12345/ticketing-common";
import { Message } from "node-nats-streaming";

const setup = async ()=>{
       //instance Listener we are testing listener onMesage!
      //create a ticket + update it with a ticketId
      //fake event data
      //fake msg => for test
      const Listener = new OrderCancelledListener(natsWrapper.client)
      const ticket = Ticket.build({
            title: "soufian",
            price: 20,
            userId: new mongoose.Types.ObjectId().toHexString()
      })
      //i can fake and pass orderId directrly or create a real order ?
      //im in ticket i cannot create order collection just to test
      ticket.orderId= new mongoose.Types.ObjectId().toHexString()
      await ticket.save()
      const data:OrderCancelEvent['data'] = {
            id: new mongoose.Types.ObjectId().toHexString(),
            version: 1,
            ticket: {
                id: ticket.id
            }
      }
      //@ts-ignore
      const msg : Message = {
            ack:jest.fn()
      }
      return {Listener, data, msg, ticket}

}

it("ticket updated successfully in ticket db", async ()=>{
    const {Listener, data, msg, ticket} = await setup();
    await Listener.onMessage(data,msg);
    const ticketUpdated = await Ticket.findById(data.ticket.id);
    expect(ticketUpdated!.orderId).toEqual(undefined);
    expect(ticketUpdated!.orderId).not.toBeDefined();
})
it("msg.ack is called when all is success",async()=>{
      const {Listener, data, msg, ticket} = await setup();
      await Listener.onMessage(data,msg);
    expect(msg.ack).toHaveBeenCalledTimes(1)
     
})
it("event published success", async ()=>{
      const {Listener, data, msg, ticket} = await setup();
      await Listener.onMessage(data,msg);
      expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1)
      expect((natsWrapper.client.publish as jest.Mock).mock.calls[0]['orderId']).not.toBeDefined()
})