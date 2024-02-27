import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LegalInfoService {

  public commercial = false;

  legalInfo = {
    name: 'Fundación Semana Verde de Galicia',
    address: 'C/ Recinto Ferial s/n, 36540, Silleda, España',
    cif: 'G36155208',
    email: 'info@feiragalicia.com',
    commercial: {
      date: '',
      protocol: '',
      register: '',
      tome: '',
      folio: '',
      sheet: ''
    }
  };

  getValuesLegalInfo() {
    return this.legalInfo;
  }
}
