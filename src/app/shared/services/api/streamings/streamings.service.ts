import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StreamingsService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Streanings
   *
   * @param user
   */
  public getStreamings(): any {
    return this.http.get(this.url + '/congress/getstreamings',
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }
}
