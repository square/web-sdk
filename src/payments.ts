import { loadSquare } from './load';
import { Payments } from '@square/web-payments-sdk-types';

const Version = 'v0';

type PaymentInitialization = (
  applicationId: string,
  locationId: string
) => Promise<Payments | null>;

class InvalidApplicationIdError extends Error {
  constructor(
    message = "The Payment 'applicationId' option is not in the correct format."
  ) {
    super(message);
    this.name = 'InvalidApplicationIdError';
    Object.setPrototypeOf(this, InvalidApplicationIdError.prototype);
  }
}

function getSrcForApplicationId(applicationId: string): string {
  let src = '';

  if (applicationId.startsWith('sq0idp-')) {
    src = 'https://web.squarecdn.com/';
  }

  if (applicationId.startsWith('sandbox-sq0idb-')) {
    src = 'https://sandbox.web.squarecdn.com/';
  }

  if (src.length === 0) {
    throw new InvalidApplicationIdError();
  }
  src += `${Version}/square.js`;

  return src;
}

// eslint-disable-next-line func-style
const payments: PaymentInitialization = async function (
  applicationId: string,
  locationId?: string,
  overrides?: {
    scriptSrc?: string;
  }
): Promise<Payments | null> {
  const src =
    overrides?.scriptSrc !== undefined
      ? overrides.scriptSrc
      : getSrcForApplicationId(applicationId);

  const maybeSquare = await loadSquare(src);

  if (maybeSquare === null) {
    return null;
  }

  return maybeSquare.payments(applicationId, locationId);
};

export { payments };
