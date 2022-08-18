import leaflet from 'leaflet';

import { tmplRenderer } from './templateRenderer';
import LocationFilter from '../../components/locationFinder/LocationFilter';

const handleControlClick = (element, group) => {
  if (element.checked) {
    group.markers.forEach((marker) => {
      group.layerGroup.addLayer(marker);
    });
  } else {
    group.layerGroup.clearLayers();
  }
};

export const controls = {
  /**
   * Add checkbox control for filtering markers to map.
   *
   * @param {MarkerGroup} group
   * @param {leaflet.Map} map
   */
  createGroupFilterControl(group, map) {
    leaflet.Control.TypeSelector = leaflet.Control.extend({
      onAdd() {
        const element = tmplRenderer.render(
          {
            iconSize: '40px',
            type: group.type,
            iconUrl: group.iconUrl,
          },
          LocationFilter
        );

        element.addEventListener('click', (event) => {
          handleControlClick(event.target, group);
        });

        return element;
      },
    });

    return new leaflet.Control.TypeSelector({ position: 'topright' }).addTo(
      map
    );
  },
};
