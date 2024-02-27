import { Pipe, PipeTransform } from '@angular/core';
import { AssistantsService } from '../../../services/api/assistants/assistants.service';
import jwt_decode from 'jwt-decode';

@Pipe({
  name: 'userGroup'
})
export class UserGroupPipe implements PipeTransform {

  constructor(
    private assistantsSvc: AssistantsService
  ) { }

  async transform(id: any): Promise<any> {
    const assistants = await this.assistantsSvc.getAssistants()
      .then((result) => result.users);

    let name = '';
    if (assistants) {
      assistants.forEach(assistant => {
        if (id === jwt_decode(localStorage.getItem('selecteduserJWT'))['id']) {
          name = 'CHAT.me';
        } else if (assistant.id === id) {
          name = assistant.name + ' ' + assistant.surnames;
        }
      });
    }
    return id ? name : '';
  }
}
