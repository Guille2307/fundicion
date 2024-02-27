import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AnnotationsService } from '../../services/api/annotations/annotations.service';

@Component({
  selector: 'annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss'],
})
export class AnnotationsComponent implements OnInit {

  annotations = '';
  arrayAnnotations = [];

  @Input() otherUserId?;

  constructor(
    private annotationsService: AnnotationsService,
    public translateService: TranslateService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {}


  async getAnnotations() {
    this.arrayAnnotations = await this.annotationsService.getAnnotation(this.otherUserId).then((result) => result.Annotations);
    if (this.arrayAnnotations.length !== 0) {
      this.annotations = this.arrayAnnotations[0].annotation;
    }
  }

  saveAnnotation() {
    if (this.arrayAnnotations.length === 0) {
      this.annotationsService.setAnnotation(this.otherUserId, this.annotations).then((result) => {
        this.presentToast();
        return result;
      });
    } else {
      const annotationId = this.arrayAnnotations[0].id;
      this.annotationsService.updateAnnotation(annotationId, this.annotations).then((result) => {
        this.presentToast();
        return result;
      });
    }
  }

  async presentToast() {
    const message = await this.translateService.get('MEETINGS.startMeeting.tabs.annotations.toast').toPromise()
      .then((res) => {
        return res;
      });
    if (message) {
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000
      });
      toast.present();
    }
  }
}
