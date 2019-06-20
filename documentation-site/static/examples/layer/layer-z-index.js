/* global document */
import * as React from 'react';
import {Layer, LayersManager} from 'baseui/layer';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';

function BlockComponent(props) {
  return (
    <Block
      position="fixed"
      top={props.offset || '50%'}
      left={props.offset || '50%'}
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
    // WARNING: DO NOT COPY THIS EXAMPLE AS IS. THIS EXAMPLE HAS LOCAL LayersManager
    // JUST FOR DOCUMENTATION EXAMPLE PRESENTATIONAL PURPOSE.
    // Do not wrap a single component or a part of an application with
    // LayersManager that has zIndex set to a value other than 'auto' since it
    // will make all the Layers within its context be on top of other Layers
    // outside of the local LayersManager (therefore layers provider) added later.
    // Pass the `zIndex` value to the LayersManager added at the root of your application.
    <LayersManager zIndex={2}>
      <Block data-test="test" position="relative">
        <Block
          position="absolute"
          top={'50%'}
          left={'50%'}
          height="60px"
          marginTop="-30px"
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
          Element with z-index set
        </Block>
        <Button onClick={() => setIsFirstOpen(true)}>
          Render Yellow Layer
        </Button>
        {isFirstOpen ? (
          <Layer>
            <BlockComponent color="rgba(255, 255, 190, 0.86)">
              <Button onClick={() => setIsFirstOpen(false)}>Close</Button>
            </BlockComponent>
          </Layer>
        ) : null}
        <Block padding="5px" />
        <Button onClick={() => setIsSecondOpen(true)}>
          Render Green Layer
        </Button>
        {isSecondOpen ? (
          <Layer>
            <BlockComponent color="rgba(190, 255, 190, 0.86)" offset="52%">
              <Button onClick={() => setIsSecondOpen(false)}>Close</Button>
            </BlockComponent>
          </Layer>
        ) : null}
      </Block>
    </LayersManager>
  );
};
