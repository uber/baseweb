/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Layer, LayersManager} from '../index.js';
import {Block} from '../../block/index.js';
import {Button} from '../../button/index.js';

// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';

export const name = 'layer-with-z-index';

function BlockComponent(props) {
  // $FlowFixMe
  const {children, offsetTop, color, ...restProps} = props;
  return (
    <Block
      position="fixed"
      top={offsetTop || '10px'}
      left={'50%'}
      width="200px"
      paddingTop="20px"
      paddingBottom="20px"
      paddingLeft="20px"
      paddingRight="20px"
      backgroundColor={color}
      overrides={{
        Block: {
          style: {
            textAlign: 'center',
          },
        },
      }}
      {...restProps}
    >
      {children}
    </Block>
  );
}
const Example = () => {
  const [isFirstOpen, setIsFirstOpen] = React.useState(false);
  const [isSecondOpen, setIsSecondOpen] = React.useState(false);
  return (
    // WARNING: DO NOT COPY THIS EXAMPLE AS IS. THIS EXAMPLE HAS LOCAL LayersManager
    // JUST FOR DOCUMENTATION EXAMPLE PRESENTATIONAL PURPOSE.
    // Do not wrap a single component or a part of an application with
    // LayersManager that has zIndex set to a value other than 'auto' since it
    // will make all the Layers within its context be on top of other Layers
    // outside of the local LayersManager (therefore layers provider) added later.
    // Pass the `zIndex` value to the LayersManager added at the root of your application.
    <>
      <Block position="relative">
        <Block
          position="absolute"
          top={'30px'}
          left={'calc(50% - 50px)'}
          height="60px"
          display="flex"
          alignItems="center"
          paddingLeft="20px"
          paddingRight="20px"
          backgroundColor="#000000"
          color="#ffffff"
          overrides={{
            Block: {
              style: {
                boxSizing: 'border-box',
                zIndex: 1,
                textAlign: 'center',
              },
            },
          }}
        >
          Element with z-index
        </Block>
        <Button
          data-test="no-zindex-layer"
          onClick={() => setIsFirstOpen(true)}
        >
          Render Yellow Layer
        </Button>
        {isFirstOpen ? (
          <Layer>
            <BlockComponent
              data-test="no-zindex-layer"
              color="rgba(255, 255, 190, 0.86)"
            >
              <Button onClick={() => setIsFirstOpen(false)}>Close</Button>
            </BlockComponent>
          </Layer>
        ) : null}
        <Block padding="5px" />
        <LayersManager zIndex={2}>
          <Button
            data-test="zindex-layer"
            onClick={() => setIsSecondOpen(true)}
          >
            Render Green Layer
          </Button>
          {isSecondOpen ? (
            <Layer>
              <BlockComponent
                data-test="zindex-layer"
                color="rgba(190, 255, 190, 0.86)"
                offsetTop="60px"
              >
                <Button onClick={() => setIsSecondOpen(false)}>Close</Button>
              </BlockComponent>
            </Layer>
          ) : null}
        </LayersManager>
      </Block>
    </>
  );
};

export const component = () => {
  const btnZIndex = '[data-test="zindex-btn"]';
  const btnNoZIndex = '[data-test="no-zindex-btn"]';
  const layerZIndex = '[data-test="zindex-layer"]';
  const layerNoZIndex = '[data-test="no-zindex-layer"]';
  return (
    <Screener
      steps={new Steps()
        .wait(btnZIndex)
        .click(btnZIndex)
        .wait(layerZIndex)
        .click(btnNoZIndex)
        .wait(layerNoZIndex)
        .snapshot('Layers with and no z-index')
        .end()}
    >
      <Example />
    </Screener>
  );
};
