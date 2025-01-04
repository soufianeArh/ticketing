import express, {Response, Request } from "express";
import {body,  } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import {validateRequest} from "../middlewares/validate-request"
import { User } from "../models/user";
import {Password } from "../services/password";

import jwt from "jsonwebtoken"
import "express-async-errors"



const router = express.Router();

router.post(
      "/api/users/signin",
      [
            body("email")
            .isEmail()
            .withMessage("Invalid Email"),
            body("password")
            .trim()
            .notEmpty()
            .withMessage("Password must be supplied")
      ],
      validateRequest,
      async (req: Request,res: Response) => {
            const existsingUser = await User.findOne({
                  email : req.body.email
            });
            if(!existsingUser){
                   throw new BadRequestError("Email not found");
                  // throw new Error("Could not find the email")
            }
            // static async compare(storedPassword: string, suppliedPassword: string){
            //       const [hashedPassword,salt] = storedPassword.split(".")
            //       const buf = (await scryptAsync(suppliedPassword, salt , 64) ) as Buffer
            //       return buf.toString("hex") === hashedPassword
            // }
            const passwordCheck = await Password.compare(existsingUser.password, req.body.password )
            if(!passwordCheck){
                  throw new BadRequestError("Incorrect Password")
            }
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
                  res.status(200).send(existsingUser)//===existing.toJSON()
      

})

export { router as signinRouter };