import * as Square from '@square/web-sdk';

const applicationId = 'sandbox-sq0idb-lybe_WkfKNAbb3WklswmwA';
const locationId = 'LKYXSPGPXK05M';
const verificationDetails = {
  amount: '1.00',
  billingContact: {
    givenName: 'John',
    familyName: 'Doe',
    email: 'john.doe@square.example',
    phone: '3214563987',
    addressLines: ['123 Main Street', 'Apartment 1'],
    city: 'London',
    state: 'LND',
    countryCode: 'GB',
  },
  currencyCode: 'GBP',
  intent: 'CHARGE',
  customerInitiated: true,
  sellerKeyedIn: false,
};

async function start() {
  const payments = await Square.payments(applicationId, locationId);
  const card = await payments.card();

  await card.attach('#card');

  document.querySelector('#pay').addEventListener('click', async () => {
    try {
      const result = await card.tokenize(verificationDetails);
      console.log(result);
      // TODO: use result.token as source_id in /v2/payments API call
    } catch (ex) {
      console.error(ex);
    }
  });
}

start();
