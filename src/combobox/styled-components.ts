/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SIZE } from '../input';
import { styled } from '../styles';
import type { Font } from '../themes/types';

export const StyledRoot = styled('div', {});

StyledRoot.displayName = 'StyledRoot';

export const StyledInputContainer = styled('div', {});

StyledInputContainer.displayName = 'StyledInputContainer';

export const StyledListBox = styled<
  'ul',
  {
    $width: string;
  }
>('ul', ({ $theme, $width }) => {
  return {
    backgroundColor: $theme.colors.backgroundPrimary,
    marginBlockStart: 'unset',
    marginBlockEnd: 'unset',
    maxHeight: '200px',
    overflowY: 'auto',
    outline: 'none',
    paddingInlineStart: 'unset',
    width: $width,
  };
});

StyledListBox.displayName = 'StyledListBox';

function buildStylesForSize(
  size,
  theme
):
  | ({
      height: string;
      paddingLeft?: string;
    } & Font)
  | ({
      height: string;
      paddingRight?: string;
    } & Font) {
  const paddingDir: string = theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  switch (size) {
    case SIZE.mini:
      return {
        ...theme.typography.ParagraphXSmall,
        height: '30px',
        [paddingDir]: theme.sizing.scale200,
      };
    case SIZE.compact:
      return {
        ...theme.typography.ParagraphSmall,
        height: '36px',
        [paddingDir]: theme.sizing.scale400,
      };
    case SIZE.large:
      return {
        ...theme.typography.ParagraphLarge,
        height: '56px',
        [paddingDir]: theme.sizing.scale650,
      };
    case SIZE.default:
    default:
      return {
        ...theme.typography.ParagraphMedium,
        height: '48px',
        [paddingDir]: theme.sizing.scale550,
      };
  }
}

export const StyledListItem = styled<
  'li',
  {
    $isSelected: boolean;
    $size: keyof typeof SIZE;
  }
>('li', ({ $isSelected, $theme, $size }) => {
  return {
    ...buildStylesForSize($size, $theme),
    alignItems: 'center',
    backgroundColor: $isSelected ? $theme.colors.comboboxListItemFocus : null,
    cursor: 'default',
    display: 'flex',
    listStyle: 'none',
    ':hover': {
      backgroundColor: $isSelected ? null : $theme.colors.comboboxListItemHover,
    },
  };
});
StyledListItem.displayName = 'StyledListItem';
