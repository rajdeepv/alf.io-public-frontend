import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { TicketService } from '../shared/ticket.service';
import { TicketInfo } from '../model/ticket-info';
import { zip } from 'rxjs';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html'
})
export class ViewTicketComponent implements OnInit {

  event: Event;
  ticketIdentifier: string;
  ticketInfo: TicketInfo;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private eventService: EventService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ticketIdentifier = params['ticketId'];

      const eventShortName = params['eventShortName'];

      zip(this.eventService.getEvent(eventShortName), this.ticketService.getTicketInfo(eventShortName, this.ticketIdentifier)).subscribe( ([event, ticketInfo]) => {
        this.event = event;
        this.ticketInfo = ticketInfo;
      })
      
      //TODO: add navigation here if the route does not correspond!
    });
  }

}
