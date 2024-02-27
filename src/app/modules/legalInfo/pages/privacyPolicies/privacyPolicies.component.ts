import { Component, OnInit } from '@angular/core';
import { LegalInfoService } from 'src/app/shared/services/legalInfo/legalInfo.service';

@Component({
  selector: 'privacy-policies',
  templateUrl: './privacyPolicies.component.html',
  styleUrls: ['./privacyPolicies.component.scss'],
})
export class PrivacyPoliciesComponent implements OnInit {

  constructor(public legalInfoSvc: LegalInfoService) { }

  ngOnInit() {}

}
