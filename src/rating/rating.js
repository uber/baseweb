/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {KIND} from './constants';
import type {RatingPropsT, RatingStateT} from './types';
import {StyledRoot, StyledStar, StyledEmoticon} from './styled-components';
import {getOverrides} from '../helpers/overrides';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

class Rating extends React.Component<RatingPropsT, RatingStateT> {
  static defaultProps = {
    overrides: {},
    kind: KIND.star,
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
    const {overrides = {}, value = -1, kind} = this.props;
    const {previewIndex} = this.state;

    const [Star, starProps] = getOverrides(overrides.Star, StyledStar);
    const [Emoticon, emoticonProps] = getOverrides(
      overrides.Emoticon,
      StyledEmoticon,
    );

    const ratings = [];
    const RatingItem = kind === KIND.star ? Star : Emoticon;
    const overrideProps = kind === KIND.star ? starProps : emoticonProps;

    for (let x = 1; x <= 5; x++) {
      let isChecked = x <= value;
      let isActive =
        previewIndex !== undefined ? x <= previewIndex : x <= value;

      if (kind !== KIND.star) {
        isChecked = x === value;
        isActive =
          previewIndex !== undefined ? x === previewIndex : x === value;
      }

      ratings.push(
        <RatingItem
          key={x}
          role="radio"
          tabIndex={0}
          aria-setsize={5}
          aria-checked={isChecked}
          aria-posinset={x}
          $index={x}
          $isActive={isActive}
          $isSelected={x === previewIndex}
          onClick={() => this.selectItem(x)}
          onKeyDown={e => {
            if (e.keyCode === SPACE_KEY_CODE || e.keyCode === ENTER_KEY_CODE) {
              this.selectItem(x);
            }
          }}
          onFocus={() => this.updatePreview(x)}
          onMouseOver={() => this.updatePreview(x)}
          onMouseLeave={() => this.updatePreview(undefined)}
          onBlur={() => this.updatePreview(undefined)}
          {...overrideProps}
        />,
      );
    }

    return ratings;
  };

  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root tabIndex={0} role="radiogroup" {...rootProps}>
        {this.renderRatingContents()}
      </Root>
    );
  }
}

export default Rating;
