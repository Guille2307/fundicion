import { Component, OnInit } from '@angular/core';
import { LegalInfoService } from 'src/app/shared/services/legalInfo/legalInfo.service';

@Component({
  selector: 'terms-of-use',
  templateUrl: './termsOfUse.component.html',
  styleUrls: ['./termsOfUse.component.scss'],
})
export class TermsOfUseSideComponent implements OnInit {

  constructor(public legalInfoSvc: LegalInfoService) { }

  ngOnInit() {}

}
