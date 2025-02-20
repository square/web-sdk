import { loadSquare } from './load';
import type { Payments } from './types';

const Version = 'v1';

class InvalidApplicationIdError extends Error {
  constructor(
    message = "The Payment 'applicationId' option is not in the correct format.",
  ) {
    super(message);
    this.name = 'InvalidApplicationIdError';
    Object.setPrototypeOf(this, InvalidApplicationIdError.prototype);
  }
}

function getSrcForApplicationId(applicationId: string): string {
  let src = '';

  if (typeof applicationId !== 'string' || applicationId === null) {
    throw new InvalidApplicationIdError();
  }

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

export async function payments(
  applicationId: string,
  locationId?: string,
  overrides?: {
    scriptSrc?: string;
  },
): Promise<Payments | null> {
  const src =
    overrides?.scriptSrc === undefined
      ? getSrcForApplicationId(applicationId)
      : overrides.scriptSrc;

  const maybeSquare = await loadSquare(src);

  if (maybeSquare === null) {
    return null;
  }

  return maybeSquare.payments(applicationId, locationId);
}
