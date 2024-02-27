import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { ShowProfileUserService } from "src/app/shared/services/api/showProfileUser/showProfileUser.service";
import jwt_decode from "jwt-decode";
import { ImageProfilePipe } from "src/app/shared/pipes/imageProfile/imageProfile.pipe";
import { SendFileService } from "src/app/shared/services/api/sendFile/sendFile.service";
import { ProfileService } from "src/app/shared/services/profile/profile.service";

@Component({
  selector: "my-info",
  templateUrl: "./myInfo.component.html",
  styleUrls: ["./myInfo.component.scss"],
})
export class MyInfoComponent implements OnInit, AfterViewChecked {
  public form?;

  user: any = {};
  userId = jwt_decode(localStorage.getItem("selecteduserJWT"))["id"];

  filenames?: any;

  constructor(
    private router: Router,
    private showProfileUserSvc: ShowProfileUserService,
    private sendFileSvc: SendFileService,
    public profileSvc: ProfileService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  ngAfterViewChecked(): void {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById("img-container");
    imgContainer.style.background =
      'url("' +
      imgProfilePipe.transform(this.userId) +
      '") no-repeat center center / cover';
  }

  async getUser() {
    this.user = await this.showProfileUserSvc
      .showProfileUser()
      .then((result) => {
        return result.profile;
      })
      .catch((err) => {
        return err;
      });

    if (this.user) {
      this.form = this.profileSvc.setDataForm(this.user).value;
      this.getFiles();
    }
  }

  async getFiles() {
    this.filenames = await this.sendFileSvc
      .getFilesUser()
      .then((value) => value);
  }

  editProfile() {
    this.router.navigate(["/edit-profile"]);
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== "null" && value.trim() !== "" && value !== "undefined") {
        return true;
      }
    }
    return false;
  }

  setUrl(url) {
    let http = "";
    for (let i = 0; i < 7; i++) {
      http += url[i];
    }
    let https = "";
    for (let i = 0; i < 8; i++) {
      https += url[i];
    }
    if (http === "http://" || https === "https://") {
      return url;
    } else {
      return "http://" + url;
    }
  }

  setDocName(name) {
    let finalName = "";
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }
}
