import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface userPayload {
      id:string,
      email: string
}
declare global {
      namespace Express{
            interface Request {
                  currentUser?:userPayload
            }
      }
}
export const currentUser = async (req:Request, res:Response, next:NextFunction) => {
      if(!req.session?.jwt){
            next()
      }else{
            try{
                  const payload = jwt.verify(
                        req.session.jwt,
                        process.env.JWT_KEY!
                  ) as userPayload
                  req.currentUser = payload
            }catch(err){
                next()
            }
            next()
      }
 

}