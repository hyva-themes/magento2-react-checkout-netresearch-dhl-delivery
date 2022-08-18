import React from 'react';

import DhlDeliveryDataProvider from './context/DhlDeliveryDataProvider';
import DhlDeliveryOptionAreas from './components/DhlDeliveryOptionAreas';
import DhlDeliveryFormManager from './components/DhlDeliveryFormManager';
import { formikDataShape } from '../../../utils/propTypes';

const DhlDeliveryMemorized = React.memo(({ formikData }) => (
  <DhlDeliveryDataProvider>
    <DhlDeliveryFormManager formikData={formikData}>
      <DhlDeliveryOptionAreas />
    </DhlDeliveryFormManager>
  </DhlDeliveryDataProvider>
));

DhlDeliveryMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default DhlDeliveryMemorized;
