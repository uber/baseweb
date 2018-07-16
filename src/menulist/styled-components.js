// @flow
import {styled} from '../styles';

import type {ThemeT} from '../styles';

type StyledProps = {
  $theme: ThemeT,
};

type StyledListItemProps = {
  $isHighlighted: boolean,
} & StyledProps;

export const List = styled('ul', ({$theme}: StyledProps) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  background: $theme.colors.white,
  borderRadius: $theme.borders.radius300,
  boxShadow: $theme.lighting.shadow600,
  padding: `${$theme.sizing.scale200} ${$theme.sizing.scale400}`,
}));

export const ListItem = styled(
  'li',
  ({$theme, $isHighlighted}: StyledListItemProps) => ({
    position: 'relative',
    display: 'block',
    color: $isHighlighted ? $theme.colors.primary : $theme.colors.black,
    margin: 0,
    cursor: 'pointer',
    ...$theme.typography.font400,
    transition: `color ${$theme.animation.timing100} ${
      $theme.animation.easeOutCurve
    }`,
    ':hover': {
      color: $theme.colors.primary400,
    },
  }),
);
