/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {getOverrides, withOverrides} from '../helpers/overrides.js';
import type {SkeletonPropsT} from './types.js';
import {StyledRoot, StyledRow} from './styled-components.js';

class Skeleton extends React.Component<SkeletonPropsT> {
  static defaultProps: SkeletonPropsT = {
    rows: 0,
    animation: false,
  };
  render() {
    const {overrides = {}} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [Row, rowProps] = getOverrides(overrides.Row, StyledRow);

    if (typeof this.props.rows === 'number') {
      return (
        <Root
          $height={this.props.height}
          $width={this.props.width}
          $animation={this.props.animation}
          $rows={this.props.rows}
          testid={'loader'}
          {...rootProps}
        >
          {Array(this.props.rows)
            .fill()
            .map((item, index) => (
              <Row
                $animation={this.props.animation}
                key={index}
                $isLastRow={index === this.props.rows - 1}
                {...rowProps}
              ></Row>
            ))}
        </Root>
      );
    }
    return (
      <Root
        $height={this.props.height}
        $width={this.props.width}
        $animation={this.props.animation}
        testid={'loader'}
        {...rootProps}
      />
    );
  }
}

//$FlowFixMe
export default withOverrides(Skeleton, 'Skeleton');
