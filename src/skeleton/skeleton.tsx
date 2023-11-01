/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import type { SkeletonProps } from './types';
import { StyledRoot, StyledRow } from './styled-components';

class Skeleton extends React.Component<SkeletonProps> {
  static defaultProps: SkeletonProps = {
    rows: 0,
    animation: false,
  };
  render() {
    const { overrides = {} } = this.props;
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
            .fill(undefined)
            .map((item, index) => (
              <Row
                $animation={this.props.animation}
                key={index}
                $rowIndex={index}
                // @ts-ignore
                $isLastRow={index === this.props.rows - 1}
                $dynamicRowHeight={this.props.dynamicRowHeight}
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

export default Skeleton;
