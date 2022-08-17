import React, { useMemo } from 'react';
import { get as _get } from 'lodash-es';
import { useFormikContext } from 'formik';

import DhlDeliveryMemorized from './DhlDeliveryMemorized';
import { useFormikMemorizer } from '../../../../hooks';
import { DHL_DELIVERY_FORM, SHIPPING_ADDR_FORM } from '../../../../config';

function DhlDelivery() {
  const { values } = useFormikContext();
  const formSectionData = useFormikMemorizer(DHL_DELIVERY_FORM);

  // location finder search will be populated with below shipping address fields.
  const shippingCity = _get(values, `${SHIPPING_ADDR_FORM}.city`);
  const shippingCountry = _get(values, `${SHIPPING_ADDR_FORM}.country`);
  const shippingPostCode = _get(values, `${SHIPPING_ADDR_FORM}.zipcode`);
  const shippingStreet = _get(values, `${SHIPPING_ADDR_FORM}.street[0]`);

  const formikData = useMemo(
    () => ({
      ...formSectionData,
      shippingAddressValues: {
        city: shippingCity,
        street: shippingStreet,
        country: shippingCountry,
        // Limiting postcode for DE. Useful for avoiding unwanted rendering of some side effects.
        postCode: shippingPostCode?.length === 5 ? shippingPostCode : '',
      },
    }),
    [
      shippingCity,
      shippingStreet,
      shippingCountry,
      formSectionData,
      shippingPostCode,
    ]
  );

  return <DhlDeliveryMemorized formikData={formikData} />;
}

export default DhlDelivery;
