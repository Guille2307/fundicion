import { Component, OnInit } from '@angular/core';
import { LegalInfoService } from 'src/app/shared/services/legalInfo/legalInfo.service';

@Component({
  selector: 'cookies-policies',
  templateUrl: './cookiesPolicies.component.html',
  styleUrls: ['./cookiesPolicies.component.scss'],
})
export class CookiesPoliciesSideComponent implements OnInit {

  constructor(public legalInfoSvc: LegalInfoService) { }

  ngOnInit() {}

}
