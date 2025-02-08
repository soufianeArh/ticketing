import request from "supertest";
import {app} from "../../app"
import { signin } from "../../test/setup";
it("have aroute that handles Get specific ticket", async ()=>{
      const response = await request("/api/tickets/:id")
      .get("/api/tickets/something")
      .send()
      expect(response.statusCode).not.toEqual(404)
})
it("ticket not found or incorrect", async ()=>{
      
})

it("return ticket if found", async ()=>{
      await request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme",
            price:10,
            //id will be added from req.currentuser=>REQUEST
      })
      .expect(201);
} )