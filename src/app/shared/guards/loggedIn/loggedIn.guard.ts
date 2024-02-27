import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.apiService.checkToken()
        .then((userLoggedIn) => {
          if (userLoggedIn) {
            resolve(true);
          }
          else {
            this.router.navigate(['/login']);
            resolve(false);
          }
        }, () => {
          this.router.navigate(['/login']);
        });
    });
  }

}
