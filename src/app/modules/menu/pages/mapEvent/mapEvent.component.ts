import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'map-event',
  templateUrl: './mapEvent.component.html',
  styleUrls: ['./mapEvent.component.scss'],
})
export class MapEventComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  goToChat() {
    this.router.navigate(['/menu/chats']);
  }
}
