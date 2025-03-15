import { OrderCancelEvent, OrderStatus } from "@soufiane12345/ticketing-common";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";
import { Order } from "../../../models/Orders";

const setup = async ()=>{
      //listsner
      //create order
      //fake data
      //fake msg
      const listener = new OrderCancelledListener(natsWrapper.client);
      const order = Order.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            status:OrderStatus.Created,
            version:0,
            userId:new mongoose.Types.ObjectId().toHexString(),
            price:123
      })
      await order.save()
      const data:OrderCancelEvent['data'] ={
            id: order.id,
            version: order.version,
            ticket: {
                id: new mongoose.Types.ObjectId().toHexString()
            }
      }
      //@ts-ignore
      const msg:Message = {
            ack:jest.fn()
      }
      return {listener, data, order, msg,}
}

it("order ic actually cancelled", async()=>{
   const  {listener, data, order, msg} =await setup();
   await listener.onMessage(data,msg);
   const cancelledOrder = await Order.findById(data.id);
   expect(cancelledOrder?.status).toEqual(OrderStatus.Canceled)
})