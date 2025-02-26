import {Publisher, TicketUpdatevent, Subjects} from "@soufiane12345/ticketing-common";

export class TicketUpdatedPublisher extends Publisher <TicketUpdatevent>{
      subject: Subjects.TicketUpdated = Subjects.TicketUpdated
}