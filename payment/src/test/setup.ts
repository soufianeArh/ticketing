import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

//interface augmentation
declare global {
  var signinG: () => string[];
}
jest.mock("../nats-wrapper");
// jest.mock("../stripe")

process.env.STRIPE_KEY = "sk_test_51R3CP2CluobIk5XB67rIsZtknRU2D4JaYUXSQu6qloKVqlKWroC0pTw1PjAY2FBSufiO5m5KBJrnC5Jr5PKsLLPr00NbOQ0SNC";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asssdfasdf";
  process.env.NODE_ENV = "test";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
},30000);

beforeEach(async () => {
  jest.clearAllMocks()
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


export function signin(id: string) {
//fake payload
const payload = {
  id,
  email:"test@test.com"
}
//create JWT
const token =  jwt.sign(payload, process.env.JWT_KEY!)
//build the session object
const session = {jwt: token}
//turn session into JSON 
const sessionJSON = JSON.stringify(session);
//generate jwt base64
const base64 = Buffer.from(sessionJSON).toString('base64')
//return jwt base64 in cookie format (auto by res.send)
return [`session=${base64}`]
}



global.signinG =  ()=> {
  //fake payload
  const payload = {
    id:"12fhb34er43t",
    email:"test@test.com"
  }
  //create JWT
  const token =  jwt.sign(payload, process.env.JWT_KEY!)
  //build the session object
  const session = {jwt: token}
  //turn session into JSON 
  const sessionJSON = JSON.stringify(session);
  //generate jwt base64
  const base64 = Buffer.from(sessionJSON).toString('base64')
  //return jwt base64 in cookie format (auto by res.send)
  return [`session=${base64}`]
}