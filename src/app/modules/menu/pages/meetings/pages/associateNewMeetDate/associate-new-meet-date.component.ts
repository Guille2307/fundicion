import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { CreateMeetingService } from "src/app/shared/services/api/createMeeting/createMeeting.service";
import { ReviewMeetComponent } from "../reviewMeeting/reviewMeeting.component";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "associate-new-meet-date",
  templateUrl: "./associate-new-meet-date.component.html",
  styleUrls: ["./associate-new-meet-date.component.scss"],
})
export class AssociateNewMeetDateComponent implements OnInit {
  // ETIQUETAS
  etiquetas = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  //
  // ARRAYS CARD.
  pendientes = [0, 1, 2, 3, 4];
  denegados = [
    { id: "denegados0" },
    { id: "denegados1" },
    { id: "denegados2" },
  ];
  reservados = [
    { id: "reservados0" },
    { id: "reservados1" },
    { id: "reservados2" },
  ];
  // DATA MEET
  dataMeeting: any = [];
  // INFO
  offert: any;
  company: any;

  selectedTab = "todo";

  constructor(
    private modalCrtl: ModalController,
    private modalReviewMeet: ModalController,
    private createMeetingService: CreateMeetingService
  ) {
    this.selectedTab = "todo";
    this.offert = "Programador Junior";
    this.company = "Woutick";
  }

  ngOnInit() {
    this.getPetitionsMeetEmployee();
    console.log(this.dataMeeting);
  }

  getPetitionsMeetEmployee() {
    this.createMeetingService
      .showMeetingForEmployee()
      .then((result) => {
        console.log(result.Meetings);
        this.dataMeeting = result.Meetings;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    console.log(value);
    this.selectedTab = value;
  }

  async goToReviewMeet(card) {
    if (card.id.includes("denegados")) {
      const modal = await this.modalReviewMeet.create({
        component: ReviewMeetComponent,
        cssClass: "my-custom-class",
        componentProps: {
          denegado: true,
        },
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      if (data.openProfile) {
        setTimeout(() => {
          this.modalCrtl.dismiss({
            profile: true,
          });
        }, 200);
      }
      if (data.requestMeet) {
        setTimeout(() => {
          this.modalCrtl.dismiss({
            meet: true,
          });
        }, 200);
      }
    } else {
      if (card.id.includes("reservados")) {
        const modal = await this.modalReviewMeet.create({
          component: ReviewMeetComponent,
          cssClass: "my-custom-class",
          componentProps: {
            reservados: true,
          },
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        if (data.openProfile) {
          setTimeout(() => {
            this.modalCrtl.dismiss({
              profile: true,
            });
          }, 200);
        }
        if (data.requestMeet) {
          setTimeout(() => {
            this.modalCrtl.dismiss({
              meet: true,
            });
          }, 200);
        }
      }
    }
  }

  goBack() {
    this.modalCrtl.dismiss();
  }

  sendUserSelect() {
    this.modalCrtl.dismiss({
      offer: this.offert,
      company: this.company,
    });
  }

  onClickTab(tab) {
    this.selectedTab = tab.id;
  }
}
