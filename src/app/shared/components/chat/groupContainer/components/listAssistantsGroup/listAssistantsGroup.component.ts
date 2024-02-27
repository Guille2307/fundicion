import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssistantsService } from 'src/app/shared/services/api/assistants/assistants.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'list-assistants-group',
  templateUrl: './listAssistantsGroup.component.html',
  styleUrls: ['./listAssistantsGroup.component.scss'],
})
export class ListAssistantsGroupComponent implements OnInit {

  assistants: any = [];
  public query: any = '';

  selectedAssistantsToGroup = [];

  @Output() chatGroup = new EventEmitter<any>();

  constructor(
    private assistantsSvc: AssistantsService
  ) { }

  ngOnInit() {
    this.getAssistants();
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

  receiveValueCheckbox(ev, assistant) {
    if (ev) {
      this.selectedAssistantsToGroup.push(assistant);
    } else {
      let i = 0;
      this.selectedAssistantsToGroup.forEach(selectedAssistant => {
        if (selectedAssistant.id === assistant.id) {
          this.selectedAssistantsToGroup.splice(i, 1);
        }
        i++;
      });
    }
    this.chatGroup.emit(this.selectedAssistantsToGroup);
  }
}
