import { Publisher, OrderCreateEvent, Subjects } from "@soufiane12345/ticketing-common"

export class OrderCreatedPublisher extends Publisher<OrderCreateEvent>{
      subject: Subjects.OrderCreated = Subjects.OrderCreated

}