import mongoose from "mongoose";
import {Password} from "../services/password"

interface userAttr{
      email: string,
      password:string
}
interface UserDoc extends mongoose.Document{
      email: string,
      password:string
}
interface UserModel extends mongoose.Model<UserDoc>{
      build(attr: userAttr): UserDoc
}

const userSchema = new  mongoose.Schema({
      email:{
            type: String,
            required: true
      },
      password:{
            type: String,
            required: true
      }
 },{
      toJSON:{
            transform:(doc, ret)=>{
                  ret.id = ret._id
                  delete ret._id
                  delete ret.password;
            },
            versionKey: false
      }
 })
userSchema.pre("save",async function(done){
      //isModified is true when modified and created
      //in this case we discuss the case where its created
      if(this.isModified("password")){
            
            const hashed = await Password.hash(this.get("password"));
            this.set('password', hashed)
      }
      done();
})
userSchema.statics.build = (attr:userAttr) => {
      return new User(attr)
}

const User = mongoose.model<UserDoc, UserModel> ('User',userSchema);


export { User }



