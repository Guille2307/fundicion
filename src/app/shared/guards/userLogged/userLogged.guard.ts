import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.apiService.checkToken()
        .then((userLoggedIn) => {
          if (userLoggedIn) {
            this.router.navigate(['/menu/event']);
            resolve(false);
          }
          else {
            resolve(true);
          }
        }, () => {
          resolve(true);
        });
    });
  }
  
}
