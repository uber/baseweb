/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import type {EmoticonRatingPropsT, RatingStateT} from './types.js';
import {StyledRoot, StyledEmoticon} from './styled-components.js';
import {getOverrides} from '../helpers/overrides.js';
import {ENTER_KEY_CODE, SPACE_KEY_CODE} from './utils.js';

class EmoticonRating extends React.Component<
  EmoticonRatingPropsT,
  RatingStateT,
> {
  static defaultProps = {
    overrides: {},
  };

  state = {};

  selectItem = (value: number) => {
    const {onChange} = this.props;

    onChange && onChange({value});
    this.setState({previewIndex: undefined});
  };

  updatePreview = (previewIndex?: number) => {
    this.setState({previewIndex});
  };

  renderRatingContents = () => {
    const {overrides = {}, value = -1} = this.props;
    const {previewIndex} = this.state;

    const [Emoticon, emoticonProps] = getOverrides(
      overrides.Item,
      StyledEmoticon,
    );

    const ratings = [];

    for (let x = 1; x <= 5; x++) {
      ratings.push(
        <Emoticon
          key={x}
          role="radio"
          tabIndex={0}
          aria-setsize={5}
          aria-checked={x === value}
          aria-posinset={x}
          $index={x}
          $isActive={
            previewIndex !== undefined ? x === previewIndex : x === value
          }
          $isSelected={x === previewIndex}
          onClick={() => this.selectItem(x)}
          onKeyDown={e => {
            if (e.keyCode === SPACE_KEY_CODE || e.keyCode === ENTER_KEY_CODE) {
              this.selectItem(x);
            }
          }}
          onFocus={() => this.updatePreview(x)}
          onMouseOver={() => this.updatePreview(x)}
          onBlur={() => this.updatePreview(undefined)}
          {...emoticonProps}
        />,
      );
    }

    return ratings;
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root
        data-baseweb="emoticon-rating"
        tabIndex={0}
        role="radiogroup"
        onBlur={() => this.updatePreview(undefined)}
        onMouseLeave={() => this.updatePreview(undefined)}
        {...rootProps}
      >
        {this.renderRatingContents()}
      </Root>
    );
  }
}

export default EmoticonRating;
