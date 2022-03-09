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
import ReactMapGL, {Marker} from 'react-map-gl';
import Upload from '../../icon/upload.js';
import Search from '../../icon/search.js';
import Show from '../../icon/show.js';
import {useStyletron} from '../../styles/index.js';
import {getMapStyle} from './map-style.js';

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

  const mapStyle = getMapStyle(
    locations.map((loc) => [loc.longitude, loc.latitude]),
    {showPointDebug: true},
  );

  return (
    <>
      <TileGrid cols={6} customizerOptions={[]}></TileGrid>
      <div
        className={css({backgroundColor: theme.colors.backgroundLightAccent})}
      >
        <ReactMapGL
          {...viewport}
          width="100%"
          height="760px"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
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
                    transform: `translate(-50%, ${
                      selectedLocationIndex === 0 ? '-100%' : '-50%'
                    })`,
                    cursor: 'pointer',
                  }),
                  props: {
                    onMouseEnter: () => setHoveredLocationIndex(0),
                    onMouseLeave: () => setHoveredLocationIndex(null),
                    onClick: () =>
                      setSelectedLocationIndex(
                        selectedLocationIndex === 0 ? null : 0,
                      ),
                  },
                },
                PinHead: {
                  style: {
                    backgroundColor:
                      hoveredLocationIndex === 0 || selectedLocationIndex === 0
                        ? theme.colors.backgroundInverseSecondary
                        : theme.colors.backgroundPrimary,
                  },
                },
                PinHeadContent: {
                  style: {
                    color:
                      hoveredLocationIndex === 0 || selectedLocationIndex === 0
                        ? theme.colors.primaryB
                        : theme.colors.primaryA,
                  },
                },
                BadgeEnhancer: {
                  style: () => ({
                    boxShadow: theme.lighting.shadow600,
                    color:
                      hoveredLocationIndex === 0 || selectedLocationIndex === 0
                        ? theme.colors.contentInversePrimary
                        : theme.colors.contentPositive,
                    backgroundColor:
                      hoveredLocationIndex === 0 || selectedLocationIndex === 0
                        ? theme.colors.backgroundPositive
                        : theme.colors.backgroundPrimary,
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
              badgeEnhancerContent={({size}) => <Search size={size} />}
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
                    transform: `translate(-50%, ${
                      selectedLocationIndex === 2 ? '-100%' : '-50%'
                    })`,
                    cursor: 'pointer',
                  }),
                  props: {
                    onMouseEnter: () => setHoveredLocationIndex(2),
                    onMouseLeave: () => setHoveredLocationIndex(null),
                    onClick: () =>
                      setSelectedLocationIndex(
                        selectedLocationIndex === 2 ? null : 2,
                      ),
                  },
                },
                PinHead: {
                  style: {
                    backgroundColor:
                      hoveredLocationIndex === 2 || selectedLocationIndex === 2
                        ? theme.colors.backgroundInverseSecondary
                        : theme.colors.backgroundPrimary,
                  },
                },
                PinHeadContent: {
                  style: {
                    color:
                      hoveredLocationIndex === 2 || selectedLocationIndex === 2
                        ? theme.colors.primaryB
                        : theme.colors.primaryA,
                  },
                },
                BadgeEnhancer: {
                  style: () => ({
                    boxShadow: theme.lighting.shadow600,
                    color:
                      hoveredLocationIndex === 2 || selectedLocationIndex === 2
                        ? theme.colors.contentInversePrimary
                        : theme.colors.contentPositive,
                    backgroundColor:
                      hoveredLocationIndex === 2 || selectedLocationIndex === 2
                        ? theme.colors.backgroundPositive
                        : theme.colors.backgroundPrimary,
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
              badgeEnhancerContent={() => 'New'}
            />
          </Marker>
        </ReactMapGL>
      </div>
    </>
  );
}
