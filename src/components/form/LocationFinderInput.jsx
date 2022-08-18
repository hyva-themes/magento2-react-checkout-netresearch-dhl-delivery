import React, { useEffect, useMemo } from 'react';
import { get as _get } from 'lodash-es';
import { shape, string } from 'prop-types';

import { LocationFinderModal, RemoveLocationButton } from '../locationFinder';
import {
  useDhlDeliveryDataContext,
  useDhlDeliveryFormContext,
  useLocationFinderModalContext,
} from '../../hooks';
import { prepareSelectionsDataFromForm } from '../../utility';
import prepareActionsList from '../../utility/enforceCompatibility';

function LocationFinderInput({ config, shippingCode }) {
  const { formSectionValues } = useDhlDeliveryFormContext();
  const { carrierCode, checkoutData, selectionsData, setDhlActionList } =
    useDhlDeliveryDataContext();
  const { modalRef, isModalActive, setIsModalActive } =
    useLocationFinderModalContext();
  const carrierCheckoutData = _get(checkoutData, carrierCode);
  const selectedLocation = formSectionValues?.selectedLocation;

  const selections = useMemo(
    () =>
      prepareSelectionsDataFromForm({
        shippingCode,
        selectionsData,
        formSectionValues,
        optionCode: config.code,
      }),
    [shippingCode, config?.code, formSectionValues, selectionsData]
  );

  useEffect(() => {
    const actionsList = prepareActionsList(
      carrierCode,
      carrierCheckoutData,
      selections
    )();
    setDhlActionList(actionsList);
  }, [carrierCode, selections, setDhlActionList, carrierCheckoutData]);

  return (
    <div>
      {!selectedLocation && (
        <button
          type="button"
          className="btn"
          id="showLocationfinder"
          onClick={() => setIsModalActive(true)}
        >
          <span>{config.label}</span>
        </button>
      )}
      {selectedLocation && (
        <div className="flex items-start gap-4 mt-6">
          <RemoveLocationButton
            optionCode={config.code}
            shippingCode={shippingCode}
          />
          <div>
            {selectedLocation.display_name && (
              <div>
                <strong className="font-bold">
                  {selectedLocation.display_name}
                </strong>
              </div>
            )}
            <div>{selectedLocation.address.company}</div>
            <div>{selectedLocation.address.street}</div>
            <div className="flex gap-2">
              <span>{selectedLocation.address.postal_code}</span>
              <span>{selectedLocation.address.city}</span>
            </div>
          </div>
        </div>
      )}
      <div ref={modalRef}>
        {isModalActive && (
          <LocationFinderModal
            optionCode={config.code}
            shippingCode={shippingCode}
            actions={{ setIsModalActive }}
          />
        )}
      </div>
    </div>
  );
}

LocationFinderInput.propTypes = {
  shippingCode: string.isRequired,
  config: shape({ code: string }).isRequired,
};

export default LocationFinderInput;
