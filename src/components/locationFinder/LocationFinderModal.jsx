import React, { useCallback, useEffect, useState } from 'react';
import { func, shape, string } from 'prop-types';

import ErrorMesage from './ErrorMesage';
import LocationFinderSearch from './LocationFinderSearch';
import Loader from '../../../../../components/common/Loader/Loader';
import TextInput from '../../../../../components/common/Form/TextInput';
import SelectInput from '../../../../../components/common/Form/SelectInput';
import {
  selectedLocationField,
  selectedOptionCodeField,
  selectedServiceCodeField,
} from '../../utility';
import {
  useDhlDeliveryDataContext,
  useDhlDeliveryFormContext,
  useDhlUpdateSelectedOption,
  useDhlDeliveryLocationFetcher,
} from '../../hooks';
import { map } from '../../utility/map';
import { __ } from '../../../../../i18n';
import { _emptyFunc } from '../../../../../utils';
import { SHIPPING_ADDR_FORM } from '../../../../../config';
import useCountryState from '../../../../../components/address/hooks/useCountryState';

/** @todo error handling of map yet to be implemented. */
const errorHandler = _emptyFunc();
const regionField = `${SHIPPING_ADDR_FORM}.region`;

function LocationFinderModal({ actions, optionCode, shippingCode }) {
  const [mapDomElement, setMapDomElement] = useState(null);
  const { fetchLocations } = useDhlDeliveryLocationFetcher();
  const { loader, search, locations } = useDhlDeliveryDataContext();
  const { updateDhlSelectedShippingOption } = useDhlUpdateSelectedOption();
  const { formikData, fields, formSectionValues, setFieldValue } =
    useDhlDeliveryFormContext();
  const { countryOptions } = useCountryState({
    formikData,
    fields: { region: regionField },
  });
  const { setIsModalActive } = actions;
  const { searchCountry, searchCity, searchStreet, searchZip } =
    formSectionValues || {};
  const locationId = `${searchCountry}.${searchZip}.${searchCity}.${searchStreet}`;
  const searchLocations = locations[locationId];

  /**
   * Handling pickup location selection performed from the map.
   */
  const selectLocation = useCallback(
    (event) => {
      const { location } = event?.detail || {};
      // Updating formik related values; It is important to keep these info in formik; otherwise,
      // the selection data will be lost when we navigate to different checkout steps.
      setFieldValue(selectedLocationField, location);
      setFieldValue(selectedServiceCodeField, shippingCode);
      setFieldValue(selectedOptionCodeField, optionCode);

      // Save selected shipping option in the server side via api method
      updateDhlSelectedShippingOption(location, shippingCode, optionCode);

      // closing the modal.
      setIsModalActive(false);
    },
    [
      optionCode,
      shippingCode,
      setFieldValue,
      setIsModalActive,
      updateDhlSelectedShippingOption,
    ]
  );

  // Preparing callback ref for map container. This will be used to initialize map later.
  const mapRef = useCallback(
    (node) => {
      if (node) {
        setMapDomElement(node);
        // Trigger location search whenever a new reference is created;
        // Search will be carried out if the search feature is enabled.
        // Typicall location search will be carried out whenever the modal is opened
        // based on the shipping address related values.
        if (search) {
          fetchLocations();
        }
      }
    },
    [fetchLocations, search]
  );

  // When the modal is opened, we are initializing the map with the location details fetched
  // from the mapRef mounting.
  useEffect(() => {
    if (searchLocations && mapDomElement) {
      map.init(mapDomElement, 51.163375, 10.447683, 6, errorHandler);
      map.setLocations(searchLocations);
    }
  }, [mapDomElement, searchLocations]);

  // Google map and its content is not living in the react app. In order to communicate b/w google map
  // and reactapp, we are relying on custom event dispatchers. This side effect registers custom
  // event listeners;
  useEffect(() => {
    // event triggered when a pickup location is chosen from the map.
    document.addEventListener('LocationPopup::selectLocation', selectLocation);
    // best practice; remove the event listener here :)
    return () => {
      document.removeEventListener(
        'LocationPopup::selectLocation',
        selectLocation
      );
    };
  }, [selectLocation]);

  return (
    <div
      id="modal-locationfinder"
      className="fixed top-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full "
    >
      <div
        id="modal-locationfinder-drop-shadow"
        className="absolute top-0 left-0 w-full h-full bg-black opacity-60"
      />
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="relative w-4/5 bg-white rounded-lg shadow dark:bg-gray-700 md:w-2/5">
          <div id="modal-locationfinder-content">
            <ErrorMesage />
            <div id="modal-locationfinder-search" className="p-6 py-10">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <SelectInput
                    formikData={formikData}
                    name={fields.searchCountry}
                    label={__('Country')}
                    options={countryOptions}
                  />
                </div>
                <div>
                  <TextInput
                    formikData={formikData}
                    name={fields.searchCity}
                    label={__('City')}
                  />
                </div>
                <div>
                  <TextInput
                    formikData={formikData}
                    name={fields.searchZip}
                    label={__('Postcode')}
                  />
                </div>
                <div>
                  <TextInput
                    formikData={formikData}
                    name={fields.searchStreet}
                    label={__('Street')}
                  />
                </div>
              </div>
              <div className="message error" if="errorMessage">
                <span text="errorMessage" />
              </div>
              <LocationFinderSearch />
            </div>
            <div
              ref={mapRef}
              id="modal-locationfinder-map"
              className="relative h-[600px] max-screen-80"
            >
              {loader && (
                <div
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ zIndex: 500 }}
                >
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LocationFinderModal.propTypes = {
  optionCode: string.isRequired,
  shippingCode: string.isRequired,
  actions: shape({ setIsModalActive: func }).isRequired,
};

export default LocationFinderModal;
