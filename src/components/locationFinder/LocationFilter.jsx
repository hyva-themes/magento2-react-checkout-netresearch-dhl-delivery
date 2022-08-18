/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { string } from 'prop-types';

function LocationFilter({ iconSize, iconUrl, type }) {
  return (
    <label className="location-filter-label">
      <input type="checkbox" checked="checked" aria-label={type} readOnly />
      <img src={iconUrl} alt={type} height={iconSize} />
    </label>
  );
}

LocationFilter.propTypes = {
  type: string.isRequired,
  iconUrl: string.isRequired,
  iconSize: string.isRequired,
};

export default LocationFilter;
