import L from 'leaflet';
import { size } from 'lodash';

const dateLineIndex = 85;

const colors = [
  'rgb(76,132,191)',
  'rgb(76,167,86)',
  'rgb(233,93,12)',
  'rgb(113,35,111)',
  'rgb(249,185,5)',
  'rgb(213,65,36)',
  'rgb(207,178,226)',
  'rgb(236,134,19)',
  'rgb(189,189,189)',
  'rgb(166,206,227)',
  'rgb(31,120,180)',
  'rgb(178,223,138)',
  'rgb(51,160,44)',
  'rgb(251,154,153)',
  'rgb(227,26,28)',
  'rgb(253,191,111)',
  'rgb(255,127,0)',
  'rgb(202,178,214)',
  'rgb(106,61,154)',
  'rgb(255,255,153)',
  'rgb(177,89,40)',
];

export const getPositions = (trip, current) => {
  let positions;

  if (!current.summary) {
    const index = current.index;
    positions = [
      trip.slice(
        Math.max(index - 1, 1),
        Math.min(index + 2, trip.length),
      )
      .map(p => new L.LatLng(p.lat, p.lon, 0, true)),
    ];

    if (index === dateLineIndex + 1) {
      positions[0][2].lng = Number(positions[0][2].lng) + 360;
      positions.push(positions[0]);
      positions[1][2].lng = Number(positions[0][2].lng) + 360;
    } else if (index === dateLineIndex + 2) {
      positions[0][0].lng = Number(positions[0][0].lng) - 360;
      positions.push(positions[0]);
      positions[1][0].lng = Number(positions[0][0].lng) - 360;
    }
  } else {
    positions = [
      trip
      .filter(p => !p.summary)
      .map(p => new L.LatLng(p.lat, p.lon, 0, true)),
    ];

    const p1 = positions[0].slice(0, dateLineIndex + 1);
    p1.push(new L.LatLng(p1[dateLineIndex].lat, p1[dateLineIndex].lng + 360, true));
    const p2 = positions[0].slice(dateLineIndex + 1);
    p2.unshift(new L.LatLng(p2[0].lat, p2[0].lng - 360, true));
    positions = [p1, p2];
  }
  return positions;
};

export const colorDict = (trip) => {
  const colorMap = {
    'Altug Firarda': {
      color: 'rgba(0,0,0,.2)',
      min: 0,
      country: 'Altug Firarda',
      country_tr: 'Altuğ Firarda'
    }
  };
  trip.forEach((p, i) => {
    if (!p.summary && !colorMap[p.country]) {
      colorMap[p.country] = {
        ...p,
        min: i,
        color: colors[size(colorMap)-1],
      };
    }
  });
  return colorMap;
};

export const generateMarkers = (positions, obj) => {
  const transportMarkers = [];
  positions.forEach((s) => {
    s.forEach((current, j) => {
      if (j) {
        const prev = s[j - 1];
        transportMarkers.push({ loc: [(current.lat + prev.lat) / 2, (current.lng + prev.lng) / 2], icon: j > 1 ? obj.departed_by : obj.arrived_by });
      }
    });
  });
  return transportMarkers;
};
