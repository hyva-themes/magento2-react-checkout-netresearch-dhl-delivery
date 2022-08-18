import React, { useMemo } from 'react';
import { get as _get } from 'lodash-es';
import { func, shape } from 'prop-types';
import { useFormikContext } from 'formik';

import DhlDeliveryMemorized from './DhlDeliveryMemorized';
import { DHL_DELIVERY_FORM } from './utility';
import { SHIPPING_ADDR_FORM } from '../../../config';
import { shippingMethodShape } from '../../../utils/shipping';
import useFormikMemorizer from '../../../hook/useFormikMemorizer';

function DhlDelivery({ method, selected, actions }) {
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
      shippingValues: { method, selected, actions },
      shippingAddressValues: {
        city: shippingCity,
        street: shippingStreet,
        country: shippingCountry,
        // Limiting postcode for DE. Useful for avoiding unwanted rendering of some side effects.
        postCode: shippingPostCode?.length === 5 ? shippingPostCode : '',
      },
    }),
    [
      method,
      actions,
      selected,
      shippingCity,
      shippingStreet,
      shippingCountry,
      formSectionData,
      shippingPostCode,
    ]
  );

  return <DhlDeliveryMemorized formikData={formikData} />;
}

DhlDelivery.propTypes = {
  method: shippingMethodShape.isRequired,
  selected: shippingMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default DhlDelivery;
