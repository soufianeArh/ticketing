import express from 'express';
import bodyParser from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'

const app = express();

app.use(bodyParser.json());

app.use(currentuserRouter)
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, ()=>{
      console.log("express server running at 3000 via ts-node-dev");
      console.log("test21")
})
