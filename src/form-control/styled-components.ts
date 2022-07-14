/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles';
import type { StyleProps } from './types';

export const Label = styled<'label', StyleProps>('label', (props) => {
  const {
    $disabled,
    $theme: { colors, typography },
  } = props;
  return {
    ...typography.font250,
    width: '100%',
    color: $disabled ? colors.contentSecondary : colors.contentPrimary,
    display: 'block',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  };
});

export const LabelContainer = styled<'span', StyleProps>('span', ({ $theme: { sizing } }) => ({
  display: 'flex',
  width: '100%',
  marginTop: sizing.scale300,
  marginRight: 0,
  marginBottom: sizing.scale300,
  marginLeft: 0,
}));

export const LabelEndEnhancer = styled<'span', StyleProps>(
  'span',
  ({ $disabled, $counterError, $theme: { colors, typography } }) => ({
    ...typography.font100,
    flex: 0,
    width: '100%',
    color: $counterError
      ? colors.negative400
      : $disabled
      ? colors.contentSecondary
      : colors.contentPrimary,
  })
);

export const Caption = styled<'div', StyleProps>('div', (props) => {
  const {
    $error,
    $positive,
    $theme: { colors, sizing, typography },
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

export const ControlContainer = styled<'div', StyleProps>('div', (props) => {
  const {
    $theme: { sizing },
  } = props;
  return {
    width: '100%',
    marginBottom: sizing.scale600,
  };
});
