/* global document */
// @flow
import * as React from 'react';
import {Layer} from 'baseui/layer';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

const layerRef = React.createRef();

function BlockComponent(props) {
  return (
    <Block
      position="fixed"
      top={props.offset || '46%'}
      left={props.offset || '46%'}
      width="200px"
      paddingTop="20px"
      paddingBottom="20px"
      paddingLeft="20px"
      paddingRight="20px"
      backgroundColor={props.color}
      overrides={{
        Block: {
          style: {
            textAlign: 'center',
          },
        },
      }}
    >
      {props.children}
    </Block>
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
          <BlockComponent color="rgba(255, 190, 190, 0.86)">
            <Button onClick={() => setIsFirstOpen(false)}>
              Close
            </Button>
          </BlockComponent>
        </Layer>
      ) : null}
      <Block padding="5px" />
      <Button onClick={() => setIsSecondOpen(true)}>
        Render Orange Layer
      </Button>
      {isSecondOpen ? (
        <Layer>
          <BlockComponent
            color="rgba(255, 212, 135, 0.86)"
            offset="48%"
          >
            <Button onClick={() => setIsSecondOpen(false)}>
              Close
            </Button>
          </BlockComponent>
        </Layer>
      ) : null}
    </React.Fragment>
  );
};
