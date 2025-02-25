import {Publisher, TicketCreateEvent, Subjects} from "@soufiane12345/ticketing-common";

export class TicketCreatedPublisher extends Publisher <TicketCreateEvent>{
      subject: Subjects.TicketCreated = Subjects.TicketCreated
}