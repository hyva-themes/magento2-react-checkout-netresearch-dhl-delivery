import React from 'react';
import { get as _get } from 'lodash-es';

import DhlDeliveryOption from './DhlDeliveryOption';
import { canShowShippingOption } from '../utility';
import { useDhlDeliveryDataContext } from '../hooks';

function DhlDeliveryOptionList() {
  const { checkoutData, carrierCode, actionList } = useDhlDeliveryDataContext();
  const shippingOptions =
    _get(checkoutData, `${carrierCode}.service_options`) || [];

  return shippingOptions.map((shippingOption) => (
    <React.Fragment key={shippingOption.code}>
      {canShowShippingOption(
        shippingOption.code,
        shippingOptions,
        actionList
      ) && (
        <>
          <h4 className="my-3 text-sm font-semibold">{shippingOption.label}</h4>
          <div className="mb-2">
            {shippingOption.inputs.map((shippingInput) => (
              <div
                className="mb-4"
                key={`${shippingOption.code}__${shippingInput.code}`}
              >
                <DhlDeliveryOption
                  config={shippingInput}
                  shippingCode={shippingOption.code}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </React.Fragment>
  ));
}

export default DhlDeliveryOptionList;
