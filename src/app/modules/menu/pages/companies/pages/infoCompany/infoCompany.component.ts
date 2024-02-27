import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { LoadingService } from "src/app/shared/services/loading/loading.service";

@Component({
  selector: "info-company",
  templateUrl: "./infoCompany.component.html",
  styleUrls: ["./infoCompany.component.scss"],
})
export class InfoCompanyComponent implements OnInit {
  company?: any = null;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private assistantsSvc: AssistantsService,
    public loadingSvc: LoadingService
  ) {
    this.activatedRoute.params.subscribe((params) =>
      this.getInfo(params["company"])
    );
  }

  ngOnInit() {}

  async getInfo(id) {
    const assistants = await this.assistantsSvc
      .getAssistants()
      .then((result) => result.users);

    if (assistants) {
      assistants.forEach((company) => {
        if (company.id === id) {
          this.company = company;
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  companyFullName(company) {
    if (company.surnames !== null) {
      return company.name + " " + company.surnames;
    }
    return company.name;
  }
}
