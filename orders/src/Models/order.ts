import mongoose from 'mongoose';
import { transform } from 'typescript';

interface orderAttr {
      userId:string,
      status: string,
      expiresAt: Date,
      ticketId: string
}
interface orderDoc extends mongoose.Document {
      userId:string,
      status: string,
      expiresAt: Date,
      ticketId: string
}
interface orderModel extends mongoose.Model<orderDoc>{
      build(attrs: orderAttr):orderDoc
}

const OrderSchema = new mongoose.Schema({
      userId:{
            type: String,
            required: true,
      },
      status:{
            type: String,
            required: true,
      },
      expiresAt:{
            type: mongoose.Schema.Types.Date,
      },
      ticketId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ticket'
      },
},{
      toJSON:{ transform(doc, ret){
            ret.id = ret._id,
            delete ret._id
      }}
})
OrderSchema.statics.build = (attr: orderAttr)=>{
      return new Order(attr)
}
const Order = mongoose.model<orderDoc, orderModel>('Orders', OrderSchema)

export {Order} 