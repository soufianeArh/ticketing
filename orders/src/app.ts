import express from 'express';
import cookieSession from "cookie-session";

import bodyParser from 'body-parser';

import { newOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import {showOrderRouter} from "./routes/show";
import {getAllOrderRouter} from "./routes/index"

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

app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(getAllOrderRouter);

app.all("*", async (res, req, next)=>{
      next( new NotFoundError());
})

app.use(errorHandler);

export {app}