import { AfterViewChecked, Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonContent, IonSegment } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StreamingService } from 'src/app/shared/services/chat/streaming/streaming.service';
import { StreamingsService } from 'src/app/shared/services/api/streamings/streamings.service';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { BanService } from 'src/app/shared/services/chat/streaming/ban/ban.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;
  newMsg = '';

  streamingId = '';

  roomNumber;

  selectedTab = 'chat';

  streaming?;

  oneStreaming = false;

  date?;

  imBanned = false;

  constructor(
    private streamingChatService: StreamingService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public streamingsService: StreamingsService,
    public sanitizer: DomSanitizer,
    public banService: BanService,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.roomNumber = sessionStorage.getItem('roomNumber');
    this.activatedRoute.params.subscribe(params => this.getInfoStreaming(params.id));
  }

  ngOnInit() {
    this.banService.getBans().subscribe(users => {
      this.imBanned = false;
      users.forEach(user => {
        if (user['id'] === jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
          this.imBanned = true;
        }
      });
    });
    this.ionViewWillEnter(2500);
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('roomNumber');
  }

  ionViewWillEnter(time) {
    setTimeout(() => {
      if (this.content !== undefined) {
        this.content.scrollToBottom(0);
      }
    }, time);
  }

  async getInfoStreaming(id) {
    this.streamingId = id;
    this.messages = this.streamingChatService.getChatStreamingMessages(id, this.content);
    const streamings = await this.streamingsService.getStreamings().then((result) => {
      // console.log(result.Streaming);
      return result.Streaming;
    });

    if (streamings) {
      if (streamings.length === 1) {
        this.oneStreaming = true;
      }
      streamings.forEach(item => {
        if (item.id === id) {
          this.streaming = item;
          this.streaming.safeUrl = this.getSafeUrl(this.streaming.url);
        }
      });
    }
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack() {
    this.location.back();
  }

  segmentChanged(ev: any) {
    const value = ev.detail.value;
    this.selectedTab = value;
    if (this.selectedTab === 'chat') {
      this.ionViewWillEnter(1500);
    }
  }

  sendMessage() {
    if (this.newMsg.trim() !== '' && !this.imBanned) {
      if (this.streamingChatService.noMsgs) {
        this.streamingChatService.createChatStreaming(this.newMsg.trim(), this.streamingId).then(() => {
          this.newMsg = '';
          this.content.scrollToBottom();
          this.streamingChatService.noMsgs = false;
        });
      } else {
        this.streamingChatService.addMessageStreaming(this.newMsg.trim(), this.streamingId).then(() => {
          this.newMsg = '';
          this.content.scrollToBottom();
        });
      }
    }
  }

  isMyMsg(msg) {
    if (msg.from === jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
      return true;
    }
    return false;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  showDate(date, i) {
    if (new Date(date).getDate() !== this.date || i === 0) {
      this.date = new Date(date).getDate();
      return true;
    }
    return false;
  }

  setDate(date) {
    const today = new Date().getDate() + '' + new Date().getMonth() + '' + new Date().getFullYear();
    const yesterday = this.getYesterday();
    const day = new Date(date).getDate() + '' + new Date(date).getMonth() + '' + new Date(date).getFullYear();
    if (yesterday === day) {
      return 'CHAT.yesterday';
    } else if (today !== day) {
      return formatDate(new Date(date), 'EEE dd MMM', this.locale);
    } else if (today === day) {
      return 'CHAT.today';
    }
  }

  getYesterday() {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.toDateString();
    return new Date(yesterday).getDate() + '' + new Date(yesterday).getMonth() + '' + new Date(yesterday).getFullYear();
  }

  goToProfile(id) {
    if (id !== jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
      this.router.navigate(['/menu/info/assistant/' + id]);
    }
  }
}
