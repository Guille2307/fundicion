import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StreamingsService } from '../../services/api/streamings/streamings.service';

@Injectable({
  providedIn: 'root'
})
export class CheckStreamingGuard implements CanActivate {

  constructor(
    private router: Router,
    public streamingsService: StreamingsService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.streamingsService.getStreamings()
        .then((result) => {
          if (result.Streaming.length === 1) {
            sessionStorage.setItem('roomNumber', '1');
            this.router.navigate(['/menu/streamings/id/', result.Streaming[0].id]);
            resolve(false);
          } else {
            resolve(true);
          }
      }, () => {
        resolve(true);
      });
    });
  }
}
