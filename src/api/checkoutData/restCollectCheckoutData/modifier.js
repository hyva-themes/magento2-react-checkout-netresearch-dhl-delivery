import { set as _set } from 'lodash-es';

import prepareActionsList from '../../../utility/enforceCompatibility';

export default function restCollectCheckoutDataModifier(response) {
  return (response?.carriers || []).reduce((accumulator, carrier) => {
    const serviceOptions = carrier?.service_options || [];
    const actionList = prepareActionsList(carrier.code, carrier)();
    serviceOptions.forEach((serviceOption, index) => {
      const inputNames = serviceOption.inputs.map(
        (input) => `${serviceOption.code}.${input.code}`
      );
      const visible = inputNames.some((inputName) =>
        actionList.hide.includes(inputName)
      );
      _set(carrier, `service_options[${index}].visible`, visible);
    });

    accumulator[carrier.code] = carrier;
    return accumulator;
  }, {});
}
