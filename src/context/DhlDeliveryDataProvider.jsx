import React, { useMemo, useReducer } from 'react';
import { node } from 'prop-types';

import initialState from './initialState';
import dhlDeliveryReducer from './dhlDeliveryReducer';
import DhlDeliveryContext from './DhlDeliveryContext';
import useAppContext from '../../../../hook/useAppContext';
import dhlDeliveryDispatcher from './dhlDeiliveryDispatcher';

function DhlDeliveryDataProvider({ children }) {
  const [dhlData, dispatch] = useReducer(dhlDeliveryReducer, initialState);
  const { appDispatch } = useAppContext();
  const dhlActions = useMemo(
    () => dhlDeliveryDispatcher(dispatch, appDispatch),
    [dispatch, appDispatch]
  );
  const context = useMemo(() => [dhlData, dhlActions], [dhlData, dhlActions]);

  return (
    <DhlDeliveryContext.Provider value={context}>
      {children}
    </DhlDeliveryContext.Provider>
  );
}

DhlDeliveryDataProvider.propTypes = {
  children: node.isRequired,
};

export default DhlDeliveryDataProvider;
