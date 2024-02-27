import { Pipe, PipeTransform } from '@angular/core';
import { AssistantsService } from '../../services/api/assistants/assistants.service';
import jwt_decode from 'jwt-decode';

@Pipe({
  name: 'chatUser'
})
export class ChatUserPipe implements PipeTransform {
  constructor(
    private assistantsSvc: AssistantsService
  ) { }

  async transform(userId: any): Promise<any> {
    let user: any;
    const assistants = await this.assistantsSvc.getAssistants()
      .then((result) => result.users);

    if (assistants) {
      assistants.forEach(assistant => {
        if (userId === assistant.id) {
          user = assistant;
        }
      });
      return userId ? user.name + ' ' + user.surnames : '';
    }
  }
}
