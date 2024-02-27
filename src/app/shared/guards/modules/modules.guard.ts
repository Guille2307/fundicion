import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ModulesService } from 'src/app/shared/services/modules/modules.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ModulesGuard implements CanActivate {
  
  constructor(
    private modulesSvc: ModulesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (jwt_decode(localStorage.getItem('selecteduserJWT'))['sub'] === 'ANONYMOUS') {
        resolve(this.modulesSvc.getModules()[route.data.module].active && this.modulesSvc.getModules()[route.data.module].guest);
      }
      resolve(this.modulesSvc.getModules()[route.data.module].active);
    });
  }
  
}
