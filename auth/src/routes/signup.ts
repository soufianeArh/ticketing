import express, {Request, Response} from "express";
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
const router = express.Router();

router.get(
      "/api/users/signup",
      [
            body('email')
            .isEmail()
            .withMessage("Email Invalid"),
            body("password")
            .trim()
            .isLength({min:4,max:20})
            .withMessage("Password must be between 4 and 20")
      ],
      (req: Request,res: Response)=>{
      const errorByValidator = validationResult(req);
      if(!errorByValidator.isEmpty()){
            throw new RequestValidationError(errorByValidator.array())
      }
      throw new DatabaseConnectionError()
})

export { router as signupRouter };