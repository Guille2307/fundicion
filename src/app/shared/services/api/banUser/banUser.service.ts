import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BanUserService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient) { }

  public banUser(id) {
    const json = `{
      "idAssistant":"` + id + `"
    }`;
    return this.http.post(this.url + '/congress/ban',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public unbanUser(id) {
    const json = `{
      "idAssistant":"` + id + `"
    }`;
    return this.http.post(this.url + '/congress/unban',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }

  public bannedList() {
    return this.http.get(this.url + '/congress/bannedpeople',
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise().then((result) => result);
  }
}
