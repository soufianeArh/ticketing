import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
      statusCode = 401;
      constructor(){
            super("Not Signed-In");
            Object.setPrototypeOf(this, NotAuthorizedError.prototype)
      }
      serializeError(){
            return [{message: "Not Signed-In"}]
      }
}