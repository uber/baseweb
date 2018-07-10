// @flow
import React from 'react';
// eslint-disable-next-line import/no-named-default
import {default as StatefulContainer} from './stateful-checkbox-container';
// eslint-disable-next-line import/no-named-default
import {default as Checkbox} from './checkbox';
import type {Props, StatefulCheckboxProps} from './types';
// Styled elements
import {
  Root as StyledRoot,
  Checkmark as StyledCheckmark,
  Label as StyledLabel,
  Input as StyledInput,
} from './styled-components';

export default function(props: StatefulCheckboxProps) {
  const {components} = props;
  const statelessComponents = {
    Root: StyledRoot,
    Checkmark: StyledCheckmark,
    Label: StyledLabel,
    Input: StyledInput,
    ...components,
  };
  return (
    <StatefulContainer {...props}>
      {(childrenProps: Props) => (
        <Checkbox {...childrenProps} components={statelessComponents} />
      )}
    </StatefulContainer>
  );
}
