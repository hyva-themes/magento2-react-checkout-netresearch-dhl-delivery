import modifier from './modifier';
import { _keys } from '../../../../../../utils';
import sendRequest from '../../../../../../api/sendRequest';
import RootElement from '../../../../../../utils/rootElement';

export default async function restMineUpdateSelectedShippingOption(
  dispatch,
  shippingOptionCode,
  selections
) {
  const { restUrlPrefix } = RootElement.getPaymentConfig();
  const updateShippingSelectionUrl = `${restUrlPrefix}carts/mine/nrshipping/shipping-option/selection/update`;

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
