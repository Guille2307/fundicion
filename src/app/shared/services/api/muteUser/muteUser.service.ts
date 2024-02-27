import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MuteUserService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient) { }

  public mute(id) {
    const json = `{
      "idAssistant":"` + id + `"
    }`;
    return this.http.post(this.url + '/congress/mute',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public unmute(id) {
    const json = `{
      "idAssistant":"` + id + `"
    }`;
    return this.http.post(this.url + '/congress/unmute',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public mutedPeople() {
    return this.http.get(this.url + '/congress/mutedpeople',
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }
}
