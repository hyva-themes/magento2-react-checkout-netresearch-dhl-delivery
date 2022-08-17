import modifier from './modifier';
import { _keys } from '../../../../../../../utils';
import sendRequest from '../../../../../../../api/sendRequest';
import RootElement from '../../../../../../../utils/rootElement';
import LocalStorage from '../../../../../../../utils/localStorage';

export default async function restGuestUpdateSelectedShippingOption(
  dispatch,
  shippingOptionCode,
  selections
) {
  const cartId = LocalStorage.getCartId();
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const updateShippingSelectionUrl = `${restUrlPrefix}guest-carts/${cartId}/nrshipping/shipping-option/selection/update`;

  const shippingOptionSelections = _keys(selections).reduce(
    (accumulator, inputCode) => {
      accumulator.push({
        inputCode,
        inputValue: selections[inputCode],
        shippingOptionCode,
      });
      return accumulator;
    },
    []
  );
  return modifier(
    await sendRequest(
      dispatch,
      { shippingOptionSelections },
      updateShippingSelectionUrl
    )
  );
}
