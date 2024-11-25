import express, {Response, Request} from "express";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
      "/api/users/currentuser",
      currentUser,
      requireAuth,
      async ( req: Request , res: Response )=>{
             res.send({currentUser:req.currentUser || null})
})

export { router as currentuserRouter };