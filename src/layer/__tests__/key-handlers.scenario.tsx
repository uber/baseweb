/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Layer, TetherBehavior, TETHER_PLACEMENT } from '..';
import { Block } from '../../block';
import { Button } from '../../button';
import type { NormalizedOffsets } from '../types';

function BlockComponent(props) {
  const { children, forwardedRef, offset, color, ...restProps } = props;
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

export class Scenario extends React.Component<
  {},
  {
    isFirstOpen: boolean;
    isSecondOpen: boolean;
    isFirstMounted: boolean;
    isSecondMounted: boolean;
    offset1: {
      top: number;
      left: number;
    };
    offset2: {
      top: number;
      left: number;
    };
  }
> {
  anchorRef1 = React.createRef<HTMLButtonElement>();
  popperRef1 = React.createRef<HTMLElement>();
  anchorRef2 = React.createRef<HTMLButtonElement>();
  popperRef2 = React.createRef<HTMLElement>();

  state = {
    isFirstOpen: false,
    isSecondOpen: false,
    isFirstMounted: false,
    isSecondMounted: false,
    offset1: { top: 0, left: 0 },
    offset2: { top: 0, left: 0 },
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onPopperUpdate = (order: 1 | 2, normalizedOffsets: NormalizedOffsets, _) => {
    // @ts-expect-error partial state update
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    });
  };

  render() {
    return (
      <Block display="flex" justifyContent="flex-start" alignItems="center">
        <Block>
          <Button ref={this.anchorRef1} onClick={() => this.setState({ isFirstOpen: true })}>
            Render Yellow Layer
          </Button>
          {this.state.isFirstOpen ? (
            <Layer
              onMount={() => this.setState({ isFirstMounted: true })}
              onUnmount={() => this.setState({ isFirstMounted: false })}
              onKeyPress={(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.setState({ isFirstOpen: false });
                }
              }}
            >
              <TetherBehavior
                anchorRef={this.anchorRef1.current}
                popperRef={this.popperRef1.current}
                onPopperUpdate={(...args) => this.onPopperUpdate(1, ...args)}
                placement={TETHER_PLACEMENT.right}
              >
                <BlockComponent
                  forwardedRef={this.popperRef1}
                  offset={this.state.offset1}
                  color="rgba(255, 255, 190, 0.86)"
                >
                  Press &quot;Enter&quot; to Close
                </BlockComponent>
              </TetherBehavior>
            </Layer>
          ) : null}
          <Block padding="5px" />
          <Button ref={this.anchorRef2} onClick={() => this.setState({ isSecondOpen: true })}>
            Render Green Layer
          </Button>
          {this.state.isSecondOpen ? (
            <Layer
              onMount={() => this.setState({ isSecondMounted: true })}
              onUnmount={() => this.setState({ isSecondMounted: false })}
              onKeyPress={(e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.setState({ isSecondOpen: false });
                }
              }}
            >
              <TetherBehavior
                anchorRef={this.anchorRef2.current}
                popperRef={this.popperRef2.current}
                onPopperUpdate={(...args) => this.onPopperUpdate(2, ...args)}
                placement={TETHER_PLACEMENT.right}
              >
                <BlockComponent
                  forwardedRef={this.popperRef2}
                  offset={this.state.offset2}
                  color="rgba(190, 255, 190, 0.86)"
                >
                  Press &quot;Enter&quot; to Close
                </BlockComponent>
              </TetherBehavior>
            </Layer>
          ) : null}
        </Block>
      </Block>
    );
  }
}
