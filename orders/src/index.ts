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
      if(!process.env.NATS_CLUSTER_ID){
            throw new Error("DB Uri not added to Environment valirable")
      }
      if(!process.env.NATS_CLIENT_ID){
            throw new Error("DB Uri not added to Environment valirable")
      }
      if(!process.env.NATS_URL){
            throw new Error("DB Uri not added to Environment valirable")
      }
      try{
            await natsWrapper.connect(
                  process.env.NATS_CLUSTER_ID, 
                  process.env.NATS_CLIENT_ID, 
                  process.env.NATS_URL);
            console.log("Connected to Nats")
            natsWrapper.client.on("close", () => {
                  console.log("closing terminal after chatching close event to end nats connection ");
                  process.exit()
            })
            process.on("SIGINT", () => natsWrapper.client.close())
            process.on("SIGTERM", () => natsWrapper.client.close())

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