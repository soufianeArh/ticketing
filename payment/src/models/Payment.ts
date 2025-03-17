import mongoose from "mongoose"

interface paymentAttr{
      orderId: string,
      stripeId: string
}
interface paymentDoc extends mongoose.Document {
      orderId: string,
      stripeId: string
}
interface paymentModel extends mongoose.Model<paymentDoc>{
      build(attr:paymentAttr ): paymentDoc
}

const paymentSchema = new mongoose.Schema({
      orderId:{
            type: String,
            required: true
      },
      stripeId:{
            type: String,
            required: true
      }
}, {
      toJSON:{
            transform(dot,ret){
                  ret.id = ret._id,
                  delete ret._id
            }
      }
})
paymentSchema.statics.build = (attr: paymentAttr)=>{
      return new Payment({ orderId:attr.orderId, stripeId:attr.orderId })
}
const Payment= mongoose.model<paymentDoc,paymentModel>( "payment", paymentSchema )
export {Payment}