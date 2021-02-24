import { loadSquare } from './load';

const Version = 'v0';

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
    src = 'https://websdk.squarecdn.com/';
  }

  if (applicationId.startsWith('sandbox-sq0idb')) {
    src = 'https://sandbox.websdk.squarecdn.com/';
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
}
