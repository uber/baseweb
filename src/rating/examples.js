/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {StarRating, EmoticonRating} from './';
import type {StyledRatingItemPropsT} from './';
import examples from './examples-list';
import {styled} from '../styles/index';

type ExampleState = {
  value?: number,
};

export default {
  [examples.DEFAULT]: function Story1() {
    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <StarRating
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
  [examples.CUSTOM_STARS]: function Story2() {
    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <StarRating
            numItems={10}
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
  [examples.EMOTICON]: function Story3() {
    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <EmoticonRating
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
  [examples.OVERRIDES]: function Story4() {
    const StyledCustomItem = styled('li', ({$isSelected, $isActive}) => {
      return {
        display: 'inline-block',
        marginRight: 8,
        color: $isSelected ? 'blue' : $isActive ? 'red' : '',
      };
    });

    const CustomRatingItem = ({$index, ...props}: StyledRatingItemPropsT) => (
      <StyledCustomItem {...props}>{$index}</StyledCustomItem>
    );

    class Example extends React.Component<{}, ExampleState> {
      state = {};

      render() {
        return (
          <StarRating
            overrides={{
              Item: {
                component: CustomRatingItem,
              },
            }}
            value={this.state.value}
            onChange={({value}) => this.setState({value})}
          />
        );
      }
    }

    return <Example />;
  },
};
