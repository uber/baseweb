/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, gridMediaQueryStyles} from '../../styles/index';
import {Block} from '../../block';

export const Root = styled(Block, props => {
  const {$height} = props;
  return {
    position: 'fixed',
    top: '0',
    width: '100%',
    left: '0',
    ...gridMediaQueryStyles('height', $height),
  };
});
