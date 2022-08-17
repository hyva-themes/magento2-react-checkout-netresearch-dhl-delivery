import { _isArray } from '../../../../../utils';

export const DELIVERY_LOCATION_SHIPPING_OPTION = 'deliveryLocation';

export const shippingOptionCodes = {
  /**
   * Determine if a shipping option code is a dot-separated compound code
   * with a shipping option code and an input code.
   */
  isCompoundCode(code) {
    return code.indexOf('.') !== -1;
  },

  convertToCompoundCodes(code, shippingData) {
    let result = [];
    let inputCodes;

    /**
     * Handle arrays recursively.
     */
    if (_isArray(code)) {
      code.forEach(code, (singleCode) => {
        result = result.concat(
          shippingOptionCodes.convertToCompoundCodes(singleCode)
        );
      });

      return result;
    }

    if (shippingOptionCodes.isCompoundCode(code)) {
      result.push(code);

      return result;
    }

    const shippingOption = shippingData.service_options.find(
      (option) => option.code === code
    );

    if (shippingOption) {
      inputCodes = shippingOption.inputs.map((input) => input.code);
      result = inputCodes.map((inputCode) => [code, inputCode].join('.'));
    }

    return result;
  },
};
