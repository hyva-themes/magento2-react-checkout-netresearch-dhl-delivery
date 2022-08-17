import {
  setDhlLoaderReducer,
  updateDhlDataReducer,
  setDhlLocationsReducer,
  setDhlVisibilityReducer,
  disableDhlSearchReducer,
  setDhlActionListReducer,
  activateDhlSearchReducer,
  setDhlCheckoutDataReducer,
  setDhlErrorMessageReducer,
  updateDhlSelectionsReducer,
  updateDhlSelectedLocationReducer,
} from './dhl/reducers';
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
} from './dhl/types';

const actions = {
  [SET_DHL_LOADER]: setDhlLoaderReducer,
  [UPDATE_DHL_DATA]: updateDhlDataReducer,
  [SET_DHL_LOCATIONS]: setDhlLocationsReducer,
  [SET_DHL_VISIBILITY]: setDhlVisibilityReducer,
  [DISABLE_DHL_SEARCH]: disableDhlSearchReducer,
  [SET_DHL_ACTION_LIST]: setDhlActionListReducer,
  [ACTIVATE_DHL_SEARCH]: activateDhlSearchReducer,
  [SET_DHL_ERROR_MESSAGE]: setDhlErrorMessageReducer,
  [SET_DHL_CHECKOUT_DATA]: setDhlCheckoutDataReducer,
  [UPDATE_DHL_SELECTIONS]: updateDhlSelectionsReducer,
  [UPDATE_DHL_SELECTED_LOCATION]: updateDhlSelectedLocationReducer,
};

export default function dhlDeliveryReducer(state, { type, payload }) {
  const action = actions[type];

  if (action) {
    return action(state, payload);
  }

  return state;
}
