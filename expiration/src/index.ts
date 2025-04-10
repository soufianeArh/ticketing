import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";


const start = async ()=>{
   
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

          await new OrderCreatedListener(natsWrapper.client).listen()
          
      }catch(err){
            console.log("Mongoose Connection Failed",err)
      }
    
}
start()