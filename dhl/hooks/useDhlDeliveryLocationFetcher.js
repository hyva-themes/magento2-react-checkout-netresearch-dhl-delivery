import { useCallback } from 'react';

import { _isArray } from '../../../../../utils';
import useDhlDeliveryDataContext from './useDhlDeliveryDataContext';
import useDhlDeliveryFormContext from './useDhlDeliveryFormContext';

export default function useDhlDeliveryLocationFetcher() {
  const {
    locations,
    carrierCode,
    setDhlLoader,
    setDhlLocations,
    disableDhlSearch,
    setDhlErrorMessage,
    restDhlFetchLocations,
  } = useDhlDeliveryDataContext();
  const { formSectionValues } = useDhlDeliveryFormContext();
  const { searchCountry, searchZip, searchCity, searchStreet } =
    formSectionValues || {};

  const fetchLocations = useCallback(async () => {
    try {
      if (!searchCity && !searchStreet && !searchZip) {
        return;
      }
      const locationId = `${searchCountry}.${searchZip}.${searchCity}.${searchStreet}`;

      if (locations[locationId]) {
        return;
      }

      setDhlLoader(true);
      const searchLocations = await restDhlFetchLocations(carrierCode, {
        city: searchCity,
        street: searchStreet,
        postal_code: searchZip,
        country_code: searchCountry,
      });
      setDhlLoader(false);

      if (_isArray(searchLocations) && searchLocations.length) {
        setDhlLocations({ [locationId]: searchLocations });
      } else if (searchLocations?.message) {
        setDhlErrorMessage(searchLocations.message);
      }
      disableDhlSearch();
    } catch (error) {
      console.error(error);
    }
  }, [
    locations,
    searchZip,
    searchCity,
    carrierCode,
    searchStreet,
    setDhlLoader,
    searchCountry,
    setDhlLocations,
    disableDhlSearch,
    setDhlErrorMessage,
    restDhlFetchLocations,
  ]);

  return { fetchLocations };
}
