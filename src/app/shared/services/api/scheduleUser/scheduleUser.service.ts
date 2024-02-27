import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from '../../event/event.service';
import { SpeakersService } from '../speakers/speakers.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleUserService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient,
    private eventSvc: EventService,
    private speakersSvc: SpeakersService
  ) { }

  public addToSchedule(scheduleId): any {
    const json = `{
      "schedule_id": "` + scheduleId + `"
    }`;
    return this.http.post(this.url + '/congress/assistance', json,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }

  public deleteFromSchedule(scheduleId): any {
    return this.http.delete(this.url + '/congress/assistance?schedule_id=' + scheduleId,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }

  getSchedule() {
    return this.eventSvc.getEvent().schedule;
  }

  public getInfoSchedule(id) {
    return this.http.get(this.url + '/congress/schedule/' + id,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }
}
