import * as React from 'react';
import {useStyletron} from 'baseui';
import {Popover} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <Popover
      isOpen
      content={
        <Paragraph1 padding="scale500">hello world</Paragraph1>
      }
    >
      <div className={useCss({...theme.typography.font400})}>
        Always open
      </div>
    </Popover>
  );
};
