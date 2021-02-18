import * as Index from '.';

describe('Index', () => {
  it('canary', () => {
    expect(1 + 2).toEqual(3);
  });

  describe('Payments', () => {
    it('loads', () => {
      expect(() => {
        Index.payments();
      }).not.toThrow();
    });
  });
});
