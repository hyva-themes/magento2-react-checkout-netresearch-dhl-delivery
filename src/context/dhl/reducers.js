export function setDhlCheckoutDataReducer(state, checkoutData) {
  return {
    ...state,
    checkoutData,
  };
}

export function updateDhlDataReducer(state, dataToUpdate) {
  return {
    ...state,
    ...dataToUpdate,
  };
}

export function setDhlVisibilityReducer(state, visible) {
  return {
    ...state,
    visible,
  };
}

export function setDhlLoaderReducer(state, loader) {
  return {
    ...state,
    loader,
  };
}

export function setDhlLocationsReducer(state, locations) {
  return {
    ...state,
    locations: {
      ...state.locations,
      ...locations,
    },
  };
}

export function activateDhlSearchReducer(state) {
  return {
    ...state,
    search: true,
  };
}

export function disableDhlSearchReducer(state) {
  return {
    ...state,
    search: false,
  };
}

export function updateDhlSelectedLocationReducer(state, location) {
  return {
    ...state,
    selectedLocation: location,
  };
}

export function updateDhlSelectionsReducer(state, selections) {
  return {
    ...state,
    selections: {
      ...state.selections,
      ...selections,
    },
  };
}

export function setDhlActionListReducer(state, actionList) {
  return {
    ...state,
    actionList,
  };
}

export function setDhlErrorMessageReducer(state, errorMessage) {
  return {
    ...state,
    errorMessage,
  };
}
