/* eslint-disable react/no-array-index-key */
import React from 'react';
import { shape, string } from 'prop-types';

import { __ } from '../../../../../i18n';

/**
 * This component appears as the pickup location markers in the google map
 * This component is converted to html string and thus populating the markers.
 */
function LocationPopup({ location }) {
  return (
    <div className="text-xs leading-5 popup-container">
      {location.display_name && (
        <h4 className="mb-1 text-sm font-semibold">
          <span>{location.display_name}</span>
        </h4>
      )}
      <div>{location.address.company}</div>
      <div>{location.address.street}</div>
      <div className="flex justify-start gap-1">
        <span>{location.address.postal_code}</span>
        <span>{location.address.city}</span>
      </div>
      {location.opening_hours.length > 0 && (
        <div>
          <h5 className="my-1 text-xs font-semibold">{__('Opening Hours')}</h5>
          <table className="opening-hours">
            {location.opening_hours.map((time) => (
              <tr key={time.day_of_week}>
                <td className="pr-5">{time.day_of_week}</td>
                {time.time_frames.map((frame, index) => (
                  <td key={`${time.day_of_week}__${index}`}>
                    <div>
                      <time>{frame.opens}</time>
                      {' - '}
                      <time>{frame.closes}</time>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      )}
      {location.services.length > 0 && (
        <div>
          <h5 className="my-1 text-xs font-semibold">{__('Services')}</h5>
          <p className="!m-0">
            {location.services.map((service) => (
              <React.Fragment key={service}>
                <span>{service}</span>
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      )}

      <button type="button" className="px-6 py-2 mt-3 btn select-button">
        {__('Select')}
      </button>
    </div>
  );
}

LocationPopup.propTypes = {
  location: shape({ shop_id: string }).isRequired,
};

export default LocationPopup;
