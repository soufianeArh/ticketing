import {ValidationError} from "express-validator";

export class RequestValidationError extends Error{
      constructor(public errors: ValidationError[]){
            super();
            
            //only because we extend a class built-in language
            Object.setPrototypeOf(this, RequestValidationError.prototype);
      }
      
}