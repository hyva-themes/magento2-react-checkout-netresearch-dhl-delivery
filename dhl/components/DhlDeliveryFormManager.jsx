import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import { set as _set } from 'lodash-es';

import {
  initialValidationSchema,
  prepareDhlDeliveryValidationSchema,
} from '../utility';
import { DhlDeliveryFormContext } from '../context';
import { useDhlDeliveryDataContext } from '../hooks';
import { useFormSection } from '../../../../../hooks';
import { DHL_DELIVERY_FORM } from '../../../../../config';
import { formikDataShape } from '../../../../../utils/propTypes';
import { _emptyFunc, _isObjEmpty, _keys } from '../../../../../utils';
import { dhlDeliveryInitialValues } from '../../step/utility/initialValues';
import useDhlDeliveryCheckoutData from '../hooks/useDhlDeliveryCheckoutData';

function DhlDeliveryFormManager({ children, formikData }) {
  const [initialValues, setInitialValues] = useState(dhlDeliveryInitialValues);
  const [validationSchema, setValidationSchema] = useState(
    initialValidationSchema
  );
  const { collectCheckoutData } = useDhlDeliveryCheckoutData();
  const { actionList, inputList } = useDhlDeliveryDataContext();
  const { shippingAddressValues } = formikData;
  const { postCode: shippingPostCode, country: shippingCountry } =
    shippingAddressValues;

  // collecting checkout data of shipping method based on the shipping address postcode and country
  useEffect(() => {
    if (shippingCountry && shippingPostCode) {
      collectCheckoutData(shippingCountry, shippingPostCode);
    }
  }, [shippingPostCode, shippingCountry]);

  // initializing shipping service input fields into formik state
  useEffect(() => {
    if (_isObjEmpty(inputList)) {
      return;
    }

    const newInputValues = { ...dhlDeliveryInitialValues };
    _keys(inputList).forEach((inputFieldName) => {
      _set(newInputValues, inputFieldName, '');
    });
    setInitialValues(newInputValues);
  }, [inputList]);

  // Updating validation shema based on the action list;
  // Action list changes based on the action happens in the shipping method section.
  // So it is vital to recalculate validation schema.
  useEffect(() => {
    if (!actionList || !actionList.show || !actionList.show.length) {
      return;
    }

    setValidationSchema(
      prepareDhlDeliveryValidationSchema(actionList, inputList)
    );
  }, [inputList, actionList]);

  const formContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: DHL_DELIVERY_FORM,
    submitHandler: _emptyFunc(),
  });

  const context = useMemo(
    () => ({
      formikData,
      validationSchema,
      setValidationSchema,
      ...formikData,
      ...formContext,
    }),
    [formikData, formContext, validationSchema]
  );

  return (
    <DhlDeliveryFormContext.Provider value={context}>
      {children}
    </DhlDeliveryFormContext.Provider>
  );
}

DhlDeliveryFormManager.propTypes = {
  formikData: formikDataShape.isRequired,
  children: node.isRequired,
};

export default DhlDeliveryFormManager;
