import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssistantsService } from 'src/app/shared/services/api/assistants/assistants.service';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';

@Component({
  selector: 'companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {

  public query: any = '';

  companies?;

  constructor(
    private router: Router,
    private assistantsSvc: AssistantsService,
    public loadingSvc: LoadingService
  ) {
    // this.loadingSvc.presentLoading();
  }

  ngOnInit() {
    this.getCompanies();
  }

  async getCompanies() {
    this.companies = await this.assistantsSvc.getAssistants().then((result) => {
      const users = [];
      result.users.forEach((user) => {
        if (user.role === 'BASIC' || user.role === 'MEDIUM' || user.role === 'PREMIUM') {
          users.push(user);
        }
      });
      this.loadingSvc.loadingDismiss();
      return users.sort((a, b) => {
        if (this.returnPos(a.role) < this.returnPos(b.role)) {
          return 1;
        }
        if (this.returnPos(a.role) > this.returnPos(b.role)) {
          return -1;
        }
        if (a.name && b.name) {
          if (a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) {
            return 1;
          }
          if (a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) {
            return -1;
          }
        }
        return 0;
      });
    }).catch((err) => {
      return null;
    });
  }

  returnPos(role) {
    switch (role) {
      case 'BASIC':
        return 1;
      case 'MEDIUM':
        return 2;
      case 'PREMIUM':
        return 3;
    }
  }

  separate(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.name[0] !== undefined) {
        return (record.name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = (records[recordIndex - 1].name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const firstCurrent = (record.name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }

    return null;
  }

  goToChat() {
    this.router.navigate(['/menu/chats']);
  }

  showCompany(company) {
    this.router.navigate(['/menu/info/company', company.id]);
  }
}
