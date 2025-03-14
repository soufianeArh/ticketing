import {  ExpirationCompleteEvent, Subjects, Publisher } from "@soufiane12345/ticketing-common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
      subject: Subjects.ExpirationComplete =Subjects.ExpirationComplete;
};