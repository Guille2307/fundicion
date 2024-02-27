import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CreateMeetingService } from 'src/app/shared/services/api/createMeeting/createMeeting.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'config-agenda',
  templateUrl: './configAgenda.component.html',
  styleUrls: ['./configAgenda.component.scss'],
})
export class ConfigAgendaComponent implements OnInit {

  @Input() meet;
  @Input() status;
  @Input() date;
  @Input() hour;
  @Input() endHour;

  toggle: boolean;

  constructor(
    public popoverController: PopoverController,
    public createMeetingService: CreateMeetingService
  ) { }

  ngOnInit() {
    switch (this.status) {
      case 'available':
        this.toggle = false;
        break;
      case 'unavailable':
        this.toggle = true;
        break;
    }
  }

  spanishDate() {
    // tslint:disable-next-line: max-line-length
    return this.date[8] + this.date[9] + '/' + this.date[5] + this.date[6] + '/' + this.date[0] + this.date[1] + this.date[2] + this.date[3];
  }

  cancelButtonClick() {
    this.popoverController.dismiss();
  }

  acceptButtonClick() {
    const companyId = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];
    const date = this.date + ' ' + this.hour;
    if (this.status === 'available' && this.toggle) {
      this.createMeetingService.createMeetForCompany(companyId, date).then((result) => {
        this.popoverController.dismiss({ status: 'unavailable' });
      });
    } else if (this.status === 'unavailable' && !this.toggle && this.meet) {
      this.createMeetingService.deleteMeeting(this.meet.id).then((result) => {
        this.popoverController.dismiss({ status: 'available' });
      });
    } else {
      this.popoverController.dismiss();
    }
  }
}
