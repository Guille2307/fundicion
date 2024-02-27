import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'API_URL';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url = 'https://caapi.woutick.es';

  constructor(
    private http: HttpClient
  ) { }

  setInitialURL() {
    const value = localStorage.getItem(URL);
    if (value !== null) {
      this.setURL(value);
    } else {
      this.setURL('https://caapi.woutick.es');
    }
  }

  setURL(url: string) {
    this.url = url;
    localStorage.setItem(URL, url);
  }

  public checkToken(): any {
    return this.http.get(this.url + '/congress/profile', {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise()
      .then((result) => true, (result) => false);
  }
}
