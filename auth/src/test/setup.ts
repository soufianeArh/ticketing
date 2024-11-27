import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import {app} from "../app"
beforeAll(async ()=>{
      const mongo = new MongoMemoryServer();
      const mongURI = await mongo.getUri();
      await mongoose.connect(
            mongURI,
            {
            
            }
      );
})