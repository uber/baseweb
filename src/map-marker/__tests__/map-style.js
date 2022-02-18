/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

type GeoJSONPointFeature = {
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [number, number],
  },
};

export function getMapStyle(
  locations: Array<[number, number]>,
  options: {showPointDebug: boolean},
) {
  return {
    version: 8,
    sources: {
      markerPoints: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locations.map<GeoJSONPointFeature>(coordinates => ({
            type: 'Feature',
            geometry: {type: 'Point', coordinates},
          })),
        },
      },
    },
    layers: [
      {
        id: 'markerPointsLayer',
        source: 'markerPoints',
        type: 'circle',
        paint: {
          'circle-radius': 12,
          'circle-color': 'red',
        },
        layout: {
          visibility: options.showPointDebug ? 'visible' : 'none',
        },
      },
    ],
  };
}
