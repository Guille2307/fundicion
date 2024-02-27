import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AssistantsService } from '../../../api/assistants/assistants.service';
import { EventService } from '../../../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class BanService {

  eventName = this.eventSvc.eventName;

  constructor(
    private afs: AngularFirestore,
    public assistantsSvc: AssistantsService,
    public eventSvc: EventService
  ) { }

  async banUser(/**streamingId,*/ userId) {
    const selectedUser = await this.assistantsSvc.getAssistants().then(res => {
      let assistant;
      res.users.forEach(user => {
        if (user.id === userId) {
          assistant = user;
        }
      });
      return assistant;
    });
    if (selectedUser) {
      return this.afs.doc(this.eventName + `_bans/${userId}`).set(selectedUser).then(() => userId);
      // return this.afs.doc(this.eventName + `_bans/${streamingId}`).set(selectedUser).then(() => userId);
    }
  }

  unbanUser(userId) {
    return this.afs.doc(this.eventName + `_bans/${userId}`).delete().then(() => userId);
  }

  getBans() {
    return this.afs.collection(this.eventName + '_bans').valueChanges() as Observable<[]>;
  }
}
