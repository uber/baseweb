import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {Paragraph3, Label3} from 'baseui/typography';

export default () => {
  const [css] = useStyletron();
  return (
    <div className={css({height: '300px', overflow: 'auto'})}>
      <div
        className={css({
          width: '100%',
          height: '700px',
          padding: '140px 0',
          backgroundColor: '#ccc',
          textAlign: 'center',
        })}
      >
        <StatefulPopover
          initialState={{isOpen: true}}
          dismissOnEsc={false}
          dismissOnClickOutside={false}
          content={() => (
            <Paragraph3 padding="scale500" maxWidth="200px">
              Popover will reposition itself to avoid being clipped!
              <br />
              <Label3> Try scrolling in this box...</Label3>
            </Paragraph3>
          )}
          placement={PLACEMENT.top}
        >
          <Button>Click Me</Button>
        </StatefulPopover>
      </div>
    </div>
  );
};
