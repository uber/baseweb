// @flow
import React from 'react';
import {
  StatefulContainer,
  StatelessInput,
  StyledRoot,
  StyledInput,
} from './index';
import type {StatefulProps, Props} from './types';

export default function(props: StatefulProps & Props) {
  const components = {
    Root: StyledRoot,
    Input: StyledInput,
    ...props.components,
  };
  return (
    <StatefulContainer {...props}>
      {(childrenProps: Props) => (
        <StatelessInput {...childrenProps} components={components} />
      )}
    </StatefulContainer>
  );
}
