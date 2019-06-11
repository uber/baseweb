/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {styled} from 'baseui';
import {Unstable_A11y as A11y} from 'baseui/a11y';
import {Button} from 'baseui/button';
import Search from 'baseui/icon/search';
import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

const Container = styled('div', ({$theme}) => ({
  padding: $theme.sizing.scale900,
}));

export default () => {
  const [toggle, setToggle] = React.useState(false);
  const [inputs, setInputs] = React.useState(['']);

  return (
    <A11y>
      <Container>
        <Button size="compact" onClick={() => setToggle(!toggle)}>
          toggle: {String(toggle)}
        </Button>

        <Button size="compact" onClick={() => setInputs([...inputs, ''])}>
          add input component
        </Button>

        <br />
        <br />

        {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
        <div aria-hidden="asdf">should check</div>
        <br />

        <div>checks but should not violate</div>
        <br />

        <Button shape="square" size="compact">
          <Search size={18} />
        </Button>
        <br />

        {inputs.map((_, i) => (
          <FormControl label="hello" key={i}>
            <StatefulInput />
          </FormControl>
        ))}
      </Container>
    </A11y>
  );
};
