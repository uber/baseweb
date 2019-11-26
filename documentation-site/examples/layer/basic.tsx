/* global document */
import * as React from 'react';
import {Layer} from 'baseui/layer';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';

function Wrapper(props: any) {
  const [css] = useStyletron();
  const {offset, color, children, forwardedRef} = props;
  return (
    <div
      className={css({
        position: 'fixed',
        top: offset || '46%',
        left: offset || '46%',
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
export default () => {
  const [isFirstOpen, setIsFirstOpen] = React.useState(false);
  const [isSecondOpen, setIsSecondOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button onClick={() => setIsFirstOpen(true)}>
        Render Red Layer
      </Button>
      {isFirstOpen ? (
        <Layer>
          <Wrapper color="rgba(255, 190, 190, 0.86)">
            <Button onClick={() => setIsFirstOpen(false)}>
              Close
            </Button>
          </Wrapper>
        </Layer>
      ) : null}
      <br />
      <br />
      <Button onClick={() => setIsSecondOpen(true)}>
        Render Orange Layer
      </Button>
      {isSecondOpen ? (
        <Layer>
          <Wrapper color="rgba(255, 212, 135, 0.86)" offset="48%">
            <Button onClick={() => setIsSecondOpen(false)}>
              Close
            </Button>
          </Wrapper>
        </Layer>
      ) : null}
    </React.Fragment>
  );
};
