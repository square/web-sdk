import * as Load from './load';

describe('Load', () => {
  describe('loadSquare', () => {
    it('exports loadSquare', () => {
      expect(Load).toHaveProperty('loadSquare');
    });

    it('memoizes loadPromise', () => {
      const src = 'https://web.squarecdn.com/v0/square.js';
      const p1 = Load.loadSquare(src);
      const p2 = Load.loadSquare(src);

      expect(p1).toStrictEqual(p2);
    });

    // hard to unit test because of jsdom behaviors. better to trust integration tests
  });
});
