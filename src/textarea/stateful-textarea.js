// @flow
import React from 'react';
import StatefulContainer from './stateful-container';
import Textarea from './textarea';
import type {StatefulTextareaPropsT, TextareaPropsT} from './types';

export default function StatefulTextarea(props: StatefulTextareaPropsT) {
  return (
    <StatefulContainer {...props}>
      {(childrenProps: TextareaPropsT) => <Textarea {...childrenProps} />}
    </StatefulContainer>
  );
}
