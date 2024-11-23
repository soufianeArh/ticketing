import {ValidationError} from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError{
      statusCode =400;

      constructor(public errors: ValidationError[],){
            super('invalid request params');

            //only because we extend a class built-in language
            Object.setPrototypeOf(this, RequestValidationError.prototype);
      }
      test=this.errors.map((error)=>{
            return {message: error.msg}
      })
      serializeError(){
            return this.errors.map((error)=>{
                  return {message: error.msg}
            })
      }
}