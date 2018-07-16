// @flow
import React from 'react';
// eslint-disable-next-line import/no-named-default
import {default as StatefulContainer} from './stateful-checkbox-container';
// eslint-disable-next-line import/no-named-default
import {default as Checkbox} from './checkbox';
import type {PropsT, StatefulCheckboxPropsT} from './types';
// Styled elements

const StatefulCheckbox = function(props: StatefulCheckboxPropsT) {
  const {components} = props;
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => (
        <Checkbox {...childrenProps} components={components} />
      )}
    </StatefulContainer>
  );
};
StatefulCheckbox.displayName = 'StatefulCheckbox';
export default StatefulCheckbox;
