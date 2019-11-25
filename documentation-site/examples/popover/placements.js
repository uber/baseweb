// @flow
import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {
  StatefulPopover,
  PLACEMENT,
  TRIGGER_TYPE,
} from 'baseui/popover';
import {Paragraph3} from 'baseui/typography';

export default () => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        height: '560px',
      })}
    >
      {Object.keys(PLACEMENT).map((key, index) => (
        <div style={{padding: theme.sizing.scale700}} key={index}>
          <StatefulPopover
            placement={PLACEMENT[key]}
            triggerType={TRIGGER_TYPE.hover}
            content={
              <Paragraph3 padding="scale300">{`PLACEMENT.${PLACEMENT[key]}`}</Paragraph3>
            }
            accessibilityType={'tooltip'}
          >
            <Button>{PLACEMENT[key]}</Button>
          </StatefulPopover>
        </div>
      ))}
    </div>
  );
};
