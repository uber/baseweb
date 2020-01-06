/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  Layer,
  LayersManager,
  TetherBehavior,
  TETHER_PLACEMENT,
} from '../index.js';
import {Block} from '../../block/index.js';
import {Button} from '../../button/index.js';
import type {NormalizedOffsetsT} from '../../layer/types.js';

export const name = 'layer-z-index';

function BlockComponent(props) {
  const {children, forwardedRef, offset, color, ...restProps} = props;
  return (
    <Block
      ref={forwardedRef}
      position="absolute"
      top={`${offset.top}px` || '50%'}
      left={`${offset.left}px` || '50%'}
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
class Example extends React.Component<
  {},
  {
    isFirstOpen: boolean,
    isSecondOpen: boolean,
    isFirstMounted: boolean,
    isSecondMounted: boolean,
    offset1: {top: number, left: number},
    offset2: {top: number, left: number},
  },
> {
  anchorRef1 = React.createRef<HTMLElement>();
  popperRef1 = React.createRef<HTMLElement>();
  anchorRef2 = React.createRef<HTMLElement>();
  popperRef2 = React.createRef<HTMLElement>();

  state = {
    isFirstOpen: false,
    isSecondOpen: false,
    isFirstMounted: false,
    isSecondMounted: false,
    offset1: {top: 0, left: 0},
    offset2: {top: 0, left: 0},
  };

  onPopperUpdate = (order: number, normalizedOffsets: NormalizedOffsetsT) => {
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    });
  };

  render() {
    return (
      // WARNING: DO NOT COPY THIS EXAMPLE AS IS. THIS EXAMPLE HAS LOCAL LayersManager
      // JUST FOR DOCUMENTATION EXAMPLE PRESENTATIONAL PURPOSE.
      // Do not wrap a single component or a part of an application with
      // LayersManager that has zIndex set to a value other than 'auto' since it
      // will make all the Layers within its context be on top of other Layers
      // outside of the local LayersManager (therefore layers provider) added later.
      // Pass the `zIndex` value to the LayersManager added at the root of your application.
      <Block display="flex" justifyContent="flex-start" alignItems="center">
        <Block>
          <Button
            data-test="no-zindex-btn"
            ref={this.anchorRef1}
            onClick={() => this.setState({isFirstOpen: true})}
          >
            Render Yellow Layer
          </Button>
          {this.state.isFirstOpen ? (
            <Layer
              onMount={() => this.setState({isFirstMounted: true})}
              onUnmount={() => this.setState({isFirstMounted: false})}
            >
              <TetherBehavior
                anchorRef={this.anchorRef1.current}
                popperRef={this.popperRef1.current}
                // $FlowFixMe
                onPopperUpdate={(...args) => this.onPopperUpdate(1, ...args)}
                placement={TETHER_PLACEMENT.right}
              >
                <BlockComponent
                  data-test="no-zindex-layer"
                  forwardedRef={this.popperRef1}
                  offset={this.state.offset1}
                  color="rgba(255, 255, 190, 0.86)"
                >
                  <Button onClick={() => this.setState({isFirstOpen: false})}>
                    Close
                  </Button>
                </BlockComponent>
              </TetherBehavior>
            </Layer>
          ) : null}
          <Block padding="5px" />
          <LayersManager zIndex={2}>
            <Button
              data-test="zindex-btn"
              ref={this.anchorRef2}
              onClick={() => this.setState({isSecondOpen: true})}
            >
              Render Green Layer
            </Button>
            {this.state.isSecondOpen ? (
              <Layer
                onMount={() => this.setState({isSecondMounted: true})}
                onUnmount={() => this.setState({isSecondMounted: false})}
              >
                <TetherBehavior
                  anchorRef={this.anchorRef2.current}
                  popperRef={this.popperRef2.current}
                  // $FlowFixMe
                  onPopperUpdate={(...args) => this.onPopperUpdate(2, ...args)}
                  placement={TETHER_PLACEMENT.right}
                >
                  <BlockComponent
                    data-test="zindex-layer"
                    forwardedRef={this.popperRef2}
                    offset={this.state.offset2}
                    color="rgba(190, 255, 190, 0.86)"
                  >
                    <Button
                      onClick={() => this.setState({isSecondOpen: false})}
                    >
                      Close
                    </Button>
                  </BlockComponent>
                </TetherBehavior>
              </Layer>
            ) : null}
          </LayersManager>
        </Block>
        <Block
          position="relative"
          width="200px"
          marginLeft="50px"
          display="flex"
          alignItems="center"
          paddingLeft="20px"
          paddingRight="20px"
          paddingTop="20px"
          paddingBottom="20px"
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
      </Block>
    );
  }
}

export const component = () => <Example />;
