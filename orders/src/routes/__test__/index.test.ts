import Request from "supertest";
import { Order } from "../../Models/order";
import { Ticket } from "../../Models/ticket";
import { signin } from "../../test/setup";
import {app} from "../../app"

const buildTicket = async ()=>{
      const ticket = Ticket.build({
            title:"myTicket",
            price:20
      });
      await ticket.save();
      return ticket

}
it("fetches order for a partuclar user", async ()=>{
     
      //i will create 3 tickets
      const ticketOne = await buildTicket();
      const ticketTwo = await buildTicket()
      const ticketThree = await buildTicket()

      //create two suers
      const userOneToken = signin();
      const userTwoToken = signin();

      //create one order => user1
     const orderRes= await Request(app)
      .post("/api/orders")
      .set('Cookie', userOneToken)
      .send({ticketId: ticketOne.id})
      expect(201)
      //create two orders => user2
      const {body: order2} = await Request(app)
      .post("/api/orders")
      .set('Cookie', userTwoToken)
      .send({ticketId: ticketTwo.id})
      expect(201)
      const {body: order3} = await Request(app)
      .post("/api/orders")
      .set('Cookie', userTwoToken)
      .send({ticketId: ticketThree.id})
      expect(201)
      //get all order of user2 => expect the two orders
      const responseOrderUser2 = await Request(app)
      .get("/api/orders")
      .set('Cookie', userTwoToken)
      .expect(200)
      expect(responseOrderUser2.body.length).toEqual(2);
      
      expect(responseOrderUser2.body[0].id).toEqual(order2.id)
      expect(responseOrderUser2.body[1].id).toEqual(order3.id)
      expect(responseOrderUser2.body[0].ticket.id).toEqual(ticketTwo.id)
      expect(responseOrderUser2.body[1].ticket.id).toEqual(ticketThree.id)
})


