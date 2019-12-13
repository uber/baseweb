import * as React from 'react';

import {useStyletron} from 'baseui';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover';

//@ts-ignore
import TypeDefinition from './type-definition';

function PropsTooltip(props: any) {
  const [css, theme] = useStyletron();
  return (
    <StatefulPopover
      accessibilityType={'tooltip'}
      triggerType={TRIGGER_TYPE.hover}
      onMouseEnterDelay={500}
      placement={PLACEMENT.topLeft}
      content={
        <div
          className={css({
            backgroundColor: theme.colors.backgroundSecondary,
            maxHeight: '300px',
            maxWidth: '400px',
            overflow: 'auto',
            paddingTop: theme.sizing.scale100,
            paddingRight: theme.sizing.scale200,
            paddingBottom: theme.sizing.scale100,
            paddingLeft: theme.sizing.scale200,
          })}
        >
          <TypeDefinition type={props.typeDefinition} />
        </div>
      }
    >
      <span
        {...props}
        className={
          `${props.className} ` +
          css({
            cursor: 'default',
            ':hover': {backgroundColor: theme.colors.mono100},
          })
        }
        style={{
          pointerEvents: 'auto',
          ...props.style,
        }}
      />
    </StatefulPopover>
  );
}

export default PropsTooltip;
