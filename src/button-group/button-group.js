/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {KIND, SIZE, SHAPE} from '../button/index.js';
import {getOverrides} from '../helpers/overrides.js';

import {MODE} from './constants';
import {StyledRoot} from './styled-components.js';
import type {PropsT} from './types.js';

export default class ButtonGroup extends React.Component<PropsT, any> {
  static defaultProps = {
    ariaLabel: 'button group',
    disabled: false,
    kind: KIND.secondary,
    onChange: () => {},
    onClick: () => {},
    shape: SHAPE.default,
    size: SIZE.default,
  };

  constructor(props: PropsT) {
    super(props);

    this.state = {
      selected: props.selected ? [].concat(props.selected) : [],
    };
  }

  onChange = (index: number) => {
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
  };

  onClick = (event: SyntheticEvent<HTMLButtonElement>, index: number) => {
    if (this.props.onClick) {
      this.props.onClick(event, index);
    }

    this.onChange(index);
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root aria-label={this.props.ariaLabel}>
        {React.Children.map(this.props.children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            disabled: this.props.disabled,
            first: index === 0,
            kind: this.props.kind,
            last: index === this.props.children.length - 1,
            onClick: event => {
              if (child.props.onClick) {
                child.props.onClick(event);
              }

              this.onClick(event, index);
            },
            selected: this.state.selected.includes(index),
            shape: this.props.shape,
            size: this.props.size,
          });
        })}
      </Root>
    );
  }
}
