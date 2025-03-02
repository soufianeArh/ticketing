import mongoose from "mongoose";

interface ticketAttr {
      title:string,
      price: string,
}
interface ticketDoc extends mongoose.Document{
      title:string,
      price: string,
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
      toJSON:{
            transform:(doc, ret)=>{
                  ret.id = ret._id
                  delete ret._id
            },
      }
})
ticketSchema.statics.build = (attr:ticketAttr)=>{
      return new Ticket(attr)
}

const Ticket = mongoose.model<ticketDoc,ticketMode >('Ticket', ticketSchema);
export {Ticket , ticketDoc}