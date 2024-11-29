import request from "supertest";
import {signin} from "../../test/setup"
import {app} from "../../app"

it("respond with user paylod when cookie is active", async ()=>{
      const cookieArr =  await signin();

      const response = await  request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookieArr)
      .expect(200)
      
       expect(response.body.currentUser.email).toEqual("test@test.com")

})
it("responds with currentuser = null when no cookie ", async ()=>{
      const response = await request(app)
      .get("/api/users/currentuser")
      .expect(200)

      expect(response.body).toEqual({ currentUser: null })
})