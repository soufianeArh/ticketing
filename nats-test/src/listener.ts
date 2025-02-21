import nats, {Message, Stan} from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear()
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"),{
      url: 'http://localhost:4222'
})

stan.on("connect",()=>{
      console.log("Listener connected to nats");
      stan.on("close",()=>{
            console.log(
                  "Nats connection closed=please delete sub"
            );
            process.exit()
      })
      new TicketCreatedListener(stan).listen()
});

process.on('SIGINT', ()=>stan.close());
process.on('SIGTERM', ()=>stan.close());


abstract class Listener {
      abstract subject: string;
      abstract queueGroupName: string
      abstract onMessage(data:any, msg: Message): void;
      private client:Stan;
      protected ackWait = 5 * 1000

      constructor(client:Stan){
            this.client = client
            
      };
      //a motheod becasue in TS this. is accessed in controcutor or method
      subscriptionOptions(){
            return this.client
            .subscriptionOptions()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDeliverAllAvailable()
            .setDurableName(this.queueGroupName)
      }
      listen(){
            const subscription = this.client.subscribe(
                  this.subject,
                  this.queueGroupName,
                  this.subscriptionOptions()
            )
            subscription.on('message', (msg: Message)=>{
                  console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`)
                 const parsedData = this.parseMessage(msg)
                 this.onMessage(parsedData, msg)
            })
      }
      parseMessage(msg:Message){
            const data = msg.getData()
            return typeof data === 'string'
            ? JSON.parse(data)
            :JSON.parse(data.toString('utf8'))
      }
}


class TicketCreatedListener extends Listener {
      subject = "ticket:created"
      queueGroupName = "ticket-created-queue"
      onMessage = (data:any, msg: Message)=>{
            msg.ack()
      }
}

