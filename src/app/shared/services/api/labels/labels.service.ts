import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient,
  ) { }

  public setLabel(userId, label): any {
    const json = `{
      "userLabel_id": "` + userId + `",
      "label": "` + label + `"
    }`;
    return this.http.post(this.url + '/congress/setlabel',
    json,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }

  public updateLabel(labelId, label): any {
    const json = `{
      "label_id": "` + labelId + `",
      "label": "` + label + `"
    }`;
    return this.http.post(this.url + '/congress/updatelabel',
    json,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }

  public getLabel(userId): any {
    return this.http.get(this.url + '/congress/showlabelforuser/' + userId,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }

  public deleteLabel(labelId): any {
    return this.http.delete(this.url + '/congress/deletelabel/' + labelId,
    {
      headers: new HttpHeaders({
        'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
      })
    }).toPromise().then((result) => result);
  }
}
