import { useCallback, useState } from 'react';
import { get as _get, set as _set } from 'lodash-es';

import { footNotes } from '../utility/footnotes';
import prepareActionsList from '../utility/enforceCompatibility';
import { prepareInputList, _objHasOwnProperty } from '../utility';
import useDhlDeliveryDataContext from './useDhlDeliveryDataContext';
import useDhlDeliveryCartContext from './useDhlDeliveryCartContext';

export default function useDhlDeliveryCheckoutData() {
  const [cachedData, setCachedData] = useState({});
  const {
    visible,
    carrierCode,
    updateDhlData,
    lastCarrierCode,
    setDhlVisibility,
    setDhlCheckoutData,
    collectDhlCheckoutData,
  } = useDhlDeliveryDataContext();
  const { selectedShippingMethod } = useDhlDeliveryCartContext();

  const refreshData = useCallback(
    (checkoutData) => {
      const carrierData = _get(checkoutData, carrierCode) || {};

      if (!carrierData.service_options?.length) {
        setDhlVisibility(false);
        return;
      }

      if (carrierData?.code === lastCarrierCode && visible) {
        return;
      }

      let dhlDataToUpdate = {};

      if (_objHasOwnProperty(carrierData, 'metadata')) {
        dhlDataToUpdate = {
          image: carrierData.metadata.logo_url,
          imageWidth: carrierData.metadata.logo_width,
          title: carrierData.metadata.title,
          displayColor: carrierData.metadata.color,
          commentsBefore: carrierData.metadata.comments_before,
          commentsAfter: carrierData.metadata.comments_after,
          footnotes: footNotes.filterAvailable(
            carrierData.metadata?.footnotes,
            carrierData
          ),
        };
      }

      // set visible and memorize current carrier
      dhlDataToUpdate.visible = true;
      dhlDataToUpdate.lastCarrierCode = selectedShippingMethod?.carrierCode;
      dhlDataToUpdate.actionList = prepareActionsList(
        carrierCode,
        carrierData
      )();

      updateDhlData(dhlDataToUpdate);
    },
    [
      visible,
      carrierCode,
      updateDhlData,
      lastCarrierCode,
      setDhlVisibility,
      selectedShippingMethod,
    ]
  );

  const collectCheckoutData = useCallback(
    async (countryId, postalCode) => {
      const cacheId = `${countryId}__${postalCode}`;

      // if the checkout-data already collected, then use it from the cache.
      if (cachedData[cacheId]) {
        setDhlCheckoutData(cachedData[cacheId]);
        refreshData(cachedData[cacheId]);
        return;
      }

      try {
        const checkoutData = await collectDhlCheckoutData(
          countryId,
          postalCode
        );
        const inputList = prepareInputList(checkoutData, carrierCode);
        _set(checkoutData, `${carrierCode}.inputList`, inputList);
        setCachedData({ ...cachedData, [cacheId]: checkoutData });
        setDhlCheckoutData(checkoutData);
        refreshData(checkoutData);
      } catch (error) {
        console.error(error);
        setCachedData({ ...cachedData, cacheId: {} });
        setDhlCheckoutData({});
        refreshData({});
      }
    },
    [
      cachedData,
      refreshData,
      carrierCode,
      setDhlCheckoutData,
      collectDhlCheckoutData,
    ]
  );

  return { collectCheckoutData };
}
