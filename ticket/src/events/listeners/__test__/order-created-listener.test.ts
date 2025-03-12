import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import {Ticket} from "../../../models/Ticket"
import mongoose from "mongoose";
import { OrderCreateEvent, OrderStatus } from "@soufiane12345/ticketing-common";
import {Message} from "node-nats-streaming"

const setup = async ()=>{
      //create a listener 
      //create a ticket
      //sennd event Order created of the created ticket
      //create fake msg (jest)
      //call onmessage of listener isnatce and expect doc to be updated + msg
      const listener = new OrderCreatedListener(natsWrapper.client);
      const ticket = Ticket.build({
            title: "Myticket",
            price: 12,
            userId: new mongoose.Types.ObjectId().toHexString()
      })
      await ticket.save()
      const data : OrderCreateEvent['data'] = {
            id: new mongoose.Types.ObjectId().toHexString(),
            version: 0,
            userId: new mongoose.Types.ObjectId().toHexString(),
            status: OrderStatus.Created,
            expiresAt: "",
            ticket: {
                id: ticket.id,
                price: ticket.price
            }
        };
       //@ts-ignore
       const msg:Message = {
            ack:jest.fn()
      }
      return {listener, data, msg, ticket}
}
it("titcker updated successfuly- on message handle", async ()=>{
      const {listener, data, msg, ticket} = await setup();
      await listener.onMessage(data, msg);
      const lockedTicket = await Ticket.findById(ticket.id)
      expect(lockedTicket?.orderId).toEqual(data.id)
})
it("ack was called once", async ()=>{
      const {listener, data, msg, ticket} = await setup();
      await listener.onMessage(data, msg);
      expect(msg.ack).toHaveBeenCalledTimes(1)
});
it("event was published inside order-created-listener", async ()=>{
      const {listener, data, msg, ticket} = await setup();
      await listener.onMessage(data, msg);
      expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
      //@ts-ignore
      console.log(natsWrapper.client.publish.mock.calls)
      const ticketUpdateData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
      console.log(ticketUpdateData)
      expect(ticketUpdateData.orderId).toEqual(data.id)
});

// it("concurency due to fail", async ()=>{
//       //make version advanced and expect error that will creatch the app: advanced veriosn
//       const {listener, data, msg, ticket} = await setup();
//       try{
//             await listener.onMessage(data, msg);
//       }catch(err){
//       }
//       expect(msg.ack).not.toHaveBeenCalled()
// })
// it("concurency due to occ", async ()=>{
//       //update the same ticket at same time and one saved after the other : lower version
//       const {listener, data, msg, ticket} = await setup();
//       await listener.onMessage(data, msg);//save ticket
//       try{
//             await listener.onMessage(data, msg);//save ticket 
//       }catch(err){
//             return;
//       }
// })