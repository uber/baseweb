// @flow
import * as React from 'react';
import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        ...theme.typography.font350,
      })}
    >
      <StyledLink href="https://baseui.design">
        Link to baseui.design
      </StyledLink>
    </div>
  );
};
