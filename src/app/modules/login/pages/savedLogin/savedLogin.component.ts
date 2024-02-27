import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'saved-login',
  templateUrl: './savedLogin.component.html',
  styleUrls: ['./savedLogin.component.scss'],
})
export class SavedLoginComponent implements OnInit {

  selectedUser: any = {};

  constructor(
    private router: Router,
    private usersSvc: UsersService
  ) { }

  ngOnInit() {
    this.selectedUser = this.usersSvc.getSelectedUser();
  }

  loginOtherAccount() {
    this.router.navigate(['/login/account']);
  }

}
