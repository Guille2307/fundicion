import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventService } from '../../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  url = localStorage.getItem('API_URL');

  speakers?= [];

  constructor(
    private http: HttpClient,
    private eventSvc: EventService
  ) { }

  getAllSpeakers(schedule): any {
    const speakers = [];
    this.eventSvc.getEvent().schedule.forEach(item => {
      item.speakers.forEach(speaker => {
        const speakerValue = speaker;
        speakerValue.location = item.location;
        speakerValue.starts = item.starts;
        speakerValue.activity = item.title;
        speakers.push(speaker);
      });
    });
    return speakers;
  }

  public addSpeaker(speakerId, scheduleId) {
    const json = `{
      "speaker_id": "` + speakerId + `",
      "schedule_id": "` + scheduleId + `"
    }`;
    return this.http.post(this.url + '/congress/addspeaker',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public deleteSpeaker(scheduleId) {
    return this.http.delete(this.url + '/congress/deletespeaker/' + scheduleId,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public getSpeakers() {
    return this.http.get(this.url + '/congress/getspeakers',
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public getInfoSpeaker(id) {
    return this.http.get(this.url + '/congress/speaker/' + id,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }
}
