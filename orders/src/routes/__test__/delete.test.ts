import Request from "supertest"
import {app} from "../../app"
import {Order} from "../../Models/order"
import { signin } from "../../test/setup"
import {Ticket} from "../../Models/ticket"
import { OrderStatus } from "@soufiane12345/ticketing-common";
import { natsWrapper } from "../../nats-wrapper"
import mongoose from "mongoose"

it("successfull cancel an order", async () => {
      //create user
      //create ticket
      //make order with ticket and user
      //cancel => expect(204)+ check status param value 
     //create user1
     const user = signin();
     const ticket = await Ticket.build({
           title:"Mytickewt",
           price: 20,
           id:new mongoose.Types.ObjectId().toHexString()
     })
     await ticket.save()
     const {body:newOrder} = await Request(app)
     .post("/api/orders")
     .set("Cookie", user)
     .send({
           ticketId:ticket.id
     })
     .expect(201)
     console.log(`/api/orders/${newOrder.id}`)
     const {body:updateOrder} = await Request(app)
     .delete(`/api/orders/${newOrder.id}`)
     .set("Cookie", user)
     .send({})
     .expect(204)
     //console.log(updateOrder) == {} because delete response body is empty --forced
     const {body: showOrder} = await Request(app)
     .get(`/api/orders/${newOrder.id}`)
     .set("Cookie", user)
     .expect(200)

     expect(showOrder.status).toEqual(OrderStatus.Canceled)


})

it("successfull publish after cancel", async () => {
      //create user
      //create ticket
      //make order with ticket and user
      //cancel => expect(204)+ check status param value 
     //create user1
     const user = signin();
     const ticket = await Ticket.build({
           title:"Mytickewt",
           price: 20,
           id:new mongoose.Types.ObjectId().toHexString()
     })
     await ticket.save()
     const {body:newOrder} = await Request(app)
     .post("/api/orders")
     .set("Cookie", user)
     .send({
           ticketId:ticket.id
     })
     .expect(201)
     console.log(`/api/orders/${newOrder.id}`)
     const {body:updateOrder} = await Request(app)
     .delete(`/api/orders/${newOrder.id}`)
     .set("Cookie", user)
     .send({})
     .expect(204)
     //console.log(updateOrder) == {} because delete response body is empty --forced
     const {body: showOrder} = await Request(app)
     .get(`/api/orders/${newOrder.id}`)
     .set("Cookie", user)
     .expect(200)

     expect(showOrder.status).toEqual(OrderStatus.Canceled);

     expect(natsWrapper.client.publish).toHaveBeenCalled();

})