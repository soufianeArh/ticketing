import { Subjects, Publisher, OrderCancelEvent } from "@soufiane12345/ticketing-common"
export class OrderCancelledPublisher extends Publisher<OrderCancelEvent>{
      subject : Subjects.OrderCancelled = Subjects.OrderCancelled
}