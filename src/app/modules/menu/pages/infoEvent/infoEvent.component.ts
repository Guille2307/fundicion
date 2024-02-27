import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModulesService } from 'src/app/shared/services/modules/modules.service';

@Component({
  selector: 'info-event',
  templateUrl: './infoEvent.component.html',
  styleUrls: ['./infoEvent.component.scss'],
})
export class InfoEventComponent implements OnInit {
  public query: any = '';
  currentTab = 'info';

  constructor(
    private router: Router,
    public modulesSvc: ModulesService
  ) { }

  ngOnInit() {}

  goToChat() {
    this.router.navigate(['/menu/chats']);
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.currentTab = value;
    this.query = '';
  }
}
