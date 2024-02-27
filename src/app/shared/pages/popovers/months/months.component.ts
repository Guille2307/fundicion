import { Component, Input, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "months",
  templateUrl: "./months.component.html",
  styleUrls: ["./months.component.scss"],
})
export class MonthsComponent implements OnInit {
  @Input() monthsArray = [];
  @Input() selected = "";

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  select(month) {
    this.popoverCtrl.dismiss({ month });
  }
}
