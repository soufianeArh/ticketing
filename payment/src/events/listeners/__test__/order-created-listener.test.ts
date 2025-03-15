import { OrderCreateEvent, OrderStatus } from "@soufiane12345/ticketing-common";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from "mongoose";
import { Order } from "../../../models/Orders";

const setup = ()=>{
      //listsner
      //fake data
      //fake msg
      const listener = new OrderCreatedListener(natsWrapper.client);
      const data:OrderCreateEvent['data'] ={
                  id: new mongoose.Types.ObjectId().toHexString(),
                  version: 0,
                  userId: new mongoose.Types.ObjectId().toHexString(),
                  status: OrderStatus.Created,
                  expiresAt: new Date().toISOString(),
                  ticket: {
                      id: new mongoose.Types.ObjectId().toHexString(),
                      price: 123
                  }
      }
      //@ts-ignore
      const msg:Message = {
            ack:jest.fn()
      }
      return {listener, data, msg,}
}
it("order added to payent db", async()=>{
      const {listener, data, msg} = await setup();
      await listener.onMessage(data,msg);
      const orderCreated = await Order.findById(data.id);
      expect(orderCreated).toBeDefined()
})
// it("ack called once")
// it("publisher is sent = chgeck message from event itself", async ()=>{
//       const {listener, data, msg} = await setup();
//       await listener.onMessage(data,msg);
//       expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
//       expect((natsWrapper.client.publish as jest.Mock).mock.calls[0][1].id).toEqual(data.id)
// })