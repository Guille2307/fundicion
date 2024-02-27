import { FilterWithStartsPipe } from './filterWithStarts.pipe';

describe('FilterWithStartsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterWithStartsPipe();
    expect(pipe).toBeTruthy();
  });
});
