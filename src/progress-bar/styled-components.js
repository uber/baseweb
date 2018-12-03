/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index';
export const Root = styled('div', props => {
  return {
    width: '100%',
  };
});

export const Bar = styled('div', props => {
  const {$theme} = props;
  const {colors, sizing, borders} = $theme;
  return {
    marginLeft: sizing.scale500,
    marginRight: sizing.scale500,
    marginTop: sizing.scale500,
    marginBottom: sizing.scale500,
    borderRadius: borders.useRoundedCorners ? sizing.scale0 : '0',
    backgroundColor: colors.mono400,
    height: '4px',
  };
});
Bar.displayName = 'StyledBar';

export const BarProgress = styled('div', props => {
  const {$theme, $value, $successValue} = props;
  const {colors, sizing, borders} = $theme;
  const width = `${($value / $successValue) * 100}%`;
  return {
    borderRadius: borders.useRoundedCorners ? sizing.scale0 : '0',
    backgroundColor: colors.primary400,
    width: width,
    transition: 'width 0.5s',
    height: '100%',
  };
});
BarProgress.displayName = 'StyledBarProgress';

export const Label = styled('div', props => {
  return {
    textAlign: 'center',
    ...props.$theme.typography.font250,
    color: props.$theme.colors.mono700,
  };
});
Label.displayName = 'StyledLabel';
