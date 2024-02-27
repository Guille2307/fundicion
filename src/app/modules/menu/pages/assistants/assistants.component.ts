import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AssistantsService } from "src/app/shared/services/api/assistants/assistants.service";
import jwt_decode from "jwt-decode";

@Component({
  selector: "assistants",
  templateUrl: "./assistants.component.html",
  styleUrls: ["./assistants.component.scss"],
})
export class AssistantsComponent implements OnInit {
  assistants?;
  public query: any = "";

  numColumns = 2;

  constructor(
    private router: Router,
    private assistantsSvc: AssistantsService
  ) {}

  ngOnInit() {
    this.getAssistants();
  }

  async getAssistants() {
    const users = await this.assistantsSvc
      .getAssistants()
      .then((result) => {
        return result.users.sort((a, b) => {
          if (
            this.takeOffAccents(a.name.toUpperCase().trim()) >
            this.takeOffAccents(b.name.toUpperCase().trim())
          ) {
            return 1;
          }
          if (
            this.takeOffAccents(a.name.toUpperCase().trim()) <
            this.takeOffAccents(b.name.toUpperCase().trim())
          ) {
            return -1;
          }
          return 0;
        });
      })
      .catch((err) => {
        return null;
      });

    if (users) {
      this.assistants = this.assistantsSvc.getList(users);
    }
  }

  takeOffAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  separateLetter(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.name[0] !== undefined) {
        return record.name
          .trim()[0]
          .toUpperCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = records[recordIndex - 1].name
        .trim()[0]
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    }
    const firstCurrent = record.name
      .trim()[0]
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (firstPrev !== firstCurrent) {
      return firstCurrent.toUpperCase();
    }

    return null;
  }

  showInfo(assistant) {
    if (
      assistant.id === jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
    ) {
      this.router.navigate(["/menu/profile/my-info"]);
    } else {
      this.router.navigate(["/menu/info/assistant", assistant.id]);
    }
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  goToChat() {
    this.router.navigate(["/menu/chats"]);
  }
}
