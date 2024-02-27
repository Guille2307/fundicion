import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'private-profile',
  templateUrl: './privateProfile.component.html',
  styleUrls: ['./privateProfile.component.scss'],
})
export class PrivateProfileComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {}

}
