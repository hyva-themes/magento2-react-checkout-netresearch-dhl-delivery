import React from 'react';
import { shape, string } from 'prop-types';

import { LocationFinderInput } from './form';
import { TextInput } from '../../common/form';
import Checkbox from '../../../../code/common/Form/Checkbox';
import { LocationFinderModalWrapper } from './locationFinder';
import { DHL_DELIVERY_FORM } from '../../../../../config';
import { useDhlDeliveryDataContext, useDhlDeliveryFormContext } from '../hooks';

function DhlDeliveryOption({ config, shippingCode }) {
  const { formikData } = useDhlDeliveryFormContext();
  const { actionList } = useDhlDeliveryDataContext();
  const optionName = `${shippingCode}.${config.code}`;

  if (actionList.hide.includes(optionName)) {
    return null;
  }

  if (config.input_type === 'text') {
    return (
      <TextInput
        formikData={formikData}
        placeholder={config.placeholder}
        name={`${DHL_DELIVERY_FORM}.${optionName}`}
        label={config.label_visible ? config.label : ''}
        required={actionList.require.includes(optionName)}
      />
    );
  }

  if (config.input_type === 'checkbox') {
    return <Checkbox name={optionName} label={config.label} />;
  }

  if (config.input_type === 'locationfinder') {
    return (
      <LocationFinderModalWrapper>
        <LocationFinderInput shippingCode={shippingCode} config={config} />
      </LocationFinderModalWrapper>
    );
  }

  return null;
}

DhlDeliveryOption.propTypes = {
  shippingCode: string.isRequired,
  config: shape({ code: string }).isRequired,
};

export default DhlDeliveryOption;
