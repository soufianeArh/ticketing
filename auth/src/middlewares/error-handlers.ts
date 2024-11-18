import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { CustomError } from '../errors/custom-error';

export function errorHandler(err: Error, req:Request, res: Response, next:NextFunction){
      // console.log('something went wrong', err )
      if(err instanceof CustomError){
            res.status(err.statusCode).send({errors: err.serializeError()})
      }
      else{
            res.send({errors:"hell"})
      }
}