import express from 'express';
import cookieSession from "cookie-session";

import bodyParser from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { errorHandler, NotFoundError } from '@soufiane12345/ticketing-common';

const app = express();
app.set('trust proxy', true )

app.use(bodyParser.json());
app.use(cookieSession({
      signed:false,
      secure:process.env.NODE_ENV !== 'test',
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

export {app}