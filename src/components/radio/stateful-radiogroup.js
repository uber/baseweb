// @flow
import React from 'react';
// eslint-disable-next-line import/no-named-default
import StatefulContainer from './stateful-radiogroup-container';
// eslint-disable-next-line import/no-named-default
import RadioGroup from './radiogroup';
import type {PropsT, StatefulRadioGroupPropsT} from './types';
// Styled elements

const StatefulRadioGroup = function(props: StatefulRadioGroupPropsT) {
  const {children} = props;
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => (
        <RadioGroup {...childrenProps}>{children}</RadioGroup>
      )}
    </StatefulContainer>
  );
};
StatefulRadioGroup.displayName = 'StatefulRadioGroup';
export default StatefulRadioGroup;
