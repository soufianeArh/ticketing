import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

//interface augmentation 
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asssdfasdf";
  process.env.NODE_ENV = "test";


  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
},30000);

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});


global.signin = async () => {
  const response = await request(app)
  .post("/api/users/signup")
  .send({
        email:"test@test.com",
        password: "password"
  })
  .expect(201)
  const cookiesArr = response.get("Set-Cookie")
  if (!cookiesArr) {
    throw new Error("Failed to get cookie from response");
  }
  return cookiesArr
}