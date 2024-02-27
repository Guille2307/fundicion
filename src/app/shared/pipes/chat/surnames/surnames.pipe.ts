import { Pipe, PipeTransform } from '@angular/core';
import { AssistantsService } from '../../../services/api/assistants/assistants.service';
import jwt_decode from 'jwt-decode';

@Pipe({
  name: 'surnames'
})
export class SurnamesPipe implements PipeTransform {

  constructor(
    private assistantsSvc: AssistantsService
  ) { }

  async transform(chat: any): Promise<any> {
    let user: any = {};
    if (chat.isGroup) {

    } else {
      const assistants = await this.assistantsSvc.getAssistants()
        .then((result) => result.users);

      if (assistants) {
        assistants.forEach(assistant => {
          chat.users.forEach(id => {
            if (assistant.id === id && id !== jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
              user = assistant;
            }
          });
        });
      }
    }
    return chat ? user.surnames : '';
  }

}
