import * as React from 'react';
import {StatefulTooltip} from 'baseui/tooltip';
import {StyledLink} from 'baseui/link';
import {useStyletron, DarkTheme, ThemeProvider} from 'baseui';

function ComplexContent() {
  return (
    <ThemeProvider theme={DarkTheme}>
      Please click this link here:{` `}
      <StyledLink href="#">Click Me!</StyledLink>
    </ThemeProvider>
  );
}

export default function Example() {
  const [css, theme] = useStyletron();
  return (
    <div>
      You can use tooltips in many places, including inline text{' '}
      <StatefulTooltip
        accessibilityType={'tooltip'}
        content={ComplexContent}
        autoFocus
      >
        <span
          className={css({
            borderBottomWidth: '1px',
            borderBottomStyle: 'dotted',
            borderBottomColor: `${theme.colors.primary500}`,
            color: theme.colors.primary500,
          })}
          tabIndex={0}
        >
          such as this
        </span>
      </StatefulTooltip>
      . Tooltips are essentially just a Popover with a few style
      tweaks, so you can use all the features that Popover supports.
      Tooltips with interactive content, such as links or buttons,
      should use the autoFocus or focusLock props. This ensures the
      content is within the keyboard tab order of the page.
    </div>
  );
}
