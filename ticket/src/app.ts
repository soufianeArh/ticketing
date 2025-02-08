import express from 'express';
import cookieSession from "cookie-session";

import bodyParser from 'body-parser';

import { newTicketRouter } from './routes/new';
import { getTicketRouter } from "./routes/show"

import { errorHandler, NotFoundError, currentUser } from '@soufiane12345/ticketing-common';

const app = express();
app.set('trust proxy', true )

app.use(bodyParser.json());
app.use(cookieSession({
      signed:false,
      secure:process.env.NODE_ENV !== 'test',
      keys: ['key1', 'key2']
}));

app.use(currentUser);

app.use(newTicketRouter);
app.use(getTicketRouter);


app.all("*", async (res, req, next)=>{
      next( new NotFoundError());
})

app.use(errorHandler);

export {app}