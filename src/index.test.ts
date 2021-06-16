import * as sdk from '.';

describe('SDK', () => {
  it('exports payments', () => {
    expect(sdk).toHaveProperty('payments');
  });
});
