import {
  SET_DHL_LOADER,
  UPDATE_DHL_DATA,
  SET_DHL_LOCATIONS,
  SET_DHL_VISIBILITY,
  DISABLE_DHL_SEARCH,
  ACTIVATE_DHL_SEARCH,
  SET_DHL_ACTION_LIST,
  SET_DHL_CHECKOUT_DATA,
  UPDATE_DHL_SELECTIONS,
  SET_DHL_ERROR_MESSAGE,
  UPDATE_DHL_SELECTED_LOCATION,
} from './types';
import {
  restCollectCheckoutDataRequest,
  restDhlDeliveryFetchLocationsRequest,
  restMineUpdateSelectedShippingOptionRequest,
  restGuestUpdateSelectedShippingOptionRequest,
} from '../../api/checkoutData';

export async function setDhlCheckoutDataAction(
  dispatch,
  appDispatch,
  checkoutData
) {
  dispatch({
    type: SET_DHL_CHECKOUT_DATA,
    payload: checkoutData,
  });
}

export function collectDhlCheckoutDataAction(
  dispatch,
  appDispatch,
  countryId,
  postalCode
) {
  return restCollectCheckoutDataRequest(appDispatch, countryId, postalCode);
}

export function updateDhlDataAction(dispatch, appDispatch, dataToUpdate) {
  dispatch({
    type: UPDATE_DHL_DATA,
    payload: dataToUpdate,
  });
}

export function setDhlVisibilityAction(dispatch, appDispatch, visibility) {
  dispatch({
    type: SET_DHL_VISIBILITY,
    payload: visibility,
  });
}

export function restDhlFetchLocationsAction(
  dispatch,
  appDispatch,
  carrierCode,
  address
) {
  return restDhlDeliveryFetchLocationsRequest(
    appDispatch,
    carrierCode,
    address
  );
}

export function setDhlLoaderAction(dispatch, appDispatch, loader) {
  dispatch({
    type: SET_DHL_LOADER,
    payload: loader,
  });
}

export function setDhlLocationsAction(dispatch, appDispatch, locations) {
  dispatch({
    type: SET_DHL_LOCATIONS,
    payload: locations,
  });
}

export function activateDhlSearchAction(dispatch) {
  dispatch({
    type: ACTIVATE_DHL_SEARCH,
  });
}

export function disableDhlSearchAction(dispatch) {
  dispatch({
    type: DISABLE_DHL_SEARCH,
  });
}

export function updateDhlSelectedLocationAction(
  dispatch,
  appDispatch,
  location
) {
  dispatch({
    type: UPDATE_DHL_SELECTED_LOCATION,
    payload: location,
  });
}

export function updateSelectedShippingOptionAction(
  dispatch,
  appDispatch,
  shippingCode,
  shippingSelections,
  isLoggedIn
) {
  if (isLoggedIn) {
    return restMineUpdateSelectedShippingOptionRequest(
      appDispatch,
      shippingCode,
      shippingSelections
    );
  }
  return restGuestUpdateSelectedShippingOptionRequest(
    appDispatch,
    shippingCode,
    shippingSelections
  );
}

export function updateDhlSelectionsAction(dispatch, appDispatch, selections) {
  dispatch({
    type: UPDATE_DHL_SELECTIONS,
    payload: selections,
  });
}

export function setDhlActionListAction(dispatch, appDispatch, actionList) {
  dispatch({
    type: SET_DHL_ACTION_LIST,
    payload: actionList,
  });
}

export function setDhlErrorMessageAction(dispatch, appDispatch, message) {
  dispatch({
    type: SET_DHL_ERROR_MESSAGE,
    payload: message,
  });
}
