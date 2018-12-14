/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {MODE} from './constants.js';

import type {StatefulContainerPropsT, StateT} from './types.js';

export default class StatefulButtonGroup extends React.Component<
  StatefulContainerPropsT,
  StateT,
> {
  constructor(props: StatefulContainerPropsT) {
    super(props);

    this.state = {
      selected: props.selected ? [].concat(props.selected) : [],
    };
  }

  onChange = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.mode === MODE.radio) {
      if (
        this.state.selected.length === 0 ||
        this.state.selected[0] !== index
      ) {
        this.setState({selected: [index]});
      } else {
        this.setState({selected: []});
      }
    }

    if (this.props.mode === MODE.checkbox) {
      if (!this.state.selected.includes(index)) {
        this.setState({selected: [...this.state.selected, index]});
      } else {
        this.setState({
          selected: this.state.selected.filter(value => value !== index),
        });
      }
    }

    if (this.props.onChange) {
      this.props.onChange(event, index);
    }
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.onClick) {
      this.props.onClick(event, index);
    }
  };

  render() {
    return this.props.children({
      ...this.props,
      onChange: this.onChange,
      onClick: this.onClick,
      selected: this.state.selected,
    });
  }
}
