import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import jwt_decode from "jwt-decode";

@Component({
  selector: "my-profile",
  templateUrl: "./myProfile.component.html",
  styleUrls: ["./myProfile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  sub = "EMPLOYEE";

  constructor(private router: Router) {}

  ngOnInit() {
    this.sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
    console.log(this.sub);
  }

  editProfile() {
    this.router.navigate(["/edit-profile"]);
  }
}
