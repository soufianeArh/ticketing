import {app} from "./app"
import mongoose from 'mongoose';


const start = async ()=>{
      if(!process.env.JWT_KEY){
            throw new Error('KWT_KEY must be defined in POD process NS!')
      }
      if(!process.env.MONGO_URI){
            throw new Error('mONGO uRL NOT ADDED AS ENV')
      }
      try{
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