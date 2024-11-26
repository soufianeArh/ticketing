import {app} from "./app"
import mongoose from 'mongoose';


const start = async ()=>{
      if(!process.env.JWT_KEY){
            throw new Error('KWT_KEY must be defined in POD process NS!')
      }
      try{
            await  mongoose.connect("mongodb://auth-mongo-clusterip-srvs:27017/auth")
            console.log("Connected to MongoDB")
      }catch(err){
            console.log("Mongoose Connection Failed",err)
      }
      app.listen(3000, ()=>{
            console.log("express server running at 3000 via ts-node-dev");
      })
}
start()