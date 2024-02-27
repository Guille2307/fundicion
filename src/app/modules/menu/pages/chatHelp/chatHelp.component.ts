import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HelpService } from 'src/app/shared/services/chat/help/help.service';

@Component({
  selector: 'chat-help',
  templateUrl: './chatHelp.component.html',
  styleUrls: ['./chatHelp.component.scss'],
})
export class ChatHelpComponent implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  messages: Observable<any[]>;
  newMsg = '';

  constructor(
    private chatHelpService: HelpService
  ) { }

  ngOnInit() {
    this.messages = this.chatHelpService.getChatHelp(this.content);
  }

  sendMessage() {
    if (this.newMsg.trim() !== '') {
      this.chatHelpService.addChatMessageHelp(this.newMsg).then(() => {
        this.newMsg = '';
        this.content.scrollToBottom();
      });
    }
  }
}
