import { useCallback } from 'react';

import { __ } from '../../../../i18n';
import useDhlAppContext from './useDhlAppContext';
import { prepareSelectionsDataFormLocation } from '../utility';
import useDhlDeliveryDataContext from './useDhlDeliveryDataContext';
import useDhlDeliveryCartContext from './useDhlDeliveryCartContext';

export default function useDhlUpdateSelectedOption() {
  const { isCartShippingAddressValid } = useDhlDeliveryCartContext();
  const { setPageLoader, setErrorMessage, isLoggedIn } = useDhlAppContext();
  const { updateDhlSelections, updateSelectedShippingOption } =
    useDhlDeliveryDataContext();

  const updateDhlSelectedShippingOption = useCallback(
    async (location, shippingCode, optionCode) => {
      const selection = prepareSelectionsDataFormLocation(location, optionCode);
      updateDhlSelections({ [shippingCode]: selection });

      if (!isCartShippingAddressValid) {
        return;
      }

      try {
        setPageLoader(true);
        await updateSelectedShippingOption(shippingCode, selection, isLoggedIn);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          __('Your shipping option selections could not be saved.')
        );
      } finally {
        setPageLoader(false);
      }
    },
    [
      isLoggedIn,
      setPageLoader,
      setErrorMessage,
      updateDhlSelections,
      isCartShippingAddressValid,
      updateSelectedShippingOption,
    ]
  );

  return { updateDhlSelectedShippingOption };
}
