import leaflet from 'leaflet';

import { markers } from './markers';
import { mapConfig } from './config';
import { controls } from './controls';
import { __ } from '../../../../../../i18n';
import { _keys, _values } from '../../../../../../utils';

let leafletMap = null;
let markerGroups = {};
const accessToken = mapConfig.getToken();
const attribution = `${__('Map data')} &copy; ${mapConfig.getAttribution()}`;

export const map = {
  /**
   * Initialize map at the given element with given coordinates and zoom.
   *
   */
  init(elementId, lat, lng, zoom, errorHandler) {
    if (leafletMap) {
      leafletMap.remove();
    }

    leafletMap = leaflet
      .map(elementId)
      .setView(leaflet.latLng([lat, lng]), zoom);

    const tile = leaflet.tileLayer(mapConfig.getUrl(), {
      attribution,
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: 'mapbox/streets-v11',
      accessToken,
    });
    tile.on('tileerror', () => {
      const message = __(
        'An error occurred while loading map. Please try again later.'
      );

      errorHandler(message);
    });
    tile.addTo(leafletMap);
  },

  /**
   * Create a Marker for each location, add it to the map and add a popup for each location.
   * The map is centered on the added locations.
   *
   * @public
   * @param {NrShippingLocation[]} locations - new locations fetched from web service.
   */
  setLocations(locations, actions) {
    // center map on first location
    if (locations[0]) {
      leafletMap.setView([locations[0].latitude, locations[0].longitude], 15);
    }

    markerGroups = map.regenerateMarkerGroups(markerGroups, locations);

    // add new locations to map
    locations.forEach((location) => {
      const marker = markers.createPopupMarker(location, actions);

      markerGroups[location.shop_type].layerGroup.addLayer(marker);
      markerGroups[location.shop_type].markers.push(marker);
    });

    // add marker filter controls
    _values(markerGroups).forEach((group) => {
      // eslint-disable-next-line no-param-reassign
      group.control = controls.createGroupFilterControl(group, leafletMap);
    });
  },

  /**
   * Remove all controls and markers,
   * regenerate marker groups from locations
   *
   * @private
   * @param {Object.<string, MarkerGroup>} oldMarkerGroups
   * @param {NrShippingLocation[]} locations
   * @return {Object.<string, MarkerGroup>}
   */
  regenerateMarkerGroups(oldMarkerGroups, locations) {
    const groups = {};

    // remove old markers and controls from map
    _values(oldMarkerGroups).forEach((group) => {
      leafletMap.removeControl(group.control);
      leafletMap.removeLayer(group.layerGroup);
    });

    // create new marker groups
    locations.forEach((location) => {
      if (location.icon && _keys(groups).indexOf(location.shop_type) === -1) {
        groups[location.shop_type] = {
          type: location.shop_type,
          iconUrl: location.icon,
          control: null,
          layerGroup: leaflet.layerGroup(),
          markers: [],
        };
        leafletMap.addLayer(groups[location.shop_type].layerGroup);
      }
    });

    return groups;
  },

  clear() {
    leafletMap = null;
  },
};
