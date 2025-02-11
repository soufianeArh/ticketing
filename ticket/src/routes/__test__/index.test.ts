import request from "supertest";
import {app} from "../../app";
import { signin } from "../../test/setup";

function createTicket() {
      return request(app)
      .post("/api/tickets")
      .set("Cookie", signin())
      .send({
            title:"coorect title byme",
            price:10,
      });
}
it("ticket returned all ", async ()=>{
      const response = await request(app)
      .get(`/api/tickets`)
      .send();

      expect(response.status).not.toEqual(404);
});
it("can fetch a list of tickets", async ()=>{
      await createTicket();
      await createTicket();
      await createTicket();

      const response = await request(app)
      .get("/api/tickets")
      .send()
      .expect(200)
      expect(response.body.length).toEqual(3)
})
