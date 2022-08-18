import { useContext } from 'react';

import DhlDeliveryContext from '../context/DhlDeliveryContext';

export default function useDhlDeliveryDataContext() {
  const [dhlData, dhlActions] = useContext(DhlDeliveryContext);
  const {
    image,
    title,
    loader,
    search,
    visible,
    locations,
    actionList,
    imageWidth,
    methodCode,
    carrierCode,
    checkoutData,
    errorMessage,
    displayColor,
    commentsBefore,
    lastCarrierCode,
    selectedLocation,
    selections: selectionsData,
  } = dhlData || {};
  const {
    setDhlLoader,
    updateDhlData,
    setDhlLocations,
    disableDhlSearch,
    setDhlVisibility,
    setDhlActionList,
    activateDhlSearch,
    setDhlCheckoutData,
    setDhlErrorMessage,
    updateDhlSelections,
    restDhlFetchLocations,
    collectDhlCheckoutData,
    updateDhlSelectedLocation,
    updateSelectedShippingOption,
  } = dhlActions || {};
  const inputList = checkoutData[carrierCode]?.inputList;

  return {
    image,
    title,
    loader,
    search,
    visible,
    inputList,
    locations,
    actionList,
    imageWidth,
    methodCode,
    carrierCode,
    errorMessage,
    checkoutData,
    displayColor,
    setDhlLoader,
    updateDhlData,
    commentsBefore,
    selectionsData,
    lastCarrierCode,
    setDhlLocations,
    selectedLocation,
    setDhlVisibility,
    disableDhlSearch,
    setDhlActionList,
    activateDhlSearch,
    setDhlCheckoutData,
    setDhlErrorMessage,
    updateDhlSelections,
    restDhlFetchLocations,
    collectDhlCheckoutData,
    updateDhlSelectedLocation,
    updateSelectedShippingOption,
  };
}
