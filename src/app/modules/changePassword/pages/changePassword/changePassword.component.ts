import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PermissionsService } from 'src/app/shared/services/permissions/permissions.service';

@Component({
  selector: 'change-password',
  templateUrl: './changePassword.component.html',
  styleUrls: ['./changePassword.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router,
    public permissionsSvc: PermissionsService,
  ) { }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
