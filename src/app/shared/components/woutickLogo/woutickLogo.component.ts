import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event/event.service';
import { PermissionsService } from '../../services/permissions/permissions.service';

@Component({
  selector: 'woutick-logo',
  templateUrl: './woutickLogo.component.html',
  styleUrls: ['./woutickLogo.component.scss'],
})
export class WoutickLogoComponent implements OnInit {

  eventName = this.eventSvc.eventName;

  constructor(
    public permissionsSvc: PermissionsService,
    public eventSvc: EventService
  ) { }

  ngOnInit() {}

}
