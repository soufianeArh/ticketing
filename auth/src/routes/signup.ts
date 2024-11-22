import express, {Request, Response} from "express";
import {body, validationResult} from 'express-validator';
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";
import {User} from "../models/user"

import "express-async-errors"
import jwt from "jsonwebtoken"

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
      async(req: Request,res: Response)=>{
            // console.log("req.session", req.session)
            
                  const errorByValidator = validationResult(req);
                  if(!errorByValidator.isEmpty()){
                        throw new RequestValidationError(errorByValidator.array())
                  }

                  const existingUser = await User.findOne({email:req.body.email})

                  if(existingUser){
                       throw new BadRequestError('Email already in use')

                  }else{
                        const user = User.build({
                              email: req.body.email,
                              password: req.body.password
                        })
                        await user.save();
                       
                        // Generate JWT
                        const userJWT =  jwt.sign({
                              id:user.id,
                              email:user.email
                        },'SOMETHING12345')
                        // console.log("userJWT: ", userJWT)
                        req.session={
                              jwt: userJWT
                        }
                        res.status(201).send(user)
                  }
})

export { router as signupRouter };