/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import type { StarRatingPropsT, RatingStateT } from './types';
import { StyledRoot, StyledStar } from './styled-components';
import { getOverrides } from '../helpers/overrides';
import { ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT } from './utils';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

class StarRating extends React.Component<StarRatingPropsT, RatingStateT> {
  static defaultProps = {
    overrides: {},
    numItems: 5,
    readOnly: false,
  };

  state = { isFocusVisible: false, previewIndex: undefined };

  selectItem = (value: number) => {
    const { onChange } = this.props;

    onChange && onChange({ value });
    this.setState({ previewIndex: undefined });
  };

  updatePreview = (previewIndex?: number) => {
    this.setState({ previewIndex });
  };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  renderRatingContents = () => {
    const { overrides = {}, value = -1, numItems, size = 22, readOnly = false } = this.props;
    const { previewIndex } = this.state;
    const [Star, starProps] = getOverrides(overrides.Item, StyledStar);

    const ratings = [];
    const refs = [{ current: null }];
    for (let x = 1; x <= numItems; x++) {
      const isFocusable = x === value || (value < 1 && x === 1);
      const starRef = React.createRef<HTMLLIElement>();
      refs.push(starRef);
      ratings.push(
        <Star
          key={x}
          role="radio"
          title="rating"
          // flowlint-next-line unclear-type:off
          ref={starRef as any}
          tabIndex={isFocusable ? '0' : '-1'}
          aria-setsize={numItems}
          aria-checked={x <= value}
          aria-posinset={x}
          aria-disabled={readOnly}
          $size={size}
          $index={x}
          $isActive={previewIndex !== undefined ? x <= previewIndex : x <= value}
          $isPartialActive={previewIndex !== undefined ? false : x <= value + 0.5}
          $isSelected={x === previewIndex}
          $isFocusVisible={this.state.isFocusVisible && isFocusable}
          $isReadOnly={readOnly}
          onClick={() => {
            if (readOnly) {
              return;
            }
            this.selectItem(x);
          }}
          onKeyDown={(e) => {
            if (readOnly) {
              return;
            }
            if (e.keyCode === ARROW_UP || e.keyCode === ARROW_LEFT) {
              e.preventDefault && e.preventDefault();
              const prevIndex = value - 1 < 1 ? numItems : value - 1;
              this.selectItem(prevIndex);
              refs[prevIndex].current && refs[prevIndex].current.focus();
            }
            if (e.keyCode === ARROW_DOWN || e.keyCode === ARROW_RIGHT) {
              e.preventDefault && e.preventDefault();
              const nextIndex = value + 1 > numItems ? 1 : value + 1;
              this.selectItem(nextIndex);
              refs[nextIndex].current && refs[nextIndex].current.focus();
            }
          }}
          onMouseOver={() => {
            if (readOnly) {
              return;
            }
            this.updatePreview(x);
          }}
          {...starProps}
          onFocus={forkFocus(starProps, this.handleFocus)}
          onBlur={forkBlur(starProps, this.handleBlur)}
        />
      );
    }

    return ratings;
  };

  render() {
    const { overrides = {} } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);

    return (
      <Root
        data-baseweb="star-rating"
        role="radiogroup"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) this.updatePreview(undefined);
        }}
        onMouseLeave={() => this.updatePreview(undefined)}
        {...rootProps}
      >
        {this.renderRatingContents()}
      </Root>
    );
  }
}

export default StarRating;
