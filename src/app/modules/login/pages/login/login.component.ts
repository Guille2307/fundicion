import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api/api.service';
import { UserLoginService } from 'src/app/shared/services/api/loginUser/loginUser.service';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  thereAreLoggedAccounts = false;

  savedUsers = [
    {
      imgUrl: 'https://www.debate.com.mx/__export/1594498933376/sites/debate/img/2020/07/11/woman-waving-hair-1898555_1_crop1594498901221.jpg_556535509.jpg',
      name: 'Zoe',
      lastname: 'Soto',
      username: 'souiseta',
      token: ''
    }
  ];

  constructor(
    private router: Router,
    private usersSvc: UsersService,
    private apiSvc: ApiService,
    public permissionsSvc: PermissionsService,
    private loginSvc: UserLoginService
  ) {
    // this.savedUsers = this.usersSvc.getSavedUsers();
    // if (this.savedUsers.length !== 0) {
    //   this.thereAreLoggedAccounts = true;
    // }
    this.apiSvc.setInitialURL();
  }

  ngOnInit() {
    // localStorage.setItem('selecteduserJWT', null);
  }

  createAccount() {
    this.router.navigate(['/signup']);
  }

  login() {
    this.router.navigate(['/login/account']);
  }

  accessLoginSaved(user) {
    this.usersSvc.setSelectedUser(user);
    this.router.navigate(['/login/account/' + user.username]);
  }

  loginWithoutAccount() {
    this.loginSvc.loginGuest().then((result) => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

}
