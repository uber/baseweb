// @flow
import React from 'react';
import {
  StatefulContainer,
  StatelessCheckbox,
  StyledRoot,
  StyledCheckmark,
  StyledLabel,
  StyledInput,
} from './index';
import type {Props, StatefulCheckboxProps} from './types';

export default function(props: StatefulCheckboxProps) {
  const components = {
    Root: StyledRoot,
    Checkmark: StyledCheckmark,
    Label: StyledLabel,
    Input: StyledInput,
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
