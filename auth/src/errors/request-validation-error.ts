import {ValidationError} from "express-validator";
interface CustomErrors{
      statusCode:number,
      serializeError():{
            message:string,
            field?:string
      }[]
}
export class RequestValidationError extends Error implements CustomErrors{
      statusCode =400;

      constructor(public errors: ValidationError[],){
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