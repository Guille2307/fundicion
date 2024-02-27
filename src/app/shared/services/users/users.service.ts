import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private selectedUser: any = {};

  private savedUsers = [];

  constructor() { }

  public setSelectedUser(user) {
    this.selectedUser = user;
    localStorage.setItem('selecteduserJWT', user.token);
  }

  public getSelectedUser() {
    return this.selectedUser;
  }

  public getInitialSavedUsers() {
    Object.keys(localStorage).forEach(item => {
      const jwt = item[0] + item[1] + item[2];
      if (jwt === 'JWT') {
        this.savedUsers.push(jwt_decode(localStorage.getItem(item)));
      }
    });
    return this.savedUsers;
  }

  public saveUserJWT(jwt: any, username: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem('JWT' + username, jwt);
    }
  }

  public getUserJWT(username: string) {
    return localStorage.getItem('JWT' + username);
  }

  public clearCurrentUserJWT(username: string): void {
    localStorage.setItem('JWT' + username, null);
  }

  public removeSelectedUser() {
    sessionStorage.clear();
    localStorage.setItem('selecteduserJWT', null);
  }
}
