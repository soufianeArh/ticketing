import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedListener } from "../ticket-updated-listener"
import {Ticket} from "../../../Models/ticket"
import mongoose from "mongoose"
import { TicketUpdatevent } from "@soufiane12345/ticketing-common"
import { Message } from "node-nats-streaming"

const setUp = async ()=>{
      //create the listener
      //create and save a ticket
      //fack update event data
      //make fakje ack
      //return all
      const listener = new TicketUpdatedListener(natsWrapper.client);
      const ticket = Ticket.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            title:"myTitle",
            price:20,
      })
      await ticket.save();
      console.log(ticket.version + 1)
      const data: TicketUpdatevent['data'] = {
            id: ticket.id,
            version: ticket.version+1,
            title: "MyTitle22",
            price: 233,
            userId: "asuaduwid"
      };
      //@ts-ignore
      const msg:Message = {
            ack:jest.fn()
      }
      return {listener, data, msg, ticket}
}


it("finde ,update, save  ticket via listener", async ()=>{
      const {listener, data, msg, ticket} =await setUp();
      await listener.onMessage(data,msg);
      const ticketUpdated = await Ticket.findById(ticket.id);
      expect(ticketUpdated).toBeDefined();
      expect(ticketUpdated!.price).toEqual(233);
})
it("ack is called once", async()=> {
      const {listener, data, msg} =await setUp();
      await listener.onMessage(data,msg);
       expect(msg.ack).toHaveBeenCalledTimes(1);
})
it("case process failed and we have a newer version to test", async ()=>{
      const {listener, data, msg,} =await setUp();
      data.version = data.version+2;
      try{
            await listener.onMessage(data,msg);
      }catch(err){

      }
      expect(msg.ack).not.toHaveBeenCalled();
})
it(`case process OCC simulatnius issue, its fethcehd
      byfindone but when saving find out sth else added immidately `, async ()=>{
      const {listener, data, msg, ticket} =await setUp();
      const firstInstance = await Ticket.findById(ticket.id);
      const secondInstance = await Ticket.findById(ticket.id);
      firstInstance!.set({price:300});
      secondInstance!.set({price:400});
      await firstInstance!.save()
      try{
            await secondInstance!.save()
      }catch(err){
            return;
      }
      throw new Error("i should ne be fired ")
})