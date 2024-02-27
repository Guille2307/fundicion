import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading;

  constructor(
    public loadingController: LoadingController
  ) { }
  
  public async presentLoading() {
    this.loading = await this.loadingController.create({
      translucent: true,
      cssClass: 'loading-class',
    });
    await this.loading.present();
  }

  public loadingDismiss() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
