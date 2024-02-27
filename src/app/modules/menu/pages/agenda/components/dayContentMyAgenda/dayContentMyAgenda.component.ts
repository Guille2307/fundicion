import { Component, Input, OnInit } from '@angular/core';
import { ScheduleUserService } from 'src/app/shared/services/api/scheduleUser/scheduleUser.service';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'day-content-my-agenda',
  templateUrl: './dayContentMyAgenda.component.html',
  styleUrls: ['./dayContentMyAgenda.component.scss'],
})
export class DayContentMyAgendaComponent implements OnInit {

  @Input() day?;
  myAgenda ? = [];

  constructor(
    private eventSvc: EventService,
    private scheduleUserSvc: ScheduleUserService
  ) { }

  ngOnInit() {
    this.getEventInfo();
  }

  /**
   * Get info of the event
   */
  async getEventInfo() {
    const schedule = await this.eventSvc.showInfoEvent()
      .then((result) => result.schedule);

    if (schedule) {
      schedule.forEach(item => {
        if (item.assistance && this.conditionDay(item)) {
          this.myAgenda.push(item);
        }
      });
    }
  }

  conditionDay(item) {
    const date = new Date(item.starts);
    if (date.getDate() === new Date(this.day).getDate() && date.getMonth() === new Date(this.day).getMonth()) {
      return true;
    }
    return false;
  }

}
