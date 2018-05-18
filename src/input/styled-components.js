import {styled} from '../styles';

function getBorderRadius(adjoined, radius) {
  return {
    none: radius,
    left: `0 ${radius} ${radius} 0`,
    right: `${radius} 0 0 ${radius}`,
    both: '0',
  }[adjoined];
}

function getInputPadding(size, sizing) {
  return {
    default: {
      paddingTop: sizing.scale400,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale400,
      paddingLeft: sizing.scale500,
    },
    compact: {
      paddingTop: sizing.scale200,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale500,
    },
  }[size];
}

function getInputFont(size, typography) {
  return {
    default: typography.font400,
    compact: typography.font300,
  }[size];
}

export const Root = styled('div', props => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $size,
    theme: {colors, sizing, typography},
  } = props;
  return {
    ...getInputFont($size, typography),
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
    backgroundColor: $disabled
      ? colors.mono300
      : $isFocused || $error ? colors.mono100 : colors.mono200,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: $disabled
      ? colors.mono300
      : $error
        ? colors.alert400
        : $isFocused ? colors.primary300 : colors.mono200,
    borderRadius: getBorderRadius($adjoined, sizing.scale100),
    boxShadow: `0 0 ${sizing.scale100} ${
      $disabled
        ? 'transparent'
        : $error
          ? colors.shadowError
          : $isFocused ? colors.shadowFocus : 'transparent'
    }`,
  };
});

export const Input = styled('input', props => {
  const {$disabled, $size, theme: {colors, sizing, typography}} = props;
  return {
    ...getInputFont($size, typography),
    // TODO: Add 14/20 font option to theme?
    lineHeight: '20px',
    color: colors.mono1000,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    borderWidth: '0',
    borderStyle: 'none',
    outline: 'none',
    ...getInputPadding($size, sizing),
    width: '100%',
    '::placeholder': {
      color: $disabled ? colors.mono600 : colors.mono700,
    },
  };
});
