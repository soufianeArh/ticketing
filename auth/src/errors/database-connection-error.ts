export class DatabaseConnectionError extends Error{
      statusCode= 500
      reason = "DB connection failed"

      constructor(){
            super();
            
            //only because we extend a class built-in language
            Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
      }

      serializeError(){
            return [{message: this.reason}]
      }
}