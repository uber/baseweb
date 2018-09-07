// @flow
import {styled} from '../styles';
import {KIND, SIZE} from './constants';

export const BaseButton = styled('button', ({$theme, $size, $kind}) => ({
  display: 'flex',
  ...$theme.typography[$size === SIZE.compact ? 'font200' : 'font300'],
  alignItems: 'center',
  justifyContent: 'space-between',
  border: 'none',
  borderRadius: $kind === KIND.round ? '50%' : $theme.borders.radius200,
  outline: 'none',
  WebkitAppearance: 'none',
  transitionProperty: 'background',
  transitionDuration: $theme.animation.timing100,
  transitionTimingFunction: $theme.animation.easeOutCurve,
  cursor: 'pointer',
  ':disabled': {
    cursor: 'not-allowed',
    backgroundColor: $theme.colors.mono300,
    color: $theme.colors.mono600,
  },
  // Padding
  ...($kind === KIND.round
    ? {
        padding: $theme.sizing.scale500,
      }
    : {
        paddingTop:
          $size === SIZE.compact
            ? $theme.sizing.scale200
            : $theme.sizing.scale300,
        paddingBottom:
          $size === SIZE.compact
            ? $theme.sizing.scale200
            : $theme.sizing.scale300,
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      }),
}));

export const PrimaryButton = styled(BaseButton, ({$theme}) => ({
  color: $theme.colors.white,
  backgroundColor: $theme.colors.primary,
  ':hover:enabled': {
    backgroundColor: $theme.colors.primary500,
  },
  ':active:enabled': {
    backgroundColor: $theme.colors.primary600,
  },
}));

export const SecondaryButton = styled(BaseButton, ({$theme}) => ({
  color: $theme.colors.primary,
  backgroundColor: $theme.colors.primary50,
  ':hover:enabled': {
    backgroundColor: $theme.colors.primary100,
  },
  ':active:enabled': {
    backgroundColor: $theme.colors.primary200,
  },
}));

export const TertiaryButton = styled(BaseButton, ({$theme}) => ({
  color: $theme.colors.primary,
  backgroundColor: $theme.colors.mono200,
  ':hover:enabled': {
    backgroundColor: $theme.colors.mono400,
  },
  ':active:enabled': {
    backgroundColor: $theme.colors.mono500,
  },
}));

export const MinimalButton = styled(BaseButton, ({$theme}) => ({
  color: $theme.colors.primary,
  backgroundColor: 'transparent',
  ':hover:enabled': {
    backgroundColor: $theme.colors.mono200,
  },
  ':active:enabled': {
    backgroundColor: $theme.colors.mono400,
  },
}));

export const ButtonLabel = styled('div');

export const EndEnhancer = styled('div', ({$theme}) => ({
  display: 'flex',
  marginLeft: $theme.sizing.scale500,
}));

export const StartEnhancer = styled('div', ({$theme}) => ({
  display: 'flex',
  marginRight: $theme.sizing.scale500,
}));
