// @flow
import React from 'react';
import {
  StatefulContainer,
  Input,
  StyledRoot,
  StyledInputContainer,
  StyledInput,
  StyledLabel,
  StyledCaption,
  StyledInputEnhancer,
} from './index';
import type {StatefulProps, Props} from './types';

export default function(props: StatefulProps & Props) {
  const components = {
    Label: StyledLabel,
    Root: StyledRoot,
    StartEnhancer: StyledInputEnhancer,
    InputContainer: StyledInputContainer,
    Input: StyledInput,
    EndEnhancer: StyledInputEnhancer,
    Caption: StyledCaption,
    ...props.components,
  };
  return (
    <StatefulContainer {...props}>
      {(childrenProps: Props) => (
        <Input {...childrenProps} components={components} />
      )}
    </StatefulContainer>
  );
}
