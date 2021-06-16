import * as Payments from './payments';
import { loadSquare } from './load';

import type { Square } from './types';

jest.mock('./load');

const mockLoadSquare = loadSquare as jest.MockedFunction<typeof loadSquare>;

describe('Payments', () => {
  beforeEach(() => {
    mockLoadSquare.mockClear();
  });

  describe('payments', () => {
    it('exports payments', () => {
      expect(Payments).toHaveProperty('payments');
    });

    it('throws if application id is invalid and has no override', async () => {
      await expect(Payments.payments('junk-app-id')).rejects.toThrow(
        "The Payment 'applicationId' option is not in the correct format."
      );
      expect(mockLoadSquare).not.toBeCalled();
    });

    it('allows overriding script src', async () => {
      mockLoadSquare.mockResolvedValueOnce(null);

      const testSrc = 'https://square.test/unit.js';

      await Payments.payments('sq0idp-...', '', { scriptSrc: testSrc });

      expect(mockLoadSquare).toHaveBeenCalledWith(testSrc);
    });

    it('can resolve null', async () => {
      mockLoadSquare.mockResolvedValueOnce(null);

      const maybePayments = await Payments.payments('sq0idp-...');
      expect(maybePayments).toBeNull();
    });

    it('resolves window.Square', async () => {
      const expected = true;
      const SQish = {
        payments() {
          return expected;
        },
      };
      mockLoadSquare.mockResolvedValue((SQish as unknown) as Square);

      const actual = await Payments.payments('sandbox-sq0idb-...');

      expect(actual).toBe(expected);
    });
  });
});
