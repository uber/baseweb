/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { FixedMarker } from '..';
import { Checkbox, LABEL_PLACEMENT } from '../../checkbox';
import {
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from '../constants';
import TileGrid from './tile-grid';
import { Input } from '../../input';
import Upload from '../../icon/upload';
import Search from '../../icon/search';
import { Select } from '../../select';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Button } from '../../button';
import { useStyletron } from '../../styles';
import { getMapStyle } from './map-style';

const uberHq = {
  latitude: 37.768495131168336,
  longitude: -122.38856031220648,
};
const labelEnhancerPositions = Object.keys(LABEL_ENHANCER_POSITIONS)
  .map((key) => LABEL_ENHANCER_POSITIONS[key])
  .map((x) => ({
    id: x,
    label: x,
  }));
const pinheadSizes = Object.keys(PINHEAD_SIZES_SHAPES)
  .map((key) => PINHEAD_SIZES_SHAPES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

const needleSizes = Object.keys(NEEDLE_SIZES)
  .map((key) => NEEDLE_SIZES[key])
  .map((x) => ({
    label: x,
    id: x,
  }));

export function Scenario() {
  const [label, setLabel] = React.useState('Uber HQ');
  const [startEnhancer, setStartEnhancer] = React.useState(true);
  const [endEnhancer, setEndEnhancer] = React.useState(false);

  const [locations, setLocations] = React.useState([
    { position: [uberHq.longitude, uberHq.latitude] as [number, number], dragging: false },
  ]);

  const [showPointDebug, setShowPointDebug] = React.useState(true);

  const [labelEnhancerText, setLabelEnhancerText] = React.useState('Uber Eats');

  const [labelEnhancerPosition, setLabelEnhancerPosition] = React.useState([
    labelEnhancerPositions[0],
  ]);

  const [viewport, setViewport] = React.useState({
    ...uberHq,
    zoom: 14,
  });

  const [pinheadSize, setPinheadSize] = React.useState([pinheadSizes[6]]);
  const [needleSize, setNeedleSize] = React.useState([needleSizes[3]]);
  const onMarkerDragStart = React.useCallback((index) => {
    setLocations((l) => {
      const copy = JSON.parse(JSON.stringify(l));
      copy[index].dragging = true;
      return copy;
    });
  }, []);

  const onMarkerDragEnd = React.useCallback((event, index) => {
    setLocations((l) => {
      const copy = JSON.parse(JSON.stringify(l));
      copy[index].position = [event.lngLat[0], event.lngLat[1]];
      copy[index].dragging = false;
      return copy;
    });
  }, []);

  const isMarkerCentered = [
    PINHEAD_SIZES_SHAPES.xxSmallCircle,
    PINHEAD_SIZES_SHAPES.xxSmallSquare,
  ].includes(pinheadSize[0].id);

  const [css, theme] = useStyletron();

  const mapStyle = getMapStyle(
    locations.map((loc) => loc.position),
    {
      showPointDebug,
    }
  );

  return (
    <>
      <TileGrid
        cols={6}
        customizerOptions={[
          <Input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label"
            clearOnEscape
            key="label"
          />,
          <Input
            value={labelEnhancerText}
            onChange={(e) => setLabelEnhancerText(e.target.value)}
            placeholder="Label enhancer"
            clearOnEscape
            key="label-enhancer-text"
          />,
          <Select
            options={labelEnhancerPositions}
            value={labelEnhancerPosition}
            placeholder="Select an anchor position"
            onChange={(params) => setLabelEnhancerPosition(params.value)}
            key="anchor-position"
          />,

          <Checkbox
            checked={startEnhancer}
            onChange={(e) => setStartEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="start-endhancer"
          >
            Start enhancer
          </Checkbox>,
          <Checkbox
            checked={endEnhancer}
            onChange={(e) => setEndEnhancer(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="end-enhancer"
          >
            End enhancer
          </Checkbox>,
          <Select
            options={pinheadSizes}
            value={pinheadSize}
            placeholder="Select a pinhead size"
            onChange={(params) => setPinheadSize(params.value)}
            key="pinhead-size"
          />,
          <Select
            options={needleSizes}
            value={needleSize}
            placeholder="Select a needle size"
            onChange={(params) => setNeedleSize(params.value)}
            key="needle-size"
          />,

          <Button onClick={() => setLocations([])} key="clear-markers">
            Clear markers
          </Button>,
          <Checkbox
            checked={showPointDebug}
            onChange={(e) => setShowPointDebug(e.target.checked)}
            labelPlacement={LABEL_PLACEMENT.right}
            key="point-debug"
          >
            Show point debug
          </Checkbox>,
        ]}
      ></TileGrid>
      <div className={css({ backgroundColor: theme.colors.backgroundLightAccent })}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="760px"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapStyle={mapStyle}
          onClick={({ lngLat }) =>
            setLocations((existing) => [...existing, { position: lngLat, dragging: false }])
          }
        >
          {locations.map((x, i) => (
            <Marker
              latitude={x.position[1]}
              longitude={x.position[0]}
              draggable
              onDragStart={() => onMarkerDragStart(i)}
              onDragEnd={(evt) => onMarkerDragEnd(evt, i)}
              key={i}
            >
              <FixedMarker
                // $FlowFixMe Mismatch between general type and enum
                size={pinheadSize[0].id}
                // $FlowFixMe Mismatch between general type and enum
                needle={needleSize[0].id}
                key={i}
                label={label}
                dragging={x.dragging}
                startEnhancer={
                  startEnhancer
                    ? function renderEnhancer({ size }) {
                        return <Upload size={size} />;
                      }
                    : undefined
                }
                endEnhancer={
                  endEnhancer
                    ? function renderEnhancer({ size }) {
                        return <Search size={size} />;
                      }
                    : undefined
                }
                overrides={{
                  Root: {
                    style: () => ({
                      transform: `translate(-50%, ${isMarkerCentered ? '-50%' : '-100%'})`,
                    }),
                  },
                  BadgeEnhancer: {
                    style: {
                      color: 'white',
                      backgroundColor: 'green',
                    },
                  },
                }}
                badgeEnhancerSize={BADGE_ENHANCER_SIZES.mediumText}
                badgeEnhancerContent={() => 'hello'}
                labelEnhancerContent={labelEnhancerText}
                // $FlowFixMe Mismatch between general type and enum
                labelEnhancerPosition={labelEnhancerPosition[0].id}
              />
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </>
  );
}
