// @flow
import React from 'react';
import StatefulContainer from './stateful-container';
import Input from './input';
import type {StatefulInputPropsT, PropsT} from './types';

export default function StatefulInput(props: StatefulInputPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: PropsT) => <Input {...childrenProps} />}
    </StatefulContainer>
  );
}
