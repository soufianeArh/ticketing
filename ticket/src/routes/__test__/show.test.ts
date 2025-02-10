import request from "supertest";
import {app} from "../../app"
import { signin } from "../../test/setup";

import mongoose from "mongoose";

// it("have aroute that handles Get a specific ticket", async ()=>{
//       const response = await request(app)
//       .get("/api/tickets/something")
//       .send()
      
//       expect(response.statusCode).toEqual(404)
// })
///////////////////////This test is in conflict of ticket not found 404\\\\\\\\\\\\\\\\\\\\\\\\\\\\

it("ticket not found", async ()=>{
      const id = new mongoose.Types.ObjectId().toHexString()
      const response = await request(app)
      .get(`/api/tickets/${id}`)
      // .get("/api/tickets/somethingsss123")
      //  .get("/api/tickets/67a96c3f5805d1981c20664f")
      .send();
      console.log(response.body)

      expect(response.status).toEqual(404);
})

it("return ticket if found", async ()=>{
      const createResponse = await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme",
            price:10,
            //id will be added from req.currentuser=>REQUEST
      })
      .expect(201);

      const getTicketResponse = await request(app)
      .get(`/api/tickets/${createResponse.body.id}`)
      .expect(201)
      expect(getTicketResponse.body.id).toEqual(createResponse.body.id)
} )