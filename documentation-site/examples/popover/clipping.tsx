import * as React from 'react';
import {Button} from 'baseui/button';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {Paragraph1, Label1} from 'baseui/typography';

export default () => (
  <div style={{height: '300px', overflow: 'auto'}}>
    <div
      style={{
        width: '100%',
        height: '700px',
        padding: '140px 0',
        backgroundColor: '#ccc',
        textAlign: 'center',
      }}
    >
      <StatefulPopover
        initialState={{isOpen: true}}
        dismissOnEsc={false}
        dismissOnClickOutside={false}
        content={() => (
          <Paragraph1 padding="scale500" maxWidth="200px">
            Popover will reposition itself to avoid being clipped!
            <br />
            <Label1> Try scrolling in this box...</Label1>
          </Paragraph1>
        )}
        placement={PLACEMENT.top}
      >
        <Button>Click Me</Button>
      </StatefulPopover>
    </div>
  </div>
);
