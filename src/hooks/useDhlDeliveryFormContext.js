import { useContext } from 'react';

import { DhlDeliveryFormContext } from '../context';

export default function useDhlDeliveryFormContext() {
  const {
    fields,
    formikData,
    setFieldValue,
    formSectionValues,
    shippingAddressValues,
  } = useContext(DhlDeliveryFormContext);

  return {
    fields,
    formikData,
    setFieldValue,
    formSectionValues,
    shippingAddressValues,
  };
}
