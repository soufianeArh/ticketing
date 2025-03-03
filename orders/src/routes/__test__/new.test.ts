import request from "supertest";
import {app} from "../../app";
import mongoose  from "mongoose";
import { signin } from "../../test/setup";
import { Ticket } from "../../Models/ticket";
import { Order } from "../../Models/order";
import { OrderStatus } from "@soufiane12345/ticketing-common";


it("return error is ticket not found", async ()=>{
      const ticketId = new mongoose.Types.ObjectId()
      await request(app)
      .post("/api/orders")
      .set("Cookie", signin())
      .send({ticketId})
      .expect(404)
})
it("returns error if the ticket is reserved",async ()=>{
      const ticket = Ticket.build({
            title: 'concert',
            price: 20,
          });
          await ticket.save();
          const order = Order.build({
            ticket,
            userId: 'laskdflkajsdf',
            status: OrderStatus.Created,
            expiresAt: new Date(),
          });
          await order.save();
        console.log(ticket)
          await request(app)
            .post('/api/orders')
            .set('Cookie', signin())
            .send({ ticketId: ticket.id })
            .expect(400);

})
it("rend order after build success", async ()=>{
      const ticket = Ticket.build({
            title: 'concert',
            price: 20,
          });
          await ticket.save();
          await request(app)
            .post('/api/orders')
            .set('Cookie', signin())
            .send({ ticketId: ticket.id })
            .expect(201);
})
it.todo("publish event after order created ")