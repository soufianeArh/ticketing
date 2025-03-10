import mongoose from "mongoose";
import { Order } from "./order";
import { OrderStatus } from "@soufiane12345/ticketing-common";
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface ticketAttr {
      id:string
      title:string,
      price: number,
}
interface ticketDoc extends mongoose.Document{
      title:string,
      price: number,
      version: number
      isReserved(): Promise<Boolean>
}
interface ticketModel extends mongoose.Model<ticketDoc>{
      build(attr: ticketAttr): ticketDoc;
      findByIdAndPreviousVersion(eventInfo: {id:string, version:number}): Promise<ticketDoc | null >
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
    });
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin)
ticketSchema.statics.build = (attr:ticketAttr)=>{
      return new Ticket({
            _id : attr.id,
            title : attr.title,
            price : attr.price
      })
};
ticketSchema.statics.findByIdAndPreviousVersion = async (eventInfo:{id:string, version: number})=>{
     return  await Ticket.findOne({
            _id: eventInfo.id,
            version: eventInfo.version-1
      });
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

const Ticket = mongoose.model<ticketDoc,ticketModel >('Ticket', ticketSchema);
export {Ticket , ticketDoc}