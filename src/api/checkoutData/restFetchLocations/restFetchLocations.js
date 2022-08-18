import modifier from './modifier';
import sendRequest from '../../../../../../api/sendRequest';
import RootElement from '../../../../../../utils/rootElement';

export default async function restFetchLocations(
  dispatch,
  carrierCode,
  searchAddress
) {
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const setPaymentMethodUrl = `${restUrlPrefix}nrshipping/delivery-locations/${carrierCode}/search`;

  return modifier(
    await sendRequest(dispatch, { searchAddress }, setPaymentMethodUrl)
  );
}
