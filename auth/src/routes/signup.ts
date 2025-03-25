import express, {Request, Response} from "express";
import {body, validationResult} from 'express-validator';
import { BadRequestError, validateRequest } from "@soufiane12345/ticketing-common";

import {User} from "../models/user"

import "express-async-errors"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post(
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
      validateRequest,
      async(req: Request,res: Response)=>{
                  const existingUser = await User.findOne({email:req.body.email})

                  if(existingUser){
                       throw new BadRequestError('Email already in use')

                  }else{
                        //User.build is a static method addewd via userSDhcema.static.build
                        const user = User.build({
                              email: req.body.email,
                              password: req.body.password
                        })
                        //that function will hash userSchema.pre("save",....
                        await user.save();
                       
                        const userJWT =  jwt.sign({
                              id:user.id,
                              email:user.email
                        },
                        process.env.JWT_KEY!
                        )
                        // console.log("userJWT: ", userJWT)
                        req.session={
                              jwt: userJWT
                        }
                       
                        res.status(201).send(user)
                  }
})

export { router as signupRouter };