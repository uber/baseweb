import * as React from 'react';
import {useStyletron} from 'baseui';
import {Button} from 'baseui/button';
import {
  StatefulPopover,
  PLACEMENT,
  TRIGGER_TYPE,
} from 'baseui/popover';
import {Paragraph1} from 'baseui/typography';

export default () => {
  const [useCss, theme] = useStyletron();
  return (
    <div
      className={useCss({
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
            placement={PLACEMENT[key as keyof PLACEMENT]}
            triggerType={TRIGGER_TYPE.hover}
            content={
              <Paragraph1 padding="scale300">{`PLACEMENT.${
                PLACEMENT[key as keyof PLACEMENT]
              }`}</Paragraph1>
            }
            accessibilityType={'tooltip'}
          >
            <Button>{PLACEMENT[key as keyof PLACEMENT]}</Button>
          </StatefulPopover>
        </div>
      ))}
    </div>
  );
};
