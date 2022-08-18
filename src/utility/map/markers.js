import leaflet from 'leaflet';

import { tmplRenderer } from './templateRenderer';
import { _emptyFunc } from '../../../../../utils';
import LocationPopup from '../../components/locationFinder/LocationPopup';

let selectButtonClickCb = _emptyFunc();

const setEventListeners = (popup, location) => {
  const contentNode = popup._contentNode;
  if (!contentNode) {
    return;
  }
  const selectButton = contentNode.querySelector('.select-button');

  // when the select button available in the pickup location marker, we are firing a custom event.
  // This custom event will be listened in the react app and do the necessary changes.
  // Custom event is the best shot we got to communicate between map and the react app.
  if (selectButton) {
    selectButtonClickCb = () => {
      const locationSelectEvent = new CustomEvent(
        'LocationPopup::selectLocation',
        { detail: { location } }
      );
      document.dispatchEvent(locationSelectEvent);
    };
    selectButton.addEventListener('click', selectButtonClickCb);
  }
};

export const markers = {
  /**
   * Popups are initialized as custom JavaScript components
   * with full knockout.js functionality.
   *
   * @param {NrLocation} location
   * @return {leaflet.Marker}
   */
  createPopupMarker(location) {
    const marker = leaflet.marker(
      leaflet.latLng(location.latitude, location.longitude)
    );

    if (location.icon) {
      marker.setIcon(
        leaflet.icon({
          iconUrl: location.icon,
          iconAnchor: [23, 23],
        })
      );
    }

    marker.bindPopup(
      leaflet
        .popup({
          minWidth: 200,
        })
        .setContent(tmplRenderer.render({ location }, LocationPopup))
    );

    /**
     * This event is fired when a pickup location marker is opened inside map.
     * we are appending event listeners at that occasion.
     */
    marker.on('popupopen', (event) => {
      setEventListeners(event.popup, location);
    });

    return marker;
  },
};
