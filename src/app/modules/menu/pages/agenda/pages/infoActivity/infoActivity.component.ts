import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ModulesService } from "src/app/shared/services/modules/modules.service";
import { Router } from "@angular/router";

@Component({
  selector: "info-activity",
  templateUrl: "./infoActivity.component.html",
  styleUrls: ["./infoActivity.component.scss"],
})
export class InfoActivityComponent implements OnInit {
  activity: any = {};

  constructor(
    private location: Location,
    public modulesSvc: ModulesService,
    private router: Router
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(["menu/event"]);
  }
}
