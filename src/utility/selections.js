import { _keys, _toString } from '../../../../utils';

export const selections = {
  getSelectionValuesInCompoundFormat(carrier, selectionsData) {
    const selectionObjects = [];

    if (!carrier) {
      return selectionObjects;
    }

    _keys(selectionsData).forEach((shippingOptionCode) => {
      _keys(selectionsData[shippingOptionCode]).forEach((inputCode) => {
        const inputValue = selectionsData[shippingOptionCode][inputCode];
        if (inputValue) {
          selectionObjects.push({
            code: [shippingOptionCode, inputCode].join('.'),
            value: inputValue === true ? '1' : _toString(inputValue),
          });
        }
      });
    });

    return selectionObjects;
  },
  getShippingOptionValue(shippingOptionCode, inputCode, carrierCode) {
    if (!carrierCode) {
      return null;
    }

    const carrierData = this.getByCarrier(carrierCode);

    if (!carrierData || !(shippingOptionCode in carrierData)) {
      return null;
    }

    const selection = carrierData[shippingOptionCode];

    if (!inputCode) {
      return selection;
    }
    if (inputCode in selection) {
      return selection[inputCode];
    }

    return null;
  },
};
