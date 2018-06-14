// @flow
import React from 'react';
import {
  StatefulContainer,
  StatelessCheckbox,
  StyledRoot,
  StyledCheckmark,
  StyledLabel,
} from './index';
import type {StatefulProps, Props} from './types';

export default function(props: StatefulProps) {
  const components = {
    Root: StyledRoot,
    Checkmark: StyledCheckmark,
    Label: StyledLabel,
    ...props.components,
  };
  return (
    <StatefulContainer {...props}>
      {(childrenProps: Props) => (
        <StatelessCheckbox {...childrenProps} components={components} />
      )}
    </StatefulContainer>
  );
}
