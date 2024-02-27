import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss'],
})
export class ProgramComponent implements OnInit {

  @Input() query = '';
  schedule?;

  constructor(
    private eventSvc: EventService
  ) {
    this.getSchedule();
  }

  ngOnInit() { }

  async getSchedule() {
    const selectedEvent = await this.eventSvc.showInfoEvent()
      .then((result) => result);
    if (selectedEvent) {
      this.schedule = selectedEvent.schedule;
    }
  }
}
