// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

export default function Example() {
  const [css, theme] = useStyletron();
  const contentCx = css({
    padding: theme.sizing.scale500,
    maxWidth: '300px',
  });
  return (
    <StatefulPopover
      dismissOnEsc={false}
      dismissOnClickOutside={false}
      accessibilityType={'tooltip'}
      content={({close}) => (
        <div className={contentCx}>
          <ParagraphSmall paddingBottom="scale400">
            content render prop is passed a <code>close()</code>{' '}
            callback so it you can manually trigger popover close
            from within
          </ParagraphSmall>
          <Button onClick={close}>Dismiss</Button>
        </div>
      )}
    >
      <Button>Click Me</Button>
    </StatefulPopover>
  );
}
