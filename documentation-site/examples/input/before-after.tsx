import * as React from 'react';
import {Block} from 'baseui/block';
import Alert from 'baseui/icon/alert';
import Check from 'baseui/icon/check';
import Search from 'baseui/icon/search';
import {Input} from 'baseui/input';

function Before() {
  return (
    <Block
      display="flex"
      alignItems="center"
      paddingLeft="scale500"
    >
      <Search size="18px" />
    </Block>
  );
}

function After() {
  return (
    <Block
      display="flex"
      alignItems="center"
      paddingRight="scale500"
    >
      <Search size="18px" />
    </Block>
  );
}

function Negative() {
  return (
    <Block
      display="flex"
      alignItems="center"
      paddingRight="scale500"
      color="negative400"
    >
      <Alert size="18px" />
    </Block>
  );
}

function Positive() {
  return (
    <Block
      display="flex"
      alignItems="center"
      paddingRight="scale500"
      color="positive400"
    >
      <Check size="18px" />
    </Block>
  );
}

export default () => {
  return (
    <React.Fragment>
      <Input
        overrides={{Before}}
        placeholder="Input with a Before component"
      />
      <Block as="br" />
      <Input
        overrides={{After}}
        placeholder="Input with an After component"
      />
      <Block as="br" />
      <Input
        error
        overrides={{After: Negative}}
        placeholder="Input with negative icon"
      />
      <Block as="br" />
      <Input
        positive
        overrides={{After: Positive}}
        placeholder="Input with positive icon"
      />
    </React.Fragment>
  );
};
