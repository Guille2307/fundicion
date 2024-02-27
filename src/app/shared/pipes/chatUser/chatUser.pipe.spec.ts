import { ChatUserPipe } from './chatUser.pipe';
import { AssistantsService } from '../../services/api/assistants/assistants.service';

describe('ChatUserPipe', () => {
  it('create an instance', () => {
    const pipe = new ChatUserPipe();
    expect(pipe).toBeTruthy();
  });
});
