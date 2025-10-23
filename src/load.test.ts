import * as Load from './load';

describe('Load', () => {
  describe('loadSquare', () => {
    it('exports loadSquare', () => {
      expect(Load).toHaveProperty('loadSquare');
    });

    it('memoizes loadPromise', () => {
      const src = 'https://web.squarecdn.com/v1/square.js';
      const p1 = Load.loadSquare(src);
      const p2 = Load.loadSquare(src);

      expect(p1).toStrictEqual(p2);
    });

    it('resolves to null when window is undefined', async () => {
      const originalWindow = global.window;
      delete (global as any).window;

      const result = await Load.loadSquare('https://web.squarecdn.com/v1/square.js');

      expect(result).toBeNull();
      global.window = originalWindow;
    });

    it('resolves immediately if window.Square already exists', async () => {
      const mockSquare = { payments: jest.fn() };
      const originalSquare = (global.window as any).Square;
      (global.window as any).Square = mockSquare;

      const result = await Load.loadSquare('https://web.squarecdn.com/v1/square.js');

      expect(result).toBe(mockSquare);
      (global.window as any).Square = originalSquare;
    });

    it('handles DOM manipulation for script injection', () => {
      const mockScript = {
        src: '',
        addEventListener: jest.fn(),
      };
      const originalDocument = global.document;
      const originalWindow = global.window;

      global.document = {
        querySelector: jest.fn().mockReturnValue(null),
        createElement: jest.fn().mockReturnValue(mockScript),
        head: { appendChild: jest.fn() },
      } as any;

      global.window = { Square: undefined } as any;

      Load.loadSquare('https://web.squarecdn.com/v1/square.js');

      expect(global.document.createElement).toHaveBeenCalledWith('script');
      expect(mockScript.src).toBe('https://web.squarecdn.com/v1/square.js');
      expect(global.document.head.appendChild).toHaveBeenCalledWith(mockScript);
      expect(mockScript.addEventListener).toHaveBeenCalledWith('load', expect.any(Function));
      expect(mockScript.addEventListener).toHaveBeenCalledWith('error', expect.any(Function));

      global.document = originalDocument;
      global.window = originalWindow;
    });

    it('falls back to body when head is not available', () => {
      const mockScript = {
        src: '',
        addEventListener: jest.fn(),
      };
      const originalDocument = global.document;
      const originalWindow = global.window;

      global.document = {
        querySelector: jest.fn().mockReturnValue(null),
        createElement: jest.fn().mockReturnValue(mockScript),
        head: null,
        body: { appendChild: jest.fn() },
      } as any;

      global.window = { Square: undefined } as any;

      Load.loadSquare('https://web.squarecdn.com/v1/square.js');

      expect(global.document.body.appendChild).toHaveBeenCalledWith(mockScript);

      global.document = originalDocument;
      global.window = originalWindow;
    });

    it('throws error when neither head nor body exists', async () => {
      const originalDocument = global.document;
      const originalWindow = global.window;

      global.document = {
        querySelector: jest.fn().mockReturnValue(null),
        createElement: jest.fn().mockReturnValue({ src: '', addEventListener: jest.fn() }),
        head: null,
        body: null,
      } as any;

      global.window = { Square: undefined } as any;

      await expect(Load.loadSquare('https://web.squarecdn.com/v1/square.js')).rejects.toThrow(
        'Square.js requires a <body> or <head> element.'
      );

      global.document = originalDocument;
      global.window = originalWindow;
    });
  });
});
