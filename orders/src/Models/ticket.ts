import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@soufiane12345/ticketing-common";

interface ticketAttr {
      id:string
      title:string,
      price: number,
}
interface ticketDoc extends mongoose.Document{
      title:string,
      price: number,
      isReserved(): Promise<Boolean>
}
interface ticketMode extends mongoose.Model<ticketDoc>{
      build(attr: ticketAttr): ticketDoc
}


const ticketSchema = new mongoose.Schema({
      title:{
            type: String,
            required: true
      },
      price: {
            type: Number,
            required: true,
            min:0
      },
},{
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    })
ticketSchema.statics.build = (attr:ticketAttr)=>{
      return new Ticket({
            _id : attr.id,
            title : attr.title,
            price : attr.price
      })
};
ticketSchema.methods.isReserved = async function(){
      const existingOrder =  await Order.findOne({
            ticket:this,
            status:{
                  $in:[
                        OrderStatus.Created,
                        OrderStatus.AwaitingPayment,
                        OrderStatus.Complete
                  ]
            }
      })
      return !!existingOrder
}

const Ticket = mongoose.model<ticketDoc,ticketMode >('Ticket', ticketSchema);
export {Ticket , ticketDoc}