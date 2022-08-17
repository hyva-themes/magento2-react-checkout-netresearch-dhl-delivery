import React from 'react';
import { string } from 'prop-types';

import {
  useDhlDeliveryFormContext,
  useDhlUpdateSelectedOption,
} from '../../hooks';
import {
  selectedLocationField,
  selectedOptionCodeField,
  selectedServiceCodeField,
} from '../../utility';
import { __ } from '../../../../../../i18n';

function RemoveLocationButton({ shippingCode, optionCode }) {
  const { updateDhlSelectedShippingOption } = useDhlUpdateSelectedOption();
  const { setFieldValue } = useDhlDeliveryFormContext();

  const clickHandler = async () => {
    await updateDhlSelectedShippingOption(null, shippingCode, optionCode);
    setFieldValue(selectedLocationField, null);
    setFieldValue(selectedServiceCodeField, '');
    setFieldValue(selectedOptionCodeField, '');
  };

  return (
    <button
      type="button"
      id="removeLocation"
      onClick={clickHandler}
      className="px-4 py-1 font-semibold border rounded-md action-remove-button bg-grayscale-10 border-grayscale-30"
    >
      <span className="action-remove">{__('Remove')}</span>
    </button>
  );
}

RemoveLocationButton.propTypes = {
  optionCode: string.isRequired,
  shippingCode: string.isRequired,
};

export default RemoveLocationButton;
