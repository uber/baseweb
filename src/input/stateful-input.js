// @flow
import React from 'react';
import {StatefulContainer, Input} from './index';
import type {StatefulInputPropsT, PropsT} from './types';

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
