import {Publisher} from "./base-publisher"
import { Subjects } from "./subjects"
import { TicketCreateEvent } from "./ticket-created"

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
      readonly subject = Subjects.TicketCreated
}