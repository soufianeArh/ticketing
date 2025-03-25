import request from "supertest";
import {app} from "../../app"
it(" fails with unfound email  ", async () => {

      await request(app)
      .post("/api/users/signin")
      .send({
            email:"test@test.com",
            password: "password123"
      })
      .expect(400)
})
it(" fails with incorrect password is supplied ", async () => {

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
            password: "password123"
      })
      .expect(400)
})
it(" success with correct credentials ", async () => {

      await request(app)
      .post("/api/users/signup")
      .send({
            email:"test@test.com",
            password: "password"
      })
      .expect(201)
      const response = await request(app)
      .post("/api/users/signin")
      .send({
            email:"test@test.com",
            password: "password"
      })
      .expect(200)
      
      expect(response.get("Set-Cookie")).toBeDefined()
})