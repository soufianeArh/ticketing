import express from 'express';
import cookieSession from "cookie-session";

import bodyParser from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();
app.set('trust proxy', true )

app.use(bodyParser.json());
app.use(cookieSession({
      signed:false,
      secure:true,
      keys: ['key1', 'key2']
}));
app.use(currentuserRouter)
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (res, req, next)=>{
      next( new NotFoundError());
})

app.use(errorHandler);

const start = async ()=>{
      if(!process.env.JWT_KEY){
            throw new Error('KWT_KEY must be defined in POD process NS!')
      }
      try{
            await  mongoose.connect("mongodb://auth-mongo-clusterip-srvs:27017/auth")
            console.log("Connected to MongoDB")
      }catch(err){
            console.log("Mongoose Connection Failed",err)
      }
      app.listen(3000, ()=>{
            console.log("express server running at 3000 via ts-node-dev");
      })
}
start()