// @flow
import React from 'react';

import {useStyletron} from 'baseui';
import {Unstable_A11y as A11y} from 'baseui/a11y';
import {Button} from 'baseui/button';
import Search from 'baseui/icon/search';
import {FormControl} from 'baseui/form-control';
import {StatefulInput} from 'baseui/input';

export default () => {
  const [inputs, setInputs] = React.useState(['']);
  const [css, theme] = useStyletron();

  return (
    <A11y>
      <div
        className={css({
          padding: theme.sizing.scale900,
        })}
      >
        <Button
          size="compact"
          onClick={() => setInputs([...inputs, ''])}
        >
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
      </div>
    </A11y>
  );
};
