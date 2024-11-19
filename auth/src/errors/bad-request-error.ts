import { CustomError } from "./custom-error";
class BadRequestError extends CustomError {
      statusCode = 401;
      constructor(public msg: string){
            super(msg);
            
            //only because we extend a class built-in language
            Object.setPrototypeOf(this, BadRequestError.prototype);
      }
      serializeError(){
            return [{message:this.msg}]
      }
}

export {BadRequestError}