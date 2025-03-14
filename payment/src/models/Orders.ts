import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface orderAttr{
      id:string,
      status:string,
      version:number,
      userId:string,
      price:number
}
interface orderDoc extends mongoose.Document{
      id:string,
      status:string,
      version:number,
      userId:string,
      price:number
}
interface orderModel extends mongoose.Model<orderDoc>{
      build(data: orderAttr):orderDoc
}
const orderSchema = new mongoose.Schema({
      status:{
            type: String,
            require: true
      },
      version:{
            type: Number,
            require: true
      },
      userId:{
            type: String,
            require: true
      },
      price:{
            type: Number,
            require: true
      },

},{
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
          delete ret._id;
        },
      },
    });

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (data: orderAttr)=>{
      return new Order({
            _id:data.id,
            status:data.status,
            version:data.version,
            userId:data.userId,
            price:data.price
      })
}


const Order = mongoose.model<orderDoc,orderModel>( "Orders", orderSchema )

export {Order}