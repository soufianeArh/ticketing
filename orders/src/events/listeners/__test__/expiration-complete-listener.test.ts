import { Ticket } from "../../../Models/ticket";
import { Order } from "../../../Models/order";
import mongoose from "mongoose"
import {  OrderCreateEvent,ExpirationCompleteEvent, OrderStatus} from "@soufiane12345/ticketing-common";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
const singup = async ()=>{

      const listener = new ExpirationCompleteListener(natsWrapper.client)
      const ticket = Ticket.build({
            id: new mongoose.Types.ObjectId().toHexString(),
            title: "ramdom",
            price: 12,
      })
      await ticket.save();
      const order = Order.build({
            userId:new mongoose.Types.ObjectId().toHexString(),
            status: OrderStatus.Created,
            expiresAt: new Date(),
            ticket: ticket
      })
      await order.save()
      console.log("ORDER.ID",order.id)
      const data : ExpirationCompleteEvent['data'] =  {
            orderId:order.id
        };

        //@ts-ignore
        const msg: Message = {
            ack:jest.fn()
        }
        return {listener, ticket, data, msg};
}

it("order status changed into cancelled", async()=>{

      //create a ticket
      //create an order 
      //>>>//fake data to be passed to onMessage
      //fake msg to be massed to onMsg
      const {listener, ticket, data, msg} = await singup();
      await listener.onMessage(data,msg);
      const updatedOrder = await Order.findById(data.orderId);
      expect(updatedOrder?.status).toEqual(OrderStatus.Canceled)
})
it("ack is called once", async()=>{
      const {listener, ticket, data, msg} = await singup();
      await listener.onMessage(data,msg);
      expect(msg.ack).toHaveBeenCalledTimes(1)
});
it("publisher pubished order cancelled", async()=>{
      const {listener, ticket, data, msg} = await singup();
      console.log("DATA ORDER ID",data.orderId)
      await listener.onMessage(data,msg);
      expect(natsWrapper.client.publish).toHaveBeenCalledTimes(1);
      const orderCanelledEventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
      expect(orderCanelledEventData.id).toEqual(data.orderId)
});