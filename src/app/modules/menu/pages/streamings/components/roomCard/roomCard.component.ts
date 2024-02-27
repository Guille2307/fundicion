import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'room-card',
  templateUrl: './roomCard.component.html',
  styleUrls: ['./roomCard.component.scss'],
})
export class RoomCardComponent implements OnInit {

  @Input() room: any;

  @Input() roomNumber: number;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() { }

  enterRoom(room) {
    sessionStorage.setItem('roomNumber', this.roomNumber.toString());
    this.router.navigate(['/menu/streamings/id/', room.id]);
  }

  roomType(streamingDateStart, streamingDateEnd) {
    let type = null;

    const dateStart = new Date(streamingDateStart);
    const dateEnd = new Date(streamingDateEnd);
    const today = new Date();

    if (today > dateEnd) {
      type = 'end';
    } else if (today < dateStart) {
      type = 'not-live';
    } else {
      type = 'live';
    }
    return type;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }
}
