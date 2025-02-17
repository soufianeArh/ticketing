import nats from "node-nats-streaming";
console.clear()
const stan = nats.connect("ticketing", "abc",{
      url: 'http://localhost:4222'
})

stan.on("connect",()=>{
      console.log("Publisher connected to nats");
      const data = JSON.stringify({
            id:'123',
            title:'concert007',
            price:20
      });

      stan.publish("ticket:created", data, ()=>
            {
            console.log("event published to nats successfully");
      })
});