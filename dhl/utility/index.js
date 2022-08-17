import { string as YupString, object as YupObject } from 'yup';

import { __ } from '../../../../../i18n';
import { _isObjEmpty } from '../../../../../utils';
import { DHL_DELIVERY_FORM } from '../../../../../config';

export const selectedLocationField = `${DHL_DELIVERY_FORM}.selectedLocation`;
export const selectedServiceCodeField = `${DHL_DELIVERY_FORM}.selectedServiceCode`;
export const selectedOptionCodeField = `${DHL_DELIVERY_FORM}.selectedOptionCode`;

export function canShowShippingOption(
  shippingOptionCode,
  shippingOptions,
  actionList
) {
  const canShow = false;
  const shippingOption = shippingOptions.find(
    (so) => so.code === shippingOptionCode
  );

  if (!shippingOption) {
    return canShow;
  }

  return !shippingOption.inputs.every((soInput) => {
    const optionName = `${shippingOptionCode}.${soInput.code}`;
    return actionList.hide.includes(optionName);
  });
}

export function prepareInputList(checkoutData, carrierCode) {
  return (checkoutData[carrierCode]?.service_options || []).reduce(
    (accumulator, serviceOption) => {
      serviceOption.inputs.forEach((input) => {
        const inputName = `${serviceOption.code}.${input.code}`;
        accumulator[inputName] = input;
      });
      return accumulator;
    },
    {}
  );
}

const parcelPickupFacilities = [
  'filiale',
  'paketbox',
  'postfach',
  'paketshop',
  'parcelshop',
  'pakstation',
  'bakstation',
  'packstation',
  'postfiliale',
  'paketkasten',
  'pakcstation',
  'backstation',
  'paackstation',
  'wunschfiliale',
  'deutsche post',
  'dhlpaketstation',
];
const specialChars = ['<', '>', '\\n', '\\r', '\\', "'", '"', ';', '+'];

const isOnDenyList = (value, denyList) =>
  denyList.includes((value || '').toLowerCase());

export function prepareValidationRules(
  fieldName,
  jqValidationRules,
  requiredFields
) {
  let yupValidatonRules = YupString();
  if (requiredFields.includes(fieldName)) {
    yupValidatonRules = yupValidatonRules.required(__('Required'));
  }
  jqValidationRules.forEach((jqRule) => {
    if (jqRule.name === 'maxLength') {
      yupValidatonRules = yupValidatonRules.max(
        Number(jqRule.param),
        __('Please enter less or equal than %1 symbols.', jqRule.param)
      );
    }
    if (jqRule.name === 'validate-number') {
      yupValidatonRules = yupValidatonRules.matches(
        /^\s*-?\d*(?:[.,|'|\s]\d+)*(?:[.,|'|\s]\d{2})?-?\s*$/,
        __('Please enter a valid number in this field.')
      );
    }

    if (jqRule.name === 'validate-no-html-tags') {
      yupValidatonRules = yupValidatonRules.matches(
        !/<(\/)?\w+/,
        __('HTML tags are not allowed.')
      );
    }

    if (jqRule.name === 'nrshipping-validate-no-special-chars') {
      yupValidatonRules = yupValidatonRules.test(
        'nrshipping-validate-no-special-chars',
        __('Your input must not include one of the following: ') +
          specialChars.join(' '),
        (value) => !isOnDenyList(value, specialChars)
      );
    }

    if (jqRule.name === 'nrshipping-validate-no-pickup-address') {
      yupValidatonRules = yupValidatonRules.test(
        'nrshipping-validate-no-pickup-address',
        __('You must not refer to a parcel shop, postal office, or similar.'),
        (value) => !isOnDenyList(value, parcelPickupFacilities)
      );
    }
  });
  return yupValidatonRules;
}

export const initialValidationSchema = {
  searchCountry: YupString().nullable(),
  searchCity: YupString().nullable(),
  searchZip: YupString().nullable(),
  searchStreet: YupString().nullable(),
};

export function prepareDhlDeliveryValidationSchema(actionList, inputList) {
  const newValidationSchema = { ...initialValidationSchema };
  (actionList.show || []).forEach((fieldName) => {
    const [shippingCode, optionCode] = fieldName.split('.');
    const jqFieldValidationRules = inputList[fieldName]?.validation_rules || [];
    newValidationSchema[shippingCode] = YupObject().shape({
      [optionCode]: prepareValidationRules(
        fieldName,
        jqFieldValidationRules,
        actionList.require || []
      ),
    });
  });
  return newValidationSchema;
}

export function prepareSelectionsDataFormLocation(location, optionCode) {
  let selection = {};

  if (location) {
    selection = {
      [optionCode]: true,
      id: location.shop_id,
      type: location.shop_type,
      city: location.address.city,
      number: location.shop_number,
      street: location.address.street,
      company: location.address.company,
      displayName: location.display_name,
      postalCode: location.address.postal_code,
      countryCode: location.address.country_code,
    };
  }

  return selection;
}

export function prepareSelectionsDataFromForm({
  optionCode,
  shippingCode,
  selectionsData,
  formSectionValues,
}) {
  if (!_isObjEmpty(selectionsData)) {
    return selectionsData;
  }
  const selectedLocation = formSectionValues?.selectedLocation;
  const selectedServiceCode = formSectionValues?.selectedServiceCode;
  const selectedOptionCode = formSectionValues?.selectedOptionCode;

  if (
    selectedLocation &&
    selectedServiceCode === shippingCode &&
    selectedOptionCode === optionCode
  ) {
    return {
      [shippingCode]: prepareSelectionsDataFormLocation(
        selectedLocation,
        optionCode
      ),
    };
  }

  return selectionsData;
}
