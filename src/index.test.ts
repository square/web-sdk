import * as sdk from '.'; // eslint-disable-line import/namespace

describe('SDK', () => {
  it('exports payments', () => {
    expect(sdk).toHaveProperty('payments');
  });
});
