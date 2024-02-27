import { Injectable } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];

  data = [
    {
      component: "input",
      type: "text",
      required: true,
      translation: "EDIT_PROFILE.labelUsername",
      noValue: "PROFILE.noUsername",
      icon: "icon_w_icons_at",
      formControlName: "username",
      showToggle: false,
      sub: [],
      showOnProfile: true,
      show: true,
    },
    {
      component: "input",
      type: "text",
      required: true,
      translation: "EDIT_PROFILE.labelMail",
      noValue: "PROFILE.noEmail",
      icon: "icon_w_icons_envelope",
      formControlName: "email",
      showToggle: true,
      sub: [],
      showOnProfile: true,
      show: true,
    },
    {
      component: "input",
      type: "number",
      required: false,
      translation: "EDIT_PROFILE.labelPhone",
      noValue: "PROFILE.noPhone",
      icon: "icon_w_icons_phone",
      formControlName: "phone",
      showToggle: true,
      sub: [],
      showOnProfile: true,
      show: true,
    },
    {
      component: "input",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelLocation",
      noValue: "PROFILE.noLocation",
      icon: "icon_w_icons_location_pin_circle",
      formControlName: "location",
      showToggle: false,
      sub: [],
      showOnProfile: true,
      show: true,
    },
    {
      component: "input",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelBirthdate",
      noValue: "PROFILE.noBirthdate",
      placeholder: "DD/MM/AAAA",
      icon: "icon icon-internet",
      formControlName: "description",
      showToggle: true,
      sub: [],
      showOnProfile: true,
      show: false,
    },
    {
      component: "input",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelJob",
      noValue: "PROFILE.noJob",
      icon: "icon_w_icons_suitcase",
      formControlName: "profession",
      showToggle: false,
      sub: ["EMPLOYEE", "ADMIN"],
      showOnProfile: true,
      show: true,
    },
    {
      component: "input",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelSector",
      noValue: "PROFILE.noSector",
      icon: "icon_w_icons_suitcase",
      formControlName: "sector",
      showToggle: false,
      sub: ["BASIC", "MEDIUM", "PREMIUM"],
      showOnProfile: false,
      show: true,
    },
    {
      component: "input",
      type: "text",
      required: true,
      translation: "EDIT_PROFILE.labelCompany",
      noValue: "PROFILE.noCompany",
      icon: "icon_w_icons_suitcase",
      formControlName: "company",
      showToggle: false,
      sub: ["EMPLOYEE", "ADMIN"],
      showOnProfile: true,
      show: true,
    },
    {
      component: "url",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelSite",
      noValue: "PROFILE.noSite",
      icon: "icon_w_icons_world",
      formControlName: "site",
      showToggle: false,
      sub: ["BASIC", "MEDIUM", "PREMIUM"],
      showOnProfile: true,
      show: true,
    },
    {
      component: "textarea",
      type: "text",
      required: false,
      translation: "EDIT_PROFILE.labelInfo",
      noValue: "PROFILE.noInfo",
      icon: "icon_w_icons_information_circle",
      formControlName: "information",
      showToggle: false,
      sub: [],
      showOnProfile: true,
      show: true,
    },
    {
      component: "array",
      formGroupName: "socialmedia",
      required: false,
      translation: "EDIT_PROFILE.labelOtherRRSS",
      sub: [],
      showOnProfile: true,
      show: true,
      array: [
        {
          icon: "icon_w_icons_playButtonFilled",
          translation: "EDIT_PROFILE.labelVideoUrl",
          type: "text",
          formControlName: "video",
          sub: ["BASIC", "MEDIUM", "PREMIUM"],
          show: true,
        },
        {
          icon: "icon_w_icons_social_linkedin",
          translation: "EDIT_PROFILE.socialmedia.linkedin",
          type: "text",
          formControlName: "linkedin",
          sub: [],
          show: true,
        },
        {
          icon: "icon_w_icons_social_twitter",
          translation: "EDIT_PROFILE.socialmedia.twitter",
          type: "text",
          formControlName: "twitter",
          sub: [],
          show: true,
        },
        {
          icon: "icon_w_icons_social_facebook",
          translation: "EDIT_PROFILE.socialmedia.facebook",
          type: "text",
          formControlName: "facebook",
          sub: [],
          show: true,
        },
        {
          icon: "icon_w_icons_social_instagram",
          translation: "EDIT_PROFILE.socialmedia.instagram",
          type: "text",
          formControlName: "instagram",
          sub: [],
          show: true,
        },
        {
          icon: "icon_w_icons_social_spotify",
          translation: "EDIT_PROFILE.socialmedia.spotify",
          type: "text",
          formControlName: "spotify",
          sub: [],
          show: true,
        },
      ],
    },
  ];

  attachedFiles = {
    sub: [],
    showOnProfile: true,
    show: true,
  };

  constructor(private fb: FormBuilder) {}

  public getDataBySub(sub) {
    const data = [];
    this.data.forEach((item) => {
      if (item.sub.length === 0) {
        data.push(item);
      } else {
        item.sub.forEach((itemSub) => {
          if (sub === itemSub) {
            data.push(item);
          }
        });
      }
    });
    return data;
  }

  getForm() {
    const form: any = this.fb.group({
      name: ["", [Validators.required]],
      surnames: ["", [Validators.required]],
      commercial: [true, []],
    });

    const permission: any = this.fb.group({
      name: [true, []],
      surnames: [true, []],
    });

    this.data.forEach((item) => {
      if (item.show && this.getSub(item.sub)) {
        if (item.component === "array") {
          const value = this.fb.group({});
          item.array.forEach((object) => {
            if (object.show && this.getSub(object.sub)) {
              value.addControl(
                object.formControlName,
                new FormControl("", item.required ? [Validators.required] : [])
              );
            }
          });
          form.addControl(item.formGroupName, value);
        } else {
          form.addControl(
            item.formControlName,
            new FormControl(
              "",
              item.required && item.formControlName === "email"
                ? [Validators.required, Validators.email]
                : item.required && item.formControlName !== "email"
                ? [Validators.required]
                : []
            )
          );
        }
        permission.addControl(
          item.formControlName ? item.formControlName : item.formGroupName,
          new FormControl(true, [])
        );
      }
    });
    form.addControl("permission", permission);
    return form;
  }

  setDataForm(user) {
    if (user !== null) {
      let form: any = this.fb.group({
        name: [this.getValue(user.name), [Validators.required]],
        surnames: [this.getValue(user.surnames), [Validators.required]],
        commercial: [
          this.getValue(
            JSON.parse(user.commercial ? user.commercial : "false")
          ),
          [],
        ],
      });

      const userPermission = JSON.parse(user.permission);
      const permission: any = this.fb.group({
        name: [userPermission.name, []],
        surnames: [userPermission.surnames, []],
      });

      this.data.forEach((item) => {
        if (item.show && this.getSub(item.sub)) {
          if (item.component === "array") {
            const value = this.fb.group({});
            item.array.forEach((object) => {
              if (object.show && this.getSub(object.sub)) {
                value.addControl(
                  object.formControlName,
                  new FormControl(
                    user[item.formGroupName]
                      ? JSON.parse(user[item.formGroupName])[
                          object.formControlName
                        ]
                      : "",
                    item.required ? [Validators.required] : []
                  )
                );
              }
            });
            form.addControl(item.formGroupName, value);
          } else {
            form.addControl(
              item.formControlName,
              new FormControl(
                this.getValue(user[item.formControlName]),
                item.required && item.formControlName === "email"
                  ? [Validators.required, Validators.email]
                  : item.required && item.formControlName !== "email"
                  ? [Validators.required]
                  : []
              )
            );
          }
          if (item.formControlName) {
            permission.addControl(
              item.formControlName,
              new FormControl(userPermission[item.formControlName], [])
            );
          } else {
            permission.addControl(
              item.formGroupName,
              new FormControl(userPermission[item.formGroupName], [])
            );
          }
        }
      });
      form.addControl("permission", permission);
      return form;
    }
  }

  getValue(value) {
    if (value !== null && value !== undefined) {
      // if (value.trim() !== 'null' && value.trim() !== '' && value.trim() !== 'undefined') {
      return value;
      // }
    }
    return "";
  }

  getSub(subs) {
    if (subs.length === 0) {
      return true;
    }
    let flag = false;
    subs.forEach((sub) => {
      if (sub === this.sub) {
        flag = true;
      }
    });
    return flag;
  }

  getAttachedData() {
    if (this.getSub(this.attachedFiles.sub) && this.attachedFiles.show) {
      return true;
    }
    return false;
  }
}
