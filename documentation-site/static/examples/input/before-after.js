import * as React from 'react';
import {styled} from 'baseui';
import {Block} from 'baseui/block';
import Alert from 'baseui/icon/alert';
import Check from 'baseui/icon/check';
import DeleteAlt from 'baseui/icon/delete-alt';
import Search from 'baseui/icon/search';
import {StatefulInput, Input} from 'baseui/input';

function InputWithClear() {
  const [value, setValue] = React.useState('');

  const Clear = styled('button', ({$theme}) => {
    return {
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      paddingRight: $theme.sizing.scale500,
    };
  });

  function ClearIcon() {
    return (
      <Clear onClick={() => setValue('')}>
        <DeleteAlt size="18px" />
      </Clear>
    );
  }

  return (
    <Input
      onChange={event => setValue(event.target.value)}
      value={value}
      placeholder="Input with a clear button"
      overrides={{After: ClearIcon}}
    />
  );
}

function Before() {
  return (
    <Block display="flex" alignItems="center" paddingLeft="scale500">
      <Search size="18px" />
    </Block>
  );
}

function After() {
  return (
    <Block display="flex" alignItems="center" paddingRight="scale500">
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

export default () => (
  <Block>
    <StatefulInput
      overrides={{Before}}
      placeholder="Input with a Before component"
    />
    <Block as="br" />

    <StatefulInput
      overrides={{After}}
      placeholder="Input with an After component"
    />
    <Block as="br" />

    <InputWithClear />
    <Block as="br" />

    <StatefulInput
      error
      overrides={{After: Negative}}
      placeholder="Input with negative icon"
    />
    <Block as="br" />

    <StatefulInput
      positive
      overrides={{After: Positive}}
      placeholder="Input with positive icon"
    />
  </Block>
);
