/* global document */
import * as React from 'react';
import {
  Layer,
  LayersManager,
  TetherBehavior,
  TETHER_PLACEMENT,
} from 'baseui/layer';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';

function Wrapper(props: any) {
  const [css] = useStyletron();
  const {offset, color, children, forwardedRef} = props;
  return (
    <div
      className={css({
        position: 'absolute',
        top: offset || '50%',
        left: offset || '50%',
        width: '200px',
        paddingTop: '20px',
        paddingBottom: '20px',
        paddingLeft: '20px',
        paddingRight: '20px',
        backgroundColor: color,
        textAlign: 'center',
      })}
      ref={forwardedRef}
    >
      {children}
    </div>
  );
}

const initialState = {
  isFirstOpen: false,
  isSecondOpen: false,
  isFirstMounted: false,
  isSecondMounted: false,
  setIsFirstMounted: false,
  offset1: {top: 0, left: 0},
  offset2: {top: 0, left: 0},
};
export default class LayerWithZIndex extends React.Component<
  {},
  typeof initialState
> {
  anchorRef1: any = React.createRef();
  popperRef1: any = React.createRef();
  anchorRef2: any = React.createRef();
  popperRef2: any = React.createRef();

  state = initialState;

  onPopperUpdate: any = (order: any, normalizedOffsets: any) => {
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    } as any);
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
      <LayersManager zIndex={2}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <div>
            <Button
              ref={this.anchorRef1}
              onClick={() => this.setState({isFirstOpen: true})}
            >
              Render Yellow Layer
            </Button>
            {this.state.isFirstOpen ? (
              <Layer
                onMount={() =>
                  this.setState({setIsFirstMounted: true})
                }
                onUnmount={() =>
                  this.setState({setIsFirstMounted: false})
                }
              >
                <TetherBehavior
                  anchorRef={this.anchorRef1.current}
                  popperRef={this.popperRef1.current}
                  onPopperUpdate={(...args) =>
                    this.onPopperUpdate(1, ...args)
                  }
                  placement={TETHER_PLACEMENT.right}
                >
                  <Wrapper
                    forwardedRef={this.popperRef1}
                    offset={this.state.offset1}
                    color="rgba(255, 255, 190, 0.86)"
                  >
                    <Button
                      onClick={() =>
                        this.setState({isFirstOpen: false})
                      }
                    >
                      Close
                    </Button>
                  </Wrapper>
                </TetherBehavior>
              </Layer>
            ) : null}
            <br />
            <br />
            <Button
              ref={this.anchorRef2}
              onClick={() => this.setState({isSecondOpen: true})}
            >
              Render Green Layer
            </Button>
            {this.state.isSecondOpen ? (
              <Layer
                onMount={() =>
                  this.setState({isSecondMounted: true})
                }
                onUnmount={() =>
                  this.setState({isSecondMounted: false})
                }
              >
                <TetherBehavior
                  anchorRef={this.anchorRef2.current}
                  popperRef={this.popperRef2.current}
                  onPopperUpdate={(...args) =>
                    this.onPopperUpdate(2, ...args)
                  }
                  placement={TETHER_PLACEMENT.right}
                >
                  <Wrapper
                    forwardedRef={this.popperRef2}
                    offset={this.state.offset2}
                    color="rgba(190, 255, 190, 0.86)"
                  >
                    <Button
                      onClick={() =>
                        this.setState({isSecondOpen: false})
                      }
                    >
                      Close
                    </Button>
                  </Wrapper>
                </TetherBehavior>
              </Layer>
            ) : null}
          </div>
          <div
            style={{
              position: 'relative',
              boxSizing: 'border-box',
              width: '200px',
              marginLeft: '50px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '20px',
              paddingBottom: '20px',
              backgroundColor: '#000000',
              color: '#ffffff',
              zIndex: 1,
              textAlign: 'center',
            }}
          >
            Element with z-index set
          </div>
        </div>
      </LayersManager>
    );
  }
}
