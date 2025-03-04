import { requireAuth, validateRequest } from "@soufiane12345/ticketing-common";
import express, {Request, Response} from "express";
import { Order } from "../Models/order";

const router = express.Router();

router.get("/api/orders",
      requireAuth,
      async (req: Request, res: Response) => {
      const orders = await Order.find({ userId: req.currentUser!.id})
      const ordersPopulated =  await Order.find({ userId: req.currentUser!.id})
      .populate('ticket')
})

export { router as getAllOrderRouter };