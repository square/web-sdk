import { payments } from '@square/web-sdk';
import type { Payments } from '@square/web-sdk';

const applicationId = 'sandbox-sq0idb-lybe_WkfKNAbb3WklswmwA';
const locationId = 'LKYXSPGPXK05M';

export async function pay(): Promise<Payments> {
  const sqPayments = await payments(applicationId, locationId);

  if (sqPayments === null) {
    throw new Error('Square Web Payments SDK failed to load');
  }

  return sqPayments;
}
