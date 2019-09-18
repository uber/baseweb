// @flow
import * as React from 'react';
import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
        ...theme.typography.font350,
      })}
    >
      <StyledLink href="https://baseui.design">
        Link to baseui.design
      </StyledLink>
    </div>
  );
};
