import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, Polyline, Marker, CircleMarker, ZoomControl } from 'react-leaflet';

import LocationIcon from '@public/static/img/location.png';
import { getPositions, colorDict, generateMarkers } from '../utils/map_utils';

require('@public/static/js/leaflet.awesome-markers.js');
require('@styles/vendor/font-awesome/css/font-awesome.css');
require('../styles/leaflet.css');

const markerIcon = L.icon({
  iconUrl: LocationIcon,
  iconSize: [24, 34],
  iconAnchor: [12, 32],
});

const pointOptions = {
  color: '#990000',
  weight: 0,
  fillOpacity: 1,
  opacity: 1,
  radius: 5,
};

const pathOptions = {
  color: '#990000',
  weight: 2,
  dashArray: [4, 5],
  smoothFactor: 0,
};

export default class TripMap extends Component {
  render() {
    const { index, current, trip } = this.props;

    current.index = index;
    const center = [Number(current.lat), Number(current.lon)];
    const positions = getPositions(trip, current);
    const transportMarkers = generateMarkers(positions, current);
    const colorMap = colorDict(trip);

    return (
      <div className="map-panel">
        <Map center={center} zoom={Number(current.zoom)} zoomControl={false} dragging scroolWheelZoom animate>
          <TileLayer
            url="http://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
          />
          { !current.summary && <Marker position={center} icon={markerIcon} /> }
          <Polyline positions={positions} {...pathOptions} />
          { trip
            .map((p, i) =>
              !p.summary && p.country &&
              p.lat && p.lon &&
              <CircleMarker
                key={`circle-marker-${i}`}
                {...pointOptions}
                center={new L.LatLng(p.lat, p.lon)}
                color={colorMap[p.country].color}
                radius={current.summary ? 3 : 4}
              />
            )
          }
          {
            !current.summary &&
            transportMarkers.map((m, i) => {
              const transportMarker = L.AwesomeMarkers.icon({
                icon: m.icon,
                prefix: 'fa',
                iconColor: '#990000',
                iconSize: [24, 34],
                iconAnchor: [12, 19],
              });
              return <Marker key={`transport-icon-${i}`} position={m.loc} icon={transportMarker} />;
            })
          }
          <ZoomControl position="bottomright" />
        </Map>
        <div className="cover" />
      </div>
    );
  }
}

