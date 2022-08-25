/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import StatefulContainer from './stateful-container.js';
import Calendar from './calendar.js';
import type { CalendarPropsT, StatefulDatepickerPropsT } from './types.js';

type PropsT<T> = StatefulDatepickerPropsT<CalendarPropsT<T>>;

class StatefulComponent<T = Date> extends React.Component<PropsT<T>> {
  static defaultProps: PropsT<T> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    onSelect: () => {},
  };

  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => (
          <Calendar
            {...extendedProps}
            // flowlint-next-line unclear-type:off
            onChange={(extendedProps.onChange: any)}
          />
        )}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
