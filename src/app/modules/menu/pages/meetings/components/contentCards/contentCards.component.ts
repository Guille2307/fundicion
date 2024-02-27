import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { LoadingService } from "src/app/shared/services/loading/loading.service";

@Component({
  selector: "content-cards",
  templateUrl: "./contentCards.component.html",
  styleUrls: ["./contentCards.component.scss"],
})
export class ContentCardsComponent implements OnInit {
  @Input() meetings: any = [];
  @Input() typeSub;
  @Input() query: any = "";

  companies?;
  assistants: any = [];

  thereIsOneRole = true;

  constructor(
    private router: Router,
    private assistantsSvc: AssistantsService,
    public loadingSvc: LoadingService
  ) {
    // this.loadingSvc.presentLoading();
  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.assistants = await this.assistantsSvc
      .getAssistants()
      .then((result) => result.users)
      .catch((err) => []);
    if (
      (this.assistants && this.typeSub === "EMPLOYEE") ||
      this.typeSub === "ADMIN"
    ) {
      this.getCompanies();
      this.loadingSvc.loadingDismiss();
    }
  }

  getCompanies() {
    this.companies = [];
    this.assistants.forEach((user) => {
      if (
        user.role === "BASIC" ||
        user.role === "MEDIUM" ||
        user.role === "PREMIUM"
      ) {
        this.companies.push(user);
      }
    });
    return this.companies.sort((a, b) => {
      console.log("variable", a);
      if (a.role !== b.role) {
        this.thereIsOneRole = false;
      }
      if (this.returnPos(a.role) < this.returnPos(b.role)) {
        return 1;
      }
      if (this.returnPos(a.role) > this.returnPos(b.role)) {
        return -1;
      }
      if (a.name.toUpperCase().trim() > b.name.toUpperCase().trim()) {
        return 1;
      }
      if (a.name.toUpperCase().trim() < b.name.toUpperCase().trim()) {
        return -1;
      }
      return 0;
    });
  }

  returnPos(role) {
    switch (role) {
      case "BASIC":
        return 1;
      case "MEDIUM":
        return 2;
      case "PREMIUM":
        return 3;
    }
  }

  getUser(meet) {
    let user = {};
    this.assistants.forEach((assistant) => {
      if (meet.user_id === assistant.id) {
        user = assistant;
      }
    });
    return user;
  }

  similarIdCompany(companiId) {
    let flag = true;
    this.meetings.forEach((item) => {
      if (item.company_id === companiId) {
        flag = false;
      }
    });
    return flag;
  }

  separate(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.role !== undefined) {
        return record.role.toUpperCase();
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = records[recordIndex - 1].role.toUpperCase();
    }
    const firstCurrent = record.role.toUpperCase();

    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }

    return null;
  }

  goToRequestMeeting(company) {
    this.router.navigate(["/menu/request-meeting", company.id]); // LA URL TIENE EL ID DE LA EMPRESA.
  }
}
