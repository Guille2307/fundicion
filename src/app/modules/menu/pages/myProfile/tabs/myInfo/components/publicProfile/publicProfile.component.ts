import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'public-profile',
  templateUrl: './publicProfile.component.html',
  styleUrls: ['./publicProfile.component.scss'],
})
export class PublicProfileComponent implements OnInit {

  @Input() user;

  constructor() { }

  ngOnInit() {}

}
