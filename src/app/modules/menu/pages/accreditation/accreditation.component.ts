import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ModulesService } from "src/app/shared/services/modules/modules.service";

@Component({
  selector: "accreditation",
  templateUrl: "./accreditation.component.html",
  styleUrls: ["./accreditation.component.scss"],
})
export class AccreditationComponent implements OnInit {
  sanitizedUrl?;
  urlVenta = "https://www.woutick.es/";

  constructor(
    public sanitizer: DomSanitizer,
    private modulesSvc: ModulesService
  ) {}

  ngOnInit() {
    // this.sanitizedUrl = this.getSafeUrl(this.modulesSvc.getModules().accreditation.href);
    //https://www.woutick.es/embed/23181/entradas-galiforest-2022?embedOrigin=Galiforest&embedSkipInfo=true&embedSingleEvent=true
    this.sanitizedUrl = this.getSafeUrl(
      this.urlVenta + "embed/24695/entradas-woutickshow?embedOrigin=Woutickshow"
    );
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
