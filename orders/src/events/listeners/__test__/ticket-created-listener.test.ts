import { TicketCreatedListener } from "../ticket-created-listener"
import { TicketCreateEvent } from "@soufiane12345/ticketing-common"
import { natsWrapper } from "../../../nats-wrapper"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import { Ticket } from "../../../Models/ticket"
const setUp = async ()=>{
      //create instance of the listener
      //create fake event data
       //create a fake message object
      const listener = new TicketCreatedListener(natsWrapper.client);
      const data:TicketCreateEvent['data'] = {
            id: new mongoose.Types.ObjectId().toHexString(),
            version: 0,
            title: "myTitle",
            price: 20,
            userId: new mongoose.Types.ObjectId().toHexString()
      }
     //@ts-ignore
     const msg: Message ={
      ack:jest.fn()
     }
     return {listener, data, msg}

}
it("listner creates and saves a ticket", async ()=>{
      const {listener, data, msg} = await setUp();
      await listener.onMessage(data,msg)
      const ticket = await Ticket.findById(data.id);

      expect(ticket).toBeDefined()
      expect(ticket!.title).toEqual(data.title)
})
it("ack function beein called", async()=>{
      const {listener, data, msg} = await setUp();
      await listener.onMessage(data,msg)
      expect(msg.ack).toHaveBeenCalledTimes(1);
})