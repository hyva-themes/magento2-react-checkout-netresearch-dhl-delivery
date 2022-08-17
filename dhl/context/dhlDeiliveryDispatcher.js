import {
  setDhlLoaderAction,
  updateDhlDataAction,
  setDhlLocationsAction,
  setDhlVisibilityAction,
  disableDhlSearchAction,
  setDhlActionListAction,
  activateDhlSearchAction,
  setDhlCheckoutDataAction,
  setDhlErrorMessageAction,
  updateDhlSelectionsAction,
  restDhlFetchLocationsAction,
  collectDhlCheckoutDataAction,
  updateDhlSelectedLocationAction,
  updateSelectedShippingOptionAction,
} from './dhl/actions';

const dispatchMapper = {
  setDhlLoader: setDhlLoaderAction,
  updateDhlData: updateDhlDataAction,
  setDhlLocations: setDhlLocationsAction,
  setDhlVisibility: setDhlVisibilityAction,
  disableDhlSearch: disableDhlSearchAction,
  setDhlActionList: setDhlActionListAction,
  activateDhlSearch: activateDhlSearchAction,
  setDhlCheckoutData: setDhlCheckoutDataAction,
  setDhlErrorMessage: setDhlErrorMessageAction,
  updateDhlSelections: updateDhlSelectionsAction,
  restDhlFetchLocations: restDhlFetchLocationsAction,
  collectDhlCheckoutData: collectDhlCheckoutDataAction,
  updateDhlSelectedLocation: updateDhlSelectedLocationAction,
  updateSelectedShippingOption: updateSelectedShippingOptionAction,
};

export default function dhlDeliveryDispatcher(dispatch, appDispatch) {
  const dispatchers = { dispatch };

  Object.keys(dispatchMapper).forEach((dispatchName) => {
    dispatchers[dispatchName] = dispatchMapper[dispatchName].bind(
      null,
      dispatch,
      appDispatch
    );
  });

  return dispatchers;
}
