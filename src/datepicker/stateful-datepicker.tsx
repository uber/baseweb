/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Datepicker from './datepicker';
import type { StatefulDatepickerProps, DatepickerProps } from './types';

type Props<T> = StatefulDatepickerProps<DatepickerProps<T>, T> &
  Omit<DatepickerProps<T>, keyof StatefulDatepickerProps<DatepickerProps<T>, T>>;

class StatefulComponent<T = Date> extends React.Component<Props<T>> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static defaultProps: Props<any> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    onChange: () => {},
  };
  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Datepicker {...extendedProps} onChange={extendedProps.onChange as any} />
        )}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
