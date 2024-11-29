import request from "supertest";
import {app} from "../../app"

it("success with supplied cookie",async ()=>{
      await request(app)
      .post("/api/users/signup")
      .send({
            email:"test@test.com",
            password: "password"
      })
      .expect(201)
     await request(app)
      .post("/api/users/signin")
      .send({
            email:"test@test.com",
            password: "password"
      })
      .expect(200)
      const response = await request(app)
      .post("/api/users/signout")
      .expect(200)
      const cookie = response.get("Set-Cookie")
      console.log(cookie)//["..."]
      console.log(typeof cookie)//aray
      if(!cookie){
            throw new Error("expected cookie but Not recieved")
      }
     expect(cookie).toEqual(["session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"])

})