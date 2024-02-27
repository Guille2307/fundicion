import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AssistantsService } from '../assistants/assistants.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SendFileService {

  url = localStorage.getItem('API_URL');

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    public translateService: TranslateService,
    private assistantsSvc: AssistantsService
  ) { }

  public uploadFile(file: any, type: any, jobId = []): any {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    return this.http.post(this.url + '/congress/uploaddocument',
      formData,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => this.uploadFileSuccess(result, type, jobId), (result) => this.uploadFileError(result));
  }

  async uploadFileSuccess(result: any, type: any, jobId = null) {
    return await this.uploadNewFile(result.document_id, type, jobId).then((result) => result);
  }

  uploadFileError(result: any): any {
    return result;
  }

  public uploadNewFile(documentId: any, type: any, jobId = null): any {
    const json = `{
      "type": "` + type + `",
      "jobs_id": "[\\"` + jobId + `\\"]",
      "document_id": "` + documentId + `"
    }`;
    // console.log('uploadNewFile', json);
    return this.http.post(this.url + '/congress/updatedocument',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }

  public updateFile(documentId: any, type: any, jobId = null): any {
    const json = `{
      "type": "` + type + `",
      "jobs_id": ` + JSON.stringify(JSON.stringify(jobId)) + `,
      "document_id": "` + documentId + `"
    }`;
    // console.log('updateFile', json);
    return this.http.post(this.url + '/congress/updatedocument',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }

  public removeFileFromJobId(documentId: any, type: any, jobId: any): any {
    const json = `{
      "type": "` + type + `",
      "jobs_id": ` + JSON.stringify(JSON.stringify(jobId)) + `,
      "document_id": "` + documentId + `"
    }`;
    // console.log('removeFile', json);
    return this.http.post(this.url + '/congress/updatedocument',
      json,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }

  public getFiles(): any {
    return this.http.get(this.url + '/congress/getdocuments',
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }

  async getFilesUser() {
    const documents = [];
    const assistants = await this.assistantsSvc.getAssistants().then((result) => {
      return result.users;
    });

    if (assistants) {
      assistants.forEach(assistant => {
        if (assistant.id === jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
          assistant.documents.forEach(doc => {
            if (doc.type === 'profile') {
              documents.push(doc);
            }
          });
        }
      });
      return documents;
    }
  }

  async getFilesByType(id: any) {
    const documents = [];
    const assistants = await this.assistantsSvc.getAssistants().then((result) => {
      return result.users;
    });

    if (assistants) {
      assistants.forEach(assistant => {
        if (assistant.id === jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
          assistant.documents.forEach(doc => {
            if (JSON.parse(doc.job_id) !== null) {
              JSON.parse(doc.job_id).forEach(jobId => {
                if (jobId === id) {
                  documents.push(doc);
                }
              });
            }
          });
        }
      });
      return documents;
    }
  }

  async getFilesMeetCompanyByType(id: any, userId: any) {
    const documents = [];
    const assistants = await this.assistantsSvc.getAssistants().then((result) => {
      return result.users;
    });

    if (assistants) {
      assistants.forEach(assistant => {
        if (assistant.id === userId) {
          assistant.documents.forEach(doc => {
            if (JSON.parse(doc.job_id) !== null) {
              JSON.parse(doc.job_id).forEach(jobId => {
                if (jobId === id) {
                  documents.push(doc);
                }
              });
            }
          });
        }
      });
      return documents;
    }
  }

  async presentAlertSuccess() {
    const title = await this.translateService.get('UPLOAD_FILE.alert.success.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('UPLOAD_FILE.alert.success.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message,
        buttons: ['OK']
      });

      await alert.present();
    }
  }

  async presentAlertError(errorType) {
    const title = await this.translateService.get('UPLOAD_FILE.alert.error.title').toPromise()
      .then((value) => {
        return value;
      });
    const message = await this.translateService.get('UPLOAD_FILE.alert.error.message').toPromise()
      .then((value) => {
        return value;
      });
    if (title && message) {
      const alert = await this.alertController.create({
        header: title,
        message: message + ' <br>(' + errorType + ')',
        buttons: ['Ok']
      });

      await alert.present();
    }
  }

  public deleteFile(documentId): any {
    return this.http.delete(this.url + '/congress/deletedocument/' + documentId,
      {
        headers: new HttpHeaders({
          'X-Access-Token': 'Bearer ' + localStorage.getItem('selecteduserJWT')
        })
      }).toPromise()
      .then((result) => result);
  }
}
