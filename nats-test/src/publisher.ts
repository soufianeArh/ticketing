import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";
console.clear()
const stan = nats.connect("ticketing", "abc",{
      url: 'http://localhost:4222'
})

stan.on("connect", async ()=>{
      console.log("Publisher connected to nats");
      const data = {
            id:'123',
            title:'concert007',
            price:20
      };
      try{
            await new TicketCreatedPublisher(stan).publish(data)
            console.log("event published sucess ")
      }catch(err){
            console.error(err)
      }
      
});