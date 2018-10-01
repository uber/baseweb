// @flow
import React from 'react';
import {styled} from 'baseui';

import {Button, KIND} from 'baseui/button';
import {Card} from 'baseui/card';

const Center = styled('div', {
  fontFamily: 'HelveticaNeue-Light, Arial',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

const FullHeightDiv = styled('div', {
  height: '100%',
  backgroundColor: '#FFFFFF',
});

const Home = () => {
  return (
    <FullHeightDiv>
      <Center>
        <Card
          action={
            // eslint-disable-next-line no-console
            <Button onClick={() => console.log('hey!')} kind={KIND.primary}>
              Put something on my console!
            </Button>
          }
          title="Hello from Base UI 👋"
        >
          We glad you are here!
        </Card>
      </Center>
    </FullHeightDiv>
  );
};

export default Home;
