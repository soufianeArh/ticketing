import mongoose from "mongoose";
// const mongoose = require("mongoose");

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
 })
userSchema.statics.build = (attr:userAttr) => {
      return new User(attr)
}

const User = mongoose.model<UserDoc, UserModel> ('User',userSchema);

const user = User.build({email:"hi", password:"hello"});
console.log(user)


export { User }



