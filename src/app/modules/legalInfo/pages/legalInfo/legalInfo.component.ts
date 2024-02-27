import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'legal-info',
  templateUrl: './legalInfo.component.html',
  styleUrls: ['./legalInfo.component.scss'],
})
export class LegalInfoComponent implements OnInit {

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private router: Router,
  ) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
    // this.navCtrl.navigateBack('/login');
  }
}
