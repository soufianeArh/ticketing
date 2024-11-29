import express, {Response, Request} from "express";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
      "/api/users/currentuser",
      currentUser,
      async ( req: Request , res: Response )=>{
             res.status(200).send({currentUser:req.currentUser || null})
})

export { router as currentuserRouter };