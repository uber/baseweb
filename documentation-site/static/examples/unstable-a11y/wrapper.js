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
  const [inputs, setInputs] = React.useState(['']);

  return (
    <A11y>
      <Container>
        <Button size="compact" onClick={() => setInputs([...inputs, ''])}>
          add input component
        </Button>

        <br />
        <br />

        {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
        <div aria-hidden="asdf">should violate</div>
        <br />

        <div>should not violate</div>
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
