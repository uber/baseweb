/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import StatefulContainer from './stateful-container';
import Datepicker from './datepicker';
import type { StatefulDatepickerPropsT, DatepickerPropsT } from './types';

type PropsT<T> = StatefulDatepickerPropsT<DatepickerPropsT<T>, T> &
  Omit<DatepickerPropsT<T>, keyof StatefulDatepickerPropsT<DatepickerPropsT<T>, T>>;

class StatefulComponent<T = Date> extends React.Component<PropsT<T>> {
  static defaultProps: PropsT<any> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    onChange: () => {},
  };
  render() {
    return (
      <StatefulContainer {...this.props}>
        {(extendedProps) => (
          <Datepicker
            {...extendedProps}
            // flowlint-next-line unclear-type:off
            onChange={extendedProps.onChange as any}
          />
        )}
      </StatefulContainer>
    );
  }
}

export default StatefulComponent;
