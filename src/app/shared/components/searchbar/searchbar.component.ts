import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "searchbar",
  templateUrl: "./searchbar.component.html",
  styleUrls: ["./searchbar.component.scss"],
})
export class SearchbarComponent implements OnInit, AfterViewChecked {
  public query: any = "";
  @Input() sideNav;
  @Output() sendQuery = new EventEmitter<string>();
  input;

  cont = 0;

  constructor() {}

  ngOnInit() {
    this.input = document.getElementById("searchbar");
    if (this.input !== null) {
      this.input.addEventListener("input", this.sendEvent);
      this.input.addEventListener("keyup", this.getEnterKey);
    }
  }

  ngAfterViewChecked(): void {
    if (this.cont < 30) {
      this.input = document.getElementById("searchbar");
      if (this.input !== null) {
        this.input.addEventListener("input", this.sendEvent);
        this.input.addEventListener("keyup", this.getEnterKey);
      }
      this.cont++;
    }
  }

  sendEvent = (e) => {
    this.sendQuery.emit(this.query);
  };

  getEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.sideNav.toggle();
    }
  };

  deleteQueryValue() {
    this.query = "";
    this.sendQuery.emit(this.query);
  }
  goBack() {
    this.sideNav.toggle();
    this.query = "";
    this.sendQuery.emit(this.query);
  }
}
