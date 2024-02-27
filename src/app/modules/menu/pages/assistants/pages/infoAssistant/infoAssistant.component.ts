import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import { PopoverController } from "@ionic/angular";
import { ContextmenuProfileComponent } from "src/app/shared/pages/popovers/contextmenuProfile/contextmenuProfile.component";
import { LoadingService } from "src/app/shared/services/loading/loading.service";

@Component({
  selector: "info-assistant",
  templateUrl: "./infoAssistant.component.html",
  styleUrls: ["./infoAssistant.component.scss"],
})
export class InfoAssistantComponent implements OnInit {
  assistant?: any = null;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private assistantsSvc: AssistantsService,
    private popoverCtrl: PopoverController,
    public loadingSvc: LoadingService
  ) {
    // this.loadingSvc.presentLoading();
    this.activatedRoute.params.subscribe((params) =>
      this.getInfo(params["assistant"])
    );
  }

  ngOnInit() {}

  async getInfo(id) {
    const assistants = await this.assistantsSvc
      .getAssistants()
      .then((result) => result.users);

    if (assistants) {
      assistants.forEach((assistant) => {
        if (assistant.id === id) {
          // this.loadingSvc.loadingDismiss();
          this.assistant = assistant;
        }
      });
    }
  }

  goBack() {
    this.location.back();
  }

  getType(assistant) {
    if (
      assistant.role === "MEDIUM" ||
      assistant.role === "BASIC" ||
      assistant.role === "PREMIUM"
    ) {
      return 2;
    }
    return 0;
  }

  companyFullName(company) {
    if (company.surnames !== null) {
      return company.name + " " + company.surnames;
    }
    return company.name;
  }

  async openPopover(event) {
    const popover = await this.popoverCtrl.create({
      component: ContextmenuProfileComponent,
      componentProps: {
        assistant: this.assistant,
      },
      event,
      backdropDismiss: true,
      showBackdrop: false,
      cssClass: "contextmenu",
    });
    await popover.present();
  }
}
