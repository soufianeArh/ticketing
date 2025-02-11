import request from "supertest";
import {app} from "../../app"
import { signin } from "../../test/setup";

import mongoose from "mongoose";

const id = new mongoose.Types.ObjectId().toHexString()
it("return 401 if user not signin", async()=>{
      await request(app)
      .put(`/api/tickets/${id}`)
      .send({
            title:"my title",
            price:123
      })
      .expect(401);
})
it("return 400 if id not provided / incorrect type", async()=>{
    
})

it("return 404 id not found ", async()=>{
      console.log(`/api/tickets/${id}`)
      await request(app)
      .put(`/api/tickets/${id}`)
      .set("Cookie", signin())
      .send({
            title:"my title",
            price:123
      })
      .expect(404);

})

it("return 401 if userID of ticket and currentuser not match", async()=>{
      //create intial ticket that need edit
      //compare ticket userID with other user.. singin() change the id
      const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set("Cookie", signin())
      .send({
            title:"my title",
            price:20
      })
   
      const editTicketResponse = await request(app)
      .put(`/api/tickets/${createTicketResponse.body.id}`)
      .set("Cookie", signin())
      .send({
            title:"my title",
            price:20
      })
     
      console.log(editTicketResponse.body)
})

it("return 400 if update values are invalid", async()=>{
      const cookie = signin();
      const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set("Cookie", cookie)
      .send({
            title:"my title",
            price:20
      });
      await request(app)
      .put(`/api/tickets/${createTicketResponse.body.id}`)
      .set("Cookie", cookie)
      .send({
            title:"",
            price:20
      }).expect(400)
      await request(app)
      .put(`/api/tickets/${createTicketResponse.body.id}`)
      .set("Cookie", cookie)
      .send({
            title:"my title",
            price:-20
      }).expect(400)

})

it("return 200 when ticket updated success ", async()=>{
      const cookie = signin();
      //create ticket
      const createTicketResponse = await request(app)
      .post('/api/tickets')
      .set("Cookie", cookie)
      .send({
            title:"my title",
            price:20
      });
      //update ticket
       await request(app)
      .put(`/api/tickets/${createTicketResponse.body.id}`)
      .set("Cookie", cookie)
      .send({
            title:"new title",
            price:55
      }).expect(200)
      //make sure update is saved 
      const getTicketUpdated = await request(app)
      .get(`/api/tickets/${createTicketResponse.body.id}`)
      .set("Cookie", cookie)
      .send().expect(201)
      expect(getTicketUpdated.body.title).toEqual("new title")
      expect(getTicketUpdated.body.price).toEqual(55)


})