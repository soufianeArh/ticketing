import request from "supertest";
import {app} from "../../app";
import {signin} from "../../test/setup"

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
      
})
it('returns error if invalid price is provided', async ()=>{
      
})
it('creates a ticket with valid parameters', async ()=>{
      
})