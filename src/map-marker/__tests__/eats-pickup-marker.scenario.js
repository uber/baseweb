/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useState} from 'react';
import {
  FixedMarker,
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from '../index.js';
import TileGrid from './tile-grid.js';
import ReactMapGL, {Marker, Layer, Source} from 'react-map-gl';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import Show from '../../icon/show.js';

import {useStyletron} from '../../styles/index.js';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};

const locations = [
  uberHq,
  {latitude: uberHq.latitude, longitude: uberHq.longitude + 0.006},
  {latitude: uberHq.latitude + 0.006, longitude: uberHq.longitude},
];

export function Scenario() {
  const [viewport, setViewport] = useState({
    ...locations[0],
    zoom: 14,
  });

  const [hoveredLocationIndex, setHoveredLocationIndex] = useState(null);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(null);

  const [css, theme] = useStyletron();

  return (
    <>
      <TileGrid cols={6} customizerOptions={[]}></TileGrid>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="760px"
        onViewportChange={viewport => setViewport(viewport)}
        mapboxApiAccessToken="pk.eyJ1IjoiYmFiYnN1YmVyIiwiYSI6ImNrdThqeGkxZTVwb3kyd3BpZGRlc2NlOXUifQ.qh-EtXm2DJQZVprWUJ-GFQ"
      >
        <Marker
          latitude={locations[0].latitude}
          longitude={locations[0].longitude}
        >
          <FixedMarker
            size={PINHEAD_SIZES_SHAPES.medium}
            needle={
              selectedLocationIndex === 0
                ? NEEDLE_SIZES.short
                : NEEDLE_SIZES.none
            }
            startEnhancer={() => (
              <span className={css({fontSize: '12px'})}>3.9</span>
            )}
            overrides={{
              Root: {
                style: () => ({
                  transform: `translate(-50%, -100%)`,
                  cursor: 'pointer',
                }),
              },
              BadgeEnhancer: {
                style: () => ({
                  boxShadow: theme.lighting.shadow600,
                }),
              },
            }}
            labelEnhancerContent="Restaurant 1"
            labelEnhancerPosition={
              hoveredLocationIndex === 0 || selectedLocationIndex === 0
                ? LABEL_ENHANCER_POSITIONS.bottom
                : LABEL_ENHANCER_POSITIONS.none
            }
            badgeEnhancerSize={BADGE_ENHANCER_SIZES.mediumIcon}
            badgeEnhancerBackground={
              hoveredLocationIndex === 0 || selectedLocationIndex === 0
                ? theme.colors.backgroundPositive
                : theme.colors.backgroundPrimary
            }
            badgeEnhancerColor={
              hoveredLocationIndex === 0 || selectedLocationIndex === 0
                ? theme.colors.contentInversePrimary
                : theme.colors.contentPositive
            }
            badgeEnhancerContent={({size}) => <Search size={size} />}
            background={
              hoveredLocationIndex === 0 || selectedLocationIndex === 0
                ? theme.colors.backgroundInverseSecondary
                : theme.colors.backgroundPrimary
            }
            color={
              hoveredLocationIndex === 0 || selectedLocationIndex === 0
                ? theme.colors.primaryB
                : theme.colors.primaryA
            }
            onMouseEnter={() => setHoveredLocationIndex(0)}
            onMouseLeave={() => setHoveredLocationIndex(null)}
            onClick={() =>
              setSelectedLocationIndex(selectedLocationIndex === 0 ? null : 0)
            }
          />
        </Marker>

        <Marker
          latitude={locations[1].latitude}
          longitude={locations[1].longitude}
        >
          <FixedMarker
            size={PINHEAD_SIZES_SHAPES.medium}
            needle={NEEDLE_SIZES.short}
            labelEnhancerContent="My Location"
            startEnhancer={({size}) => <Upload size={size} />}
            overrides={{
              Root: {
                style: () => ({
                  transform: `translate(-50%, -100%)`,
                }),
              },
            }}
            onMouseEnter={() => setHoveredLocationIndex(1)}
            onMouseLeave={() => setHoveredLocationIndex(null)}
          />
        </Marker>

        <Marker
          latitude={locations[2].latitude}
          longitude={locations[2].longitude}
        >
          <FixedMarker
            size={PINHEAD_SIZES_SHAPES.medium}
            needle={
              selectedLocationIndex === 2
                ? NEEDLE_SIZES.short
                : NEEDLE_SIZES.none
            }
            startEnhancer={({size}) => <Show size={size} />}
            overrides={{
              Root: {
                style: () => ({
                  transform: `translate(-50%, -100%)`,
                  cursor: 'pointer',
                }),
              },
              BadgeEnhancer: {
                style: () => ({
                  boxShadow: theme.lighting.shadow600,
                }),
              },
            }}
            labelEnhancerContent="Restaurant 2"
            labelEnhancerPosition={
              hoveredLocationIndex === 2 || selectedLocationIndex === 2
                ? LABEL_ENHANCER_POSITIONS.bottom
                : LABEL_ENHANCER_POSITIONS.none
            }
            badgeEnhancerSize={BADGE_ENHANCER_SIZES.mediumText}
            badgeEnhancerBackground={
              hoveredLocationIndex === 2 || selectedLocationIndex === 2
                ? theme.colors.backgroundPositive
                : theme.colors.backgroundPrimary
            }
            badgeEnhancerColor={
              hoveredLocationIndex === 2 || selectedLocationIndex === 2
                ? theme.colors.contentInversePrimary
                : theme.colors.contentPositive
            }
            badgeEnhancerContent={() => 'New'}
            background={
              hoveredLocationIndex === 2 || selectedLocationIndex === 2
                ? theme.colors.backgroundInverseSecondary
                : theme.colors.backgroundPrimary
            }
            color={
              hoveredLocationIndex === 2 || selectedLocationIndex === 2
                ? theme.colors.primaryB
                : theme.colors.primaryA
            }
            onMouseEnter={() => setHoveredLocationIndex(2)}
            onMouseLeave={() => setHoveredLocationIndex(null)}
            onClick={() =>
              setSelectedLocationIndex(selectedLocationIndex === 2 ? null : 2)
            }
          />
        </Marker>

        <Source
          id="my-data"
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: locations.map(location => ({
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [location.longitude, location.latitude],
              },
            })),
          }}
        >
          <Layer
            {...{
              id: 'point',
              type: 'circle',
              paint: {
                'circle-radius': 12,
                'circle-color': 'red',
              },
            }}
          />
        </Source>
      </ReactMapGL>
    </>
  );
}
