import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@soufiane12345/ticketing-common";
import express, {Request, Response, NextFunction} from "express"
import {body} from "express-validator";
import { Order } from "../models/Orders";
import {stripe} from "../stripe"

const router = express.Router();

router.post(
      "/api/payment",
      requireAuth,
      [
            body("token")
            .not()
            .isEmpty(),
            body("orderId")
            .not()
            .isEmpty()
      ],
      validateRequest,
      async (req:Request, res:Response, next:NextFunction)=>{
            //find the oder
            //check of userId is req.currentUser.id
            //check if order is not cancelled
            try{
                  const order = await Order.findOne({_id: req.body.orderId})
                  if(!order){
                        throw new NotFoundError()
                  }
                  if(order.userId !== req.currentUser!.id){
                        throw new NotAuthorizedError()
                  }
                  if(order.status === OrderStatus.Canceled){
                        throw new BadRequestError("this is already cancelled")
                  }

                  res.send({success:true});
                  await stripe.charges.create({
                        currency: "usd",
                        amount: order.price*100,
                        source:req.body.token
                  })
                  res.send({success:true})

            }
            catch(err){next(err)}
           


} )

export {router as CreateChargeRouter}