// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Popover} from 'baseui/popover';
import {Paragraph3} from 'baseui/typography';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <Popover
      isOpen
      content={
        <Paragraph3 padding="scale500">hello world</Paragraph3>
      }
    >
      <div className={css({...theme.typography.font300})}>
        Always open
      </div>
    </Popover>
  );
};
