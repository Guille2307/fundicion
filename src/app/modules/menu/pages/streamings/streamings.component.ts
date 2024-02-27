import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StreamingsService } from 'src/app/shared/services/api/streamings/streamings.service';

@Component({
  selector: 'streamings',
  templateUrl: './streamings.component.html',
  styleUrls: ['./streamings.component.scss'],
})
export class StreamingsComponent implements OnInit {

  streamings = [];

  public query = '';

  constructor(
    private router: Router,
    public streamingsService: StreamingsService
  ) {
    this.getStreamings();
  }

  ngOnInit() { }

  async getStreamings() {
    this.streamings = await this.streamingsService.getStreamings().then((result) => {
      return result.Streaming;
    });
  }

  goToChat() {
    this.router.navigate(['/menu/chats']);
  }
}
