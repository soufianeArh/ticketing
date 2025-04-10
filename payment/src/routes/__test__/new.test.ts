import request  from "supertest";
import {app} from "../../app";
import { signin } from "../../test/setup";
import mongoose from "mongoose";
import {Order} from "../../models/Orders"
import { OrderStatus } from "@soufiane12345/ticketing-common";
import {stripe} from "../../stripe";
import {Payment} from "../../models/Payment";

it("retuen 404 when no user order found ", async()=>{
      await request(app)
      .post("/api/payment")
      .set("Cookie", signin(new mongoose.Types.ObjectId().toHexString() ))
      .send({
            orderId:new mongoose.Types.ObjectId().toHexString(),
            token:"assdw"
      })
      .expect(404)
})
it("retuen 401 when user not same as order.userId",async ()=>{
      //create order with random userID
      //make charge request with another userId
      const order = Order.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            status:OrderStatus.Canceled,
            version:0,
            userId:new mongoose.Types.ObjectId().toHexString(),
            price:12
      });
      await order.save();
      await request(app)
      .post("/api/payment")
      .set("Cookie", signin(new mongoose.Types.ObjectId().toHexString()))//id:random
      .send({
            orderId:order.id,
            token:"assdw"
      }).expect(401)
})
it("return 400 when order cancelled", async ()=>{
      //create an order with declared used id
      //make the Order status cancelled
      //make request with token of same userId
      //expect 400 bad request already cancelled
      const sameId = new mongoose.Types.ObjectId().toHexString();
      const order = Order.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            status:OrderStatus.Canceled,
            version:0,
            userId:sameId,
            price:12
      });
      order.set({status:OrderStatus.Canceled})
      await order.save();
      await request(app)
      .post("/api/payment")
      .set("Cookie", signin(sameId))//id:random
      .send({
            orderId:order.id,
            token:"assdw"
      }).expect(400)

});
// it("retuen 201 when token valid and same userId ", async()=>{
//       const sameId = new mongoose.Types.ObjectId().toHexString();
//       const order = Order.build({
//             id:new mongoose.Types.ObjectId().toHexString(),
//             status:OrderStatus.Created,
//             version:0,
//             userId:sameId,
//             price:12
//       });
//       await order.save();
//       await request(app)
//       .post("/api/payment")
//       .set("Cookie", signin(sameId))//id:random
//       .send({
//             orderId:order.id,
//             token:"tok_visa"
//       }).expect(201)

//       const chargedOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]
//       expect(chargedOptions.currency).toEqual("usd")
// })

it("retuen 201 + test direct request to stripe API ", async()=>{
      const sameId = new mongoose.Types.ObjectId().toHexString();
      const price = Math.floor(Math.random()*10000)
      const order = Order.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            status:OrderStatus.Created,
            version:0,
            userId:sameId,
            price:price
      });
      await order.save();
      await request(app)
      .post("/api/payment")
      .set("Cookie", signin(sameId))//id:random
      .send({
            orderId:order.id,
            token:"tok_visa"
      }).expect(201)
      //imported strip is the actual one
      const stripeCharges = await stripe.charges.list({limit:50})
      const stripeCharge = stripeCharges.data.find(charge=> charge.amount === price*100);
      //
      expect(stripeCharge).toBeDefined();
});
it("payment saved after charge sucess ", async()=>{
      const sameId = new mongoose.Types.ObjectId().toHexString();
      const price = Math.floor(Math.random()*10000)
      const order = Order.build({
            id:new mongoose.Types.ObjectId().toHexString(),
            status:OrderStatus.Created,
            version:0,
            userId:sameId,
            price:price
      });
      await order.save();
      await request(app)
      .post("/api/payment")
      .set("Cookie", signin(sameId))//id:random
      .send({
            orderId:order.id,
            token:"tok_visa"
      }).expect(201)
      const stripeCharges = await stripe.charges.list({limit:50})
      const stripeCharge = stripeCharges.data.find(charge=> charge.amount === price*100);
      //
      expect(stripeCharge).toBeDefined();//charge will be undefined or obj
      
      const payment = await Payment.findOne({orderId:order.id, stripeId: stripeCharge!.id})
      expect(payment).toBeDefined();//paymnet might be null or defined
      
})

