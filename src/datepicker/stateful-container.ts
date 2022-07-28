/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { STATE_CHANGE_TYPE } from './constants';
import type {
  CalendarProps,
  ContainerState,
  DatepickerProps,
  StatefulContainerProps,
  StateChangeType,
  StateReducer,
} from './types';

type InputProps<T> = CalendarProps<T> | DatepickerProps<T>;
type Props<T> = StatefulContainerProps<InputProps<T>, T>;

class StatefulContainer<T = Date> extends React.Component<Props<T>, ContainerState<T>> {
  static defaultProps: {
    stateReducer: StateReducer<unknown>;
  } & Partial<Props<unknown>> = {
    initialState: {},
    stateReducer: (type, nextState) => nextState,
    onChange: () => {},
  };

  constructor(props: Props<T>) {
    super(props);
    const value = props.range ? [] : (null as T | undefined | null);
    this.state = { value, ...props.initialState };
  }

  onChange: (a: { readonly date: T | undefined | null | Array<T | undefined | null> }) => unknown =
    (data) => {
      const { date } = data;
      this.internalSetState(STATE_CHANGE_TYPE.change, { value: date });

      const onChange = this.props.onChange;
      if (onChange) {
        if (Array.isArray(date)) {
          if (date.every(Boolean)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange({ date: date as any as Array<T> });
          }
        } else {
          onChange({ date });
        }
      }

      const onRangeChange = this.props.onRangeChange;
      if (onRangeChange) {
        onRangeChange({ date });
      }
    };

  internalSetState(type: StateChangeType, changes: ContainerState<T>) {
    const { stateReducer } = this.props;
    this.setState((prevState) => stateReducer(type, changes, prevState));
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children, initialState, stateReducer, ...restProps } = this.props;
    return this.props.children({
      ...restProps,
      value: this.state.value,
      onChange: this.onChange,
    });
  }
}

export default StatefulContainer;
