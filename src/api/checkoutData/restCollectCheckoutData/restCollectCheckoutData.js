import modifier from './modifier';
import sendRequest from '../../../../../../api/sendRequest';
import RootElement from '../../../../../../utils/rootElement';

export default async function restCollectCheckoutData(
  dispatch,
  countryId,
  postalCode
) {
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}nrshipping/checkout-data/get`;

  return modifier(
    await sendRequest(dispatch, { countryId, postalCode }, setPaymentMethodUrl)
  );
}
