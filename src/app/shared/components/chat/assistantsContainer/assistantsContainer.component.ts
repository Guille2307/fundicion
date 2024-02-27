import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistantsService } from 'src/app/shared/services/api/assistants/assistants.service';
import jwt_decode from 'jwt-decode';
import { ConversationContainerComponent } from '../conversationContainer/conversationContainer.component';
import { IonNav } from '@ionic/angular';

@Component({
  selector: 'assistants-container',
  templateUrl: './assistantsContainer.component.html',
  styleUrls: ['./assistantsContainer.component.scss'],
})
export class AssistantsContainerComponent implements OnInit {

  assistants: any = [];
  public query: any = '';

  nextPage = ConversationContainerComponent;

  constructor(
    private assistantsSvc: AssistantsService,
    public nav: IonNav
  ) { }

  ngOnInit() {
    this.getAssistants();
  }

  goBack() {
    this.nav.popTo(0);
  }

  goToChat(assistant) {
    sessionStorage.setItem('idAssistant', assistant.id);
    if (assistant.surnames !== null) {
      sessionStorage.setItem('name', assistant.name + ' ' + assistant.surnames);
    } else {
      sessionStorage.setItem('name', assistant.name);
    }
  }

  async getAssistants() {
    const users = await this.assistantsSvc.getAssistants().then((result) => {
      return result.users.sort((a, b) => {
        if (this.takeOffAccents(a.name.toUpperCase().trim()) > this.takeOffAccents(b.name.toUpperCase().trim())) {
          return 1;
        }
        if (this.takeOffAccents(a.name.toUpperCase().trim()) < this.takeOffAccents(b.name.toUpperCase().trim())) {
          return -1;
        }
        return 0;
      });
    }).catch((err) => {
      return null;
    });

    const id = jwt_decode(localStorage.getItem('selecteduserJWT'))['id'];

    if (users) {
      const assistants = this.assistantsSvc.getList(users);
      assistants.forEach(assistant => {
        if (assistant.id !== id) {
          this.assistants.push(assistant);
        }
      });
    }
  }

  takeOffAccents(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  separateLetter(record, recordIndex, records) {
    if (recordIndex === 0) {
      if (record.name[0] !== undefined) {
        return (record.name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
    }

    let firstPrev;
    if (records[recordIndex - 1] !== undefined) {
      firstPrev = (records[recordIndex - 1].name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
    const firstCurrent = (record.name.trim()[0].toUpperCase()).normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (firstPrev !== firstCurrent) {
      return firstCurrent;
    }

    return null;
  }

  isValueNull(value) {
    if (value !== null && value !== undefined) {
      if (value !== 'null' && value.trim() !== '' && value !== 'undefined') {
        return true;
      }
    }
    return false;
  }

  deleteQueryValue() {
    this.query = '';
  }
}
