/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import {styled} from '../styles';

export const Label = styled('label', props => {
  const {
    $disabled,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...typography.font350,
    fontWeight: 500,
    color: $disabled ? colors.foregroundAlt : colors.foreground,
    cursor: $disabled ? 'not-allowed' : 'auto',
    display: 'block',
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: sizing.scale300,
    marginRight: '0',
    marginBottom: sizing.scale300,
    marginLeft: '0',
  };
});

export const Caption = styled('div', props => {
  const {
    $error,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...typography.font200,
    color:
      $error && typeof $error !== 'boolean'
        ? colors.negative400
        : colors.foregroundAlt,
    paddingTop: '0',
    paddingRight: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    marginTop: sizing.scale300,
    marginRight: '0',
    marginBottom: sizing.scale300,
    marginLeft: '0',
  };
});

export const ControlContainer = styled('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return {
    marginBottom: sizing.scale600,
  };
});
