import {Request, Response, NextFunction } from "express";
import {validationResult} from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (req:Request,res:Response,next:NextFunction)=>{
      const errorsByValidator = validationResult(req);
      if(!errorsByValidator.isEmpty()){
            throw new RequestValidationError(errorsByValidator.array())
      }
      next()
}