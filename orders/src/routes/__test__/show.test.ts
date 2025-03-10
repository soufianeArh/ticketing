import Request from "supertest"
import {app} from "../../app"
import {Order} from "../../Models/order"
import { signin } from "../../test/setup"
import {Ticket} from "../../Models/ticket"
import mongoose from "mongoose"

it("return 404 when order not found", async ()=>{
      await Request(app)
      .get("/api/order/randomId")
      .set("Cookie", signin())
      .send()
      .expect(404)
})
 it("notAuthorised when userId of order mismatch currentUser", async ()=>{
      //creatt two users
      const user1 = signin();
      const user2 = signin();
      //create a ticket
      const ticket = await Ticket.build({
            title:"Mytickewt",
            price: 20,
            id:new mongoose.Types.ObjectId().toHexString()

      })
      await ticket.save()
      //make order with userone => get order.id
      const newResponse = await Request(app)
      .post("/api/orders")
      .set("Cookie", user1)
      .send({
            ticketId:ticket.id
      })
      .expect(201)
      //get same order with user2
      const getSpecificResponse = await Request(app)
      .get(`/api/orders/${newResponse.body.id}`)
      .set("Cookie",user2 )
      .send()
      .expect(401)
 })
 it("success when order found and match userId with current user", async ()=>{
      //create user1
      const user1 = signin();
      //create a ticket
      const ticket = await Ticket.build({
            title:"Mytickewt",
            price: 20,
            id:new mongoose.Types.ObjectId().toHexString()
      })
      await ticket.save()
      //make order of ticket by user1
      const {body:newOrder} = await Request(app)
      .post("/api/orders")
      .set("Cookie", user1)
      .send({
            ticketId:ticket.id
      })
      .expect(201)
      //get order success
      const {body: fetchedOrder} = await Request(app)
      .get(`/api/orders/${newOrder.id}`)
      .set("Cookie",user1 )
      .send()
      .expect(200);
      expect(fetchedOrder.id).toEqual(newOrder.id)
      

 })