/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const Label = styled<StylePropsT>('label', props => {
  const {
    $disabled,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...typography.font250,
    fontWeight: 500,
    width: '100%',
    color: $disabled ? colors.contentSecondary : colors.contentPrimary,
    display: 'block',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: sizing.scale300,
    marginRight: 0,
    marginBottom: sizing.scale300,
    marginLeft: 0,
  };
});

export const Caption = styled<StylePropsT>('div', props => {
  const {
    $error,
    $positive,
    $theme: {colors, sizing, typography},
  } = props;

  let fontColor = colors.contentSecondary;
  if ($error) {
    fontColor = colors.negative400;
  } else if ($positive) {
    fontColor = colors.positive400;
  }

  return {
    ...typography.font100,
    color: fontColor,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginTop: sizing.scale300,
    marginRight: 0,
    marginBottom: sizing.scale300,
    marginLeft: 0,
  };
});

export const ControlContainer = styled<StylePropsT>('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return {
    width: '100%',
    marginBottom: sizing.scale600,
  };
});
