import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app"
let mongo:any;
beforeAll(async ()=>{
      mongo = new MongoMemoryServer();
      const mongURI = await mongo.getUri();
      await mongoose.connect(
            mongURI,
            {
            
            }
      );
})

beforeEach(async ()=>{
      const collections = await mongoose.connection.db?.collections();
      if(collections){
            for (let collection  of collections){
                  await collection.deleteMany({})
            }
      }
})

afterAll(async ()=>{
      mongo.stop(); //kill the process of mongoDB
      mongoose.connection.close()
})