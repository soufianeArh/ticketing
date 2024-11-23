import express, {Response, Request } from "express";
import {body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

import { User } from "../models/user";
import {Password } from "../services/password";
import jwt from "jsonwebtoken"


const router = express.Router();

router.get(
      "/api/users/signin",
      [
            body("email")
            .isEmail()
            .withMessage("Invalid Email"),
            body("password")
            .trim()
            .notEmpty()
            .withMessage("Password must be supplied")
      ],async (req: Request,res: Response) => {
            const errorsByValidator = validationResult(req);
            if(!errorsByValidator.isEmpty()){
                  throw new RequestValidationError(errorsByValidator.array())
            }

            const existsingUser = await User.findOne({
                  email : req.body.email
            });
            if(!existsingUser){
                  throw new BadRequestError("Email not found");
            }
            // static async compare(storedPassword: string, suppliedPassword: string){
            //       const [hashedPassword,salt] = storedPassword.split(".")
            //       const buf = (await scryptAsync(suppliedPassword, salt , 64) ) as Buffer
            //       return buf.toString("hex") === hashedPassword
            // }
            const passwordCheck = await Password.compare(existsingUser.password, req.body.password )
            if(!passwordCheck){
                  throw new BadRequestError("Incorrect Password")
            }else{
                  const userJWT =  jwt.sign({
                        id:existsingUser.id,
                        email:existsingUser.email
                  },
                  process.env.JWT_KEY!
                  )
                  // console.log("userJWT: ", userJWT)
                  req.session={
                        jwt: userJWT
                  }
                  res.status(200).send(existsingUser.toJSON())
            }

})

export { router as signinRouter };