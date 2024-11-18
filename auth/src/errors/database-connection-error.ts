import {ValidationError} from "express-validator";

export class DatabaseConnectionError extends Error{
      statusCode= 500
      reason = "DB connection failed"

      constructor(){
            super();
            
            //only because we extend a class built-in language
            Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
      }

      serailizeError(){
            return [{message: this.reason}]
      }
}