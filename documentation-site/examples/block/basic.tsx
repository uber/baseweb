import React from 'react';
import {Block} from 'baseui/block';

export default function Example() {
  return (
    <React.Fragment>
      <Block>first element</Block>
      <Block paddingTop="100px">
        padding top applied to this element
      </Block>
    </React.Fragment>
  );
}
