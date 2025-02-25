import {app} from "./app"
import mongoose from 'mongoose';
import { natsWrapper } from "./nats-wrapper";


const start = async ()=>{
      if(!process.env.JWT_KEY){
            throw new Error('KWT_KEY must be defined in POD process NS!')
      }
      if(!process.env.MONGO_URI){
            throw new Error("DB Uri not added to Environment valirable")
      }
      try{
            await natsWrapper.connect("ticketing", "abc", "http://nats-clusterip-srvs:4222")
            console.log("Connected to Nats")
            await  mongoose.connect(process.env.MONGO_URI)
            console.log("Connected to MongoDB")
      }catch(err){
            console.log("Mongoose Connection Failed",err)
      }
      app.listen(3000, ()=>{
            console.log("express server running at 3000 via ts-node-dev");
      })
}
start()