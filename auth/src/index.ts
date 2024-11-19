import express from 'express';
import bodyParser from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler } from './middlewares/error-handlers';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';

const app = express();

app.use(bodyParser.json());

app.use(currentuserRouter)
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", async (res, req, next)=>{
      next( new NotFoundError());
})

app.use(errorHandler);

const start = async ()=>{
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