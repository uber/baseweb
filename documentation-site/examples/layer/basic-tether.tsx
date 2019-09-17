import * as React from 'react';
import {
  Layer,
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
        top: `${offset.top}px` || 0,
        left: `${offset.left}px` || 0,
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
  offset1: {top: 0, left: 0},
  offset2: {top: 0, left: 0},
};

export default class BasicTether extends React.Component<
  {},
  typeof initialState
> {
  anchorRef1: any = React.createRef();
  popperRef1: any = React.createRef();
  anchorRef2: any = React.createRef();
  popperRef2: any = React.createRef();

  state = initialState;

  onPopperUpdate: any = (order: string, normalizedOffsets: any) => {
    this.setState({
      [`offset${order}`]: normalizedOffsets.popper,
    } as any);
  };

  render() {
    return (
      <React.Fragment>
        <Button
          ref={this.anchorRef1}
          onClick={() => this.setState({isFirstOpen: true})}
        >
          Render Blue Layer
        </Button>
        {this.state.isFirstOpen ? (
          <Layer
            onMount={() => this.setState({isFirstMounted: true})}
            onUnmount={() => this.setState({isFirstMounted: false})}
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
                color="rgba(0, 190, 255, 0.86)"
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
          Render Purple Layer
        </Button>
        {this.state.isSecondOpen ? (
          <Layer
            onMount={() => this.setState({isSecondMounted: true})}
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
                color="rgba(190, 190, 255, 0.86)"
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
      </React.Fragment>
    );
  }
}
