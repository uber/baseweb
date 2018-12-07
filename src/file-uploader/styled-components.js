/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const Root = styled('div', (props: StylePropsT) => {
  return {
    textAlign: 'center',
  };
});

export const ContentContainer = styled('div', (props: StylePropsT) => {
  return {};
});

export const FileDragAndDrop = styled('div', (props: StylePropsT) => {
  return {
    backgroundColor: props.$theme.colors.mono200,
    borderColor: props.$isDragActive
      ? props.$theme.colors.primary400
      : props.$theme.colors.mono500,

    borderStyle: 'dashed',
    borderRadius: props.$theme.borders.radius200,
    borderWidth: props.$theme.sizing.scale0,
    boxSizing: 'border-box',
    paddingTop: props.$theme.sizing.scale900,
    paddingRight: props.$theme.sizing.scale800,
    paddingBottom: props.$theme.sizing.scale900,
    paddingLeft: props.$theme.sizing.scale800,
  };
});

export const FileSelectButton = styled('button', (props: StylePropsT) => {
  return {
    ...props.$theme.typography.font350,
    backgroundColor: 'transparent',
    border: 'none',
    color: props.$theme.colors.primary400,
    cursor: 'pointer',
    marginTop: props.$theme.sizing.scale100,
  };
});

export const Input = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
});
