import { PaymentCreatedEvent, Publisher, Subjects } from "@soufiane12345/ticketing-common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
      subject:Subjects.PaymentCreated = Subjects.PaymentCreated
}