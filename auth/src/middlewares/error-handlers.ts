import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export function errorHandler(err: Error, req:Request, res: Response, next:NextFunction){
      console.log('something went wrong', err )
      if(err instanceof RequestValidationError){
            //err is []of validationErrors
            const fromattedErrors = err.errors.map(
                  error =>{ return {msg : error.msg, filed: error }}
            )
             res.status(400).send({errors: fromattedErrors})
      }
      if(err instanceof DatabaseConnectionError){
            res.status(400).send({errors:[{msg: err.reason}]})
      }else{
            res.send({errors:"hell"})
      }
}