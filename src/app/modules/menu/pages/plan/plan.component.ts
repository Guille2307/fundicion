import { Component, OnInit } from "@angular/core";
import panzoom from "panzoom";

@Component({
  selector: "plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.scss"],
})
export class PlanComponent implements OnInit {
  instance?;
  plano: string = "https://my.matterport.com/show/?m=JJBPcTtAM6U";
  constructor() {}

  ngOnInit() {
    // this.setDragAndZoom();
  }

  restartPos() {
    this.instance.smoothMoveTo(0, 0);
  }

  // setDragAndZoom() {
  //   const itemsContainer = document.querySelector("#image") as any;
  //   this.instance = panzoom(itemsContainer, {
  //     maxZoom: 3,
  //     minZoom: 1,
  //     initialX: 0,
  //     initialY: 0,
  //     initialZoom: 1,
  //     bounds: true,
  //     boundsPadding: 0,
  //   });
  // }
}
