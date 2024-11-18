import {ValidationError} from "express-validator";

export class RequestValidationError extends Error{
      statusCode =400;

      constructor(public errors: ValidationError[]){
            super();
            
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