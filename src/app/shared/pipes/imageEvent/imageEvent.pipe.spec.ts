import { imageEventPipe } from './imageEvent.pipe';

describe('imageEventPipe', () => {
  it('create an instance', () => {
    const pipe = new imageEventPipe();
    expect(pipe).toBeTruthy();
  });
});
