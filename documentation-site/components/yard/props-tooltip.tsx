/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import {useStyletron} from 'baseui';
import {StatefulPopover, PLACEMENT, TRIGGER_TYPE} from 'baseui/popover';

//@ts-ignore
import TypeDefinition from './type-definition';

function PropsTooltip({className, typeDefinition, style, ...restProps}: any) {
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
          <TypeDefinition type={typeDefinition} />
        </div>
      }
    >
      <span
        {...restProps}
        className={`${className} ${css({
          cursor: 'default',
          ':hover': {backgroundColor: theme.colors.mono100},
        })}`}
        style={{
          pointerEvents: 'auto',
          ...style,
        }}
      />
    </StatefulPopover>
  );
}

export default PropsTooltip;
