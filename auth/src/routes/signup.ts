import express, {Request, Response} from "express";
import {body, validationResult} from 'express-validator';

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
            // res.status(400).send(errorByValidator.array());
            throw new Error("Invalid email or password")

      }

      throw new Error("problem connecting to db....")
})

export { router as signupRouter };