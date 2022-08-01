/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Calendar from './calendar';
import type { CalendarProps, StatefulDatepickerProps } from './types';

type DatepickerProps<T> = StatefulDatepickerProps<CalendarProps<T>> &
  Omit<CalendarProps<T>, keyof StatefulDatepickerProps<CalendarProps<T>>>;

class StatefulComponent<T = Date> extends React.Component<DatepickerProps<T>> {
  static defaultProps: DatepickerProps<unknown> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    // @ts-expect-error todo(flow->ts) might be onSelect can be removed
    onSelect: () => {},
  };

  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Calendar {...extendedProps} onChange={extendedProps.onChange as any} />
        )}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
