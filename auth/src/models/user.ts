import mongoose from "mongoose";

interface userAttr{
      email: string,
      password:string
}
interface UserModel extends mongoose.Model<any>{
      build(attr: userAttr): any
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

const User = mongoose.model<any, UserModel> ('User',userSchema);

const user = User.build({email:"", password:""});


export { User }

