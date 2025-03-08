import mongoose from 'mongoose';
import { OrderStatus } from '@soufiane12345/ticketing-common';
import { ticketDoc } from './ticket';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface orderAttr {
      userId:string,
      status: OrderStatus,
      expiresAt: Date,
      ticket: ticketDoc
}
interface orderDoc extends mongoose.Document {
      userId:string,
      version: number
      status: OrderStatus,
      expiresAt: Date,
      ticket: ticketDoc
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
            enum: Object.values(OrderStatus),
            default: OrderStatus.Created
      },
      expiresAt:{
            type: mongoose.Schema.Types.Date,
      },
      ticket:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
      },
},
      {
            toJSON: {
              transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
              },
            },
          }
)
OrderSchema.set("versionKey", "version");
OrderSchema.plugin(updateIfCurrentPlugin)
OrderSchema.statics.build = (attr: orderAttr)=>{
      return new Order(attr)
}
const Order = mongoose.model<orderDoc, orderModel>('Orders', OrderSchema)

export {Order} 