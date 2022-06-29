/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Datepicker from './datepicker';
import type { StatefulDatepickerProps, DatepickerProps } from './types';

type DatepickerProps<T> = StatefulDatepickerProps<DatepickerProps<T>, T> &
  Omit<DatepickerProps<T>, keyof StatefulDatepickerProps<DatepickerProps<T>, T>>;

class StatefulComponent<T = Date> extends React.Component<DatepickerProps<T>> {
  static defaultProps: DatepickerProps<any> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    onChange: () => {},
  };
  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => (
          <Datepicker {...extendedProps} onChange={extendedProps.onChange as any} />
        )}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
