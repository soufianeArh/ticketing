import express, {Response, Request} from "express";
import {body, validationResult} from 'express-validator'

const router = express.Router();

router.get(
      "/api/users/currentuser",
      ( req: Request , res: Response )=>{
            

})

export { router as currentuserRouter };