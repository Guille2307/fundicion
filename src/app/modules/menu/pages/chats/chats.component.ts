import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatsContainerComponent } from 'src/app/shared/components/chat/chatsContainer/chatsContainer.component';

@Component({
  selector: 'chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit, OnDestroy {

  rootPage = ChatsContainerComponent;

  constructor() { }

  ngOnInit() {}

  ngOnDestroy(): void {
    sessionStorage.clear();
  }
}
