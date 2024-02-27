import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.scss'],
})
export class SocialmediaComponent implements OnInit {

  @Input() socialmedia: any;
  @Input() speaker = false;

  constructor() { }

  ngOnInit() {}

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  click(link) {
    window.open(link);
  }
}
