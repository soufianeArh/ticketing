import express, {Response, Request} from "express";

import jwt from 'jsonwebtoken'

const router = express.Router();

router.get(
      "/api/users/currentuser",
      async ( req: Request , res: Response )=>{
         
            if( !req.session?.jwt){
                  res.send({currentUser:null, location:"nojwt"})
            }else{

            try{
                  const payload =  jwt.verify(req.session?.jwt, process.env.JWT_KEY!)
                  res.send({currentUser:payload})
            }catch(err){
                  res.send({currentUser:null, location:"verify throw err "})
            }
      }
           


})

export { router as currentuserRouter };