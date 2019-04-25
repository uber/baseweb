/* global document */
import React from 'react';
import {Layer} from 'baseui/layer';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

const layerRef = React.createRef();

function BlockComponent(props) {
  return (
    <Block
      position="fixed"
      top={props.offset || '48%'}
      left={props.offset || '48%'}
      width="200px"
      paddingTop="20px"
      paddingBottom="20px"
      paddingLeft="20px"
      paddingRight="20px"
      overrides={{
        Block: {
          style: {
            textAlign: 'center',
            backgroundColor: props.color,
          },
        },
      }}
    >
      {props.children}
    </Block>
  );
}
export default () => {
  const [isBlueOpen, setIsBlueOpen] = React.useState(false);
  const [isPinkOpen, setIsPinkOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setIsBlueOpen(true)}>Render Blue Layer</Button>
      {isBlueOpen ? (
        <Layer>
          <BlockComponent color="rgba(0, 190, 255, 0.86)">
            <Button onClick={() => setIsBlueOpen(false)}>Close</Button>
          </BlockComponent>
        </Layer>
      ) : null}
      <Block padding="5px" />
      <Button onClick={() => setIsPinkOpen(true)}>Render Pink Layer</Button>
      {isPinkOpen ? (
        <Layer>
          <BlockComponent color="rgba(255, 180, 200, 0.86)" offset="46%">
            <Button onClick={() => setIsPinkOpen(false)}>Close</Button>
          </BlockComponent>
        </Layer>
      ) : null}
    </>
  );
};
