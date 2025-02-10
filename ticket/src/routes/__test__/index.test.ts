import request from "supertest";
import {app} from "../../app";

it("ticket returned all ", async ()=>{
      const response = await request(app)
      .get(`/api/tickets`)
      .send();

      expect(response.status).not.toEqual(404);
})