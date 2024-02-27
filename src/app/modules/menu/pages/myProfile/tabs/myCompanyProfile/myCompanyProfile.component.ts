import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { SendFileService } from 'src/app/shared/services/api/sendFile/sendFile.service';
import { ImageProfilePipe } from 'src/app/shared/pipes/imageProfile/imageProfile.pipe';
import { ShowProfileUserService } from 'src/app/shared/services/api/showProfileUser/showProfileUser.service';
import { JobOffersService } from 'src/app/shared/services/api/jobOffers/jobOffers.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
  selector: 'my-company-profile',
  templateUrl: './myCompanyProfile.component.html',
  styleUrls: ['./myCompanyProfile.component.scss'],
})
export class MyCompanyProfileComponent implements OnInit, AfterViewChecked {

  company: any = {};
  companyId = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
  sub = jwt_decode(localStorage.getItem('selecteduserJWT'))['sub'];

  filenames?: any;

  jobOffers = [];

  constructor(
    private router: Router,
    private showProfileUserSvc: ShowProfileUserService,
    private sendFileSvc: SendFileService,
    private jobOffersService: JobOffersService,
    public profileSvc: ProfileService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getFiles();
    this.getJobOffers();
  }

  ngAfterViewChecked(): void {
    const imgProfilePipe = new ImageProfilePipe();
    const imgContainer = document.getElementById('img-container');
    imgContainer.style.background = 'url("' + imgProfilePipe.transform(this.companyId) + '") no-repeat center center / cover';
  }

  async getJobOffers() {
    this.jobOffers = await this.jobOffersService.getJobOffersByCompany().then(result => result.jobs);
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  async getUser() {
    this.company = await this.showProfileUserSvc.showProfileUser().then((result) => {
      return result.profile;
    }).catch((err) => {
      return err;
    });
  }

  async getFiles() {
    this.filenames = await this.sendFileSvc.getFiles().then((result) => {
      return result.Documents;
    }).catch((err) => {
      return err;
    });
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  setUrl(url) {
    let http = '';
    for (let i = 0; i < 7; i++) {
      http += url[i];
    }
    let https = '';
    for (let i = 0; i < 8; i++) {
      https += url[i];
    }
    if (http === 'http://' || https === 'https://') {
      return url;
    } else {
      return 'http://' + url;
    }
  }

  setDocName(name) {
    let finalName = '';
    for (let i = 11; i < name.length; i++) {
      finalName += name[i];
    }
    return finalName;
  }

  addOffer() {
    this.router.navigate(['/menu/set-job-offer']);
  }
}
