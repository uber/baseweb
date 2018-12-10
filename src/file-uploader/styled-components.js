/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const FileDragAndDrop = styled('div', (props: StylePropsT) => {
  return {
    alignItems: 'center',
    backgroundColor: props.$theme.colors.mono200,
    borderColor: props.$isDragActive
      ? props.$theme.colors.primary400
      : props.$theme.colors.mono500,

    borderStyle: 'dashed',
    borderRadius: props.$theme.borders.radius200,
    borderWidth: props.$theme.sizing.scale0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: props.$theme.sizing.scale900,
    paddingRight: props.$theme.sizing.scale800,
    paddingBottom: props.$theme.sizing.scale900,
    paddingLeft: props.$theme.sizing.scale800,
    width: '100%',
  };
});

export const Root = styled('div');
export const FilesList = styled('ul');
export const HiddenInput = styled('input');
export const AcceptedFile = styled('li');
export const RejectedFile = styled('li', (props: StylePropsT) => ({
  color: props.$theme.colors.negative400,
}));
