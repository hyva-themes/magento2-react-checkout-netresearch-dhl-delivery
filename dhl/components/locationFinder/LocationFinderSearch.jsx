import React from 'react';

import { __ } from '../../../../../../i18n';
import { useDhlDeliveryDataContext } from '../../hooks';

function LocationFinderSearch() {
  const { activateDhlSearch, setDhlErrorMessage } = useDhlDeliveryDataContext();

  const searchLocations = async () => {
    setDhlErrorMessage('');
    activateDhlSearch();
  };

  return (
    <button
      className="mt-6 btn btn-primary"
      type="button"
      onClick={searchLocations}
    >
      <span>{__('Search')}</span>
    </button>
  );
}

export default LocationFinderSearch;
