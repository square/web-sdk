import * as Index from '.';

describe('Index', () => {
  it('canary', () => {
    expect(1 + 2).toEqual(3);
  });

  it('exports payments', () => {
    expect(Index).toHaveProperty('payments');
  });
});
