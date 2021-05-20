import * as Square from '@square/web-sdk';

const applicationId = 'sandbox-sq0idb-lybe_WkfKNAbb3WklswmwA';
const locationId = 'LKYXSPGPXK05M';

async function start() {
  const payments = await Square.payments(applicationId, locationId);
  const card = await payments.card();

  await card.attach('#card');

  document.querySelector('#pay').addEventListener('click', async () => {
    try {
      const result = await card.tokenize();
      console.log(result);
      // TODO: use result.token as source_id in /v2/payments API call
    } catch (ex) {
      console.error(ex);
    }
  });
}

start();
