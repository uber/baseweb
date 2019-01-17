import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';

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
          <Block padding="scale500" maxWidth="200px">
            Popover will reposition itself to avoid being clipped!
            <br />
            <strong>Try scrolling in this box...</strong>
          </Block>
        )}
        placement={PLACEMENT.top}
      >
        <Button>Click Me</Button>
      </StatefulPopover>
    </div>
  </div>
);
