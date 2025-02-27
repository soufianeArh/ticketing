import request from "supertest";
import {app} from "../../app";
import {signin} from "../../test/setup";
import {Ticket} from "../../models/Ticket"


it('has a route handler that handles adding (post) tickets', async ()=>{
      const response = await request(app)
      .post("/api/tickets")
      .send({});

      expect(response.statusCode).not.toEqual(404);
});
it('can only be access if user signed in ', async ()=>{
      await request(app)
      .post("/api/tickets")
      .send({})
      .expect(401);
})
it('status is not 401 when user signed in', async ()=>{
      const response = await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({});

      expect(response.statusCode).not.toEqual(401);
})
it('returns error if provided title is incorrect', async ()=>{
      await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"",
            price:0
      })
      .expect(400);

       await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({})
      .expect(400);
})
it('returns error if invalid price is provided', async ()=>{
      await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme ",
            price:-10
      })
      .expect(400);

      await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme ",
      })
      .expect(400);
})
it('collection cleared for test + creates a ticket record ', async ()=>{
      //saved successfully ticket
      let tickets = await Ticket.find({});
      expect(tickets.length).toEqual(0);
      await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme",
            price:10,
            //id will be added from req.currentuser=>REQUEST
      })
      .expect(201);
      tickets = await Ticket.find({});
      expect(tickets.length).toEqual(1);
      expect(tickets[0].title).toEqual("coorect title byme");
   
})