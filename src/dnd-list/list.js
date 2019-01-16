/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';
import {Root as StyledRoot} from './styled-components.js';
import {List} from 'react-movable';

import type {ComponentPropsT, SharedStylePropsArgT} from './types.js';

class StatelessList extends React.Component<ComponentPropsT> {
  static defaultProps: $Shape<ComponentPropsT> = {
    prop: true,
    onClick: () => {},
  };

  getSharedProps(): $Diff<SharedStylePropsArgT, {children?: React.Node}> {
    const {prop} = this.props;
    return {
      $prop: prop,
    };
  }

  render() {
    const {overrides = {}, items, onChange} = this.props;
    const {Root: RootOverride} = overrides;

    const Root = getOverride(RootOverride) || StyledRoot;
    const sharedProps = this.getSharedProps();

    return (
      <Root
        onClick={this.props.onClick}
        {...sharedProps}
        {...getOverrideProps(RootOverride)}
      >
        <List
          values={items}
          onChange={onChange}
          renderList={({children, props, isDragged}) => (
            <ul
              {...props}
              style={{padding: 0, cursor: isDragged ? 'grabbing' : undefined}}
            >
              {children}
            </ul>
          )}
          renderItem={({value, props, isDragged, isSelected}) => (
            <li
              {...props}
              style={{
                ...props.style,
                padding: '1.5em',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
              }}
            >
              {value}
            </li>
          )}
        />
      </Root>
    );
  }
}

export default StatelessList;
