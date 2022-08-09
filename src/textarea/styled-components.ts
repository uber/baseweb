/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, type Theme } from '../styles';
import { getInputStyles, getInputContainerStyles, getRootStyles } from '../input/styled-components';
import type { SharedStyleProps } from './types';

export const StyledTextAreaRoot = styled<'div', SharedStyleProps>(
  'div',
  (
    props: SharedStyleProps & {
      $theme: Theme;
    }
  ) => {
    return getRootStyles({ $positive: false, ...props, $hasIconTrailing: false });
  }
);

StyledTextAreaRoot.displayName = 'StyledTextAreaRoot';

export const StyledTextareaContainer = styled<'div', SharedStyleProps>(
  'div',
  (
    props: SharedStyleProps & {
      $theme: Theme;
    }
  ) => ({
    ...getInputContainerStyles({ $positive: false, ...props }),
  })
);

StyledTextareaContainer.displayName = 'StyledTextareaContainer';

export const StyledTextarea = styled<'textarea', SharedStyleProps>(
  'textarea',
  (
    props: SharedStyleProps & {
      $theme: Theme;
    }
  ) => ({
    ...getInputStyles(props),
    resize: 'none',
  })
);
StyledTextarea.displayName = 'StyledTextarea';
