import express, {Response, Request} from "express";
import {body, validationResult} from 'express-validator'

const router = express.Router();

router.get(
      "/api/users/currentuser",
      [
            body('email')
            .isEmail()
            .withMessage("Email Invalid"),
            body("password")
            .trim()
            .isLength({min:4,max:20})
            .withMessage("Password must be between 4 and 20")
      ],
      ( req: Request , res: Response )=>{
            //validation is executed in middlwares not in validationResult(req)
            const errorsByValidation = validationResult(req);
            console.log(errorsByValidation)
            if(!errorsByValidation.isEmpty()){
                  console.log(errorsByValidation.array());
                  res.status(400).send(errorsByValidation.array());
            }

            const {email, password} = req.body;
            console.log(email, password);

})

export { router as currentuserRouter };