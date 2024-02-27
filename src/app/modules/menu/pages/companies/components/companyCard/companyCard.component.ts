import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModulesService } from 'src/app/shared/services/modules/modules.service';

@Component({
  selector: 'company-card',
  templateUrl: './companyCard.component.html',
  styleUrls: ['./companyCard.component.scss'],
})
export class CompanyCardComponent implements OnInit {

  @Input() company;
  social = [];
  values = [];

  constructor( 
    private router: Router,
    public modulesSvc: ModulesService
  ) { }

  ngOnInit() {
    this.social = Object.keys(JSON.parse(this.company.socialmedia));
    this.values = JSON.parse(this.company.socialmedia);
  }

  showCompany(company) {
    this.router.navigate(['/menu/info/company', company.id]);
  }

  /**
   * Función que sirve para saber si los datos de redes sociales están vacíos
   * @returns 
   */
  getBoolValues() {
    for (const k in this.values) {
      if (this.values[k]) {
        return true;
      }
    }
  }
  
  setUpperCase(value: string) {
    return value.toUpperCase();
  }
}
