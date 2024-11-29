import request from "supertest";
import {app} from "../../app"
import { response } from "express";
it(" return status 201 for successful signup", async () => {
      console.log("im from test")

      return request(app)
      .post("/api/users/signup")
      .send({
            email:"test@test.com",
            password: "password"
      })
      .expect(201)

})

it(": return status 400 invalid email", async () => {
      return request(app)
      .post("/api/users/signup")
      .send({
            email:"testtest.com",
            password: "password"
      })
      .expect(400)

})
it(" return status 400 invalid password", async () => {
      return request(app)
      .post("/api/users/signup")
      .send({
            email:"testtest.com",
            password: "p"
      })
      .expect(400)

})
it(" return status 400 no input", async () => {
      return request(app)
      .post("/api/users/signup")
      .send({
            email:"",
            password: ""
      })
      .expect(400)

})

it(" allowing only one email", async () => {
      await request(app)
      .post("/api/users/signup")
      .send({
             email:"test@test.com",
            password: "password"
      })
      .expect(201)
      await request(app)
      .post("/api/users/signup")
      .send({
             email:"test@test.com",
            password: "password"
      })
      .expect(401)

})

it(" sets Cookie after successful successful signup", async () => {
     const response =  await request(app)
      .post("/api/users/signup")
      .send({
             email:"test@test.com",
            password: "password"
      })
      .expect(201)
      
      expect(response.get("Set-Cookie")).toBeDefined()

})