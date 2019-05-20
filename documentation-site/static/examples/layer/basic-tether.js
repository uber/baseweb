/* global document */
import * as React from 'react';
import {Layer, TetherBehavior, TETHER_PLACEMENT} from 'baseui/layer';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

const layerRef = React.createRef();

function BlockComponent(props) {
  const {offset, color, children, ...restProps} = props;
  return (
    <Block
      position="absolute"
      top={`${offset.top}px` || 0}
      left={`${offset.left}px` || 0}
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
export default class BasicTether extends React.Component {
  anchorRef1 = React.createRef();
  popperRef1 = React.createRef();
  anchorRef2 = React.createRef();
  popperRef2 = React.createRef();

  state = {
    isBlueOpen: false,
    isPinkOpen: false,
    isBlueMounted: false,
    isPinkMounted: false,
    offset1: {top: 0, left: 0},
    offset2: {top: 0, left: 0},
  };

  onPopperUpdate = (order, normalizedOffsets) => {
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    });
  };

  render() {
    return (
      <>
        <Button
          $ref={this.anchorRef1}
          onClick={() => this.setState({isBlueOpen: true})}
        >
          Render Blue Layer
        </Button>
        {this.state.isBlueOpen ? (
          <Layer
            onMount={() => this.setState({isBlueMounted: true})}
            onUnmount={() => this.setState({isBlueMounted: false})}
          >
            <TetherBehavior
              anchorRef={this.anchorRef1.current}
              popperRef={this.popperRef1.current}
              onPopperUpdate={(...args) => this.onPopperUpdate(1, ...args)}
              placement={TETHER_PLACEMENT.right}
            >
              <BlockComponent
                $ref={this.popperRef1}
                offset={this.state.offset1}
                color="rgba(0, 190, 255, 0.86)"
              >
                <Button onClick={() => this.setState({isBlueOpen: false})}>
                  Close
                </Button>
              </BlockComponent>
            </TetherBehavior>
          </Layer>
        ) : null}
        <Block padding="5px" />
        <Button
          $ref={this.anchorRef2}
          onClick={() => this.setState({isPinkOpen: true})}
        >
          Render Pink Layer
        </Button>
        {this.state.isPinkOpen ? (
          <Layer
            onMount={() => this.setState({isPinkMounted: true})}
            onUnmount={() => this.setState({isPinkMounted: false})}
          >
            <TetherBehavior
              anchorRef={this.anchorRef2.current}
              popperRef={this.popperRef2.current}
              onPopperUpdate={(...args) => this.onPopperUpdate(2, ...args)}
              placement={TETHER_PLACEMENT.right}
            >
              <BlockComponent
                $ref={this.popperRef2}
                offset={this.state.offset2}
                color="rgba(255, 180, 200, 0.86)"
              >
                <Button onClick={() => this.setState({isPinkOpen: false})}>
                  Close
                </Button>
              </BlockComponent>
            </TetherBehavior>
          </Layer>
        ) : null}
      </>
    );
  }
}
