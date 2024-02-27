import { Component, Input, OnInit } from "@angular/core";
import { SponsorsService } from "../../services/api/sponsors/sponsors.service";

@Component({
  selector: "sponsors-ininity-bar",
  templateUrl: "./sponsorsInfinityBar.component.html",
  styleUrls: ["./sponsorsInfinityBar.component.scss"],
})
export class SponsorsIninityBarComponent implements OnInit {
  @Input() side = false;
  sponsors? = [];

  constructor(private sponsorsService: SponsorsService) {}

  async ngOnInit() {
    this.sponsors = await this.sponsorsService
      .getSponsorsPublic()
      .then((result) => result.Sponsors);

    if (this.sponsors) {
      document
        .querySelector("body")
        .style.setProperty("--sponsorsLength", this.sponsors.length.toString());
      document
        .querySelector("body")
        .style.setProperty(
          "--animationSpeed",
          (this.sponsors.length * 4).toString() + "s"
        );
    }
  }
}
