import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export function errorHandler(err: Error, req:Request, res: Response, next:NextFunction){
      console.log('something went wrong', err )
      if(err instanceof RequestValidationError){
            res.status(err.statusCode).send({errors: err.test})
      }
      else if(err instanceof DatabaseConnectionError){
            res.status(err.statusCode).send({errors: err.serailizeError()})
      }
      else{
            res.send({errors:"hell"})
      }
}