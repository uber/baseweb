import {styled} from '../styles';

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

function getBorderRadius(adjoined, radius) {
  return {
    none: radius,
    left: `0 ${radius} ${radius} 0`,
    right: `${radius} 0 0 ${radius}`,
    both: '0',
  }[adjoined];
}

function getDecoratorBorderRadius(position, radius) {
  return {
    start: `${radius} 0 0 ${radius}`,
    end: `0 ${radius} ${radius} 0`,
  }[position];
}

function getFont(size, typography) {
  return {
    default: typography.font400,
    compact: typography.font300,
  }[size];
}

export const Root = styled('div', props => {
  const {$size, $theme: {colors, typography}} = props;
  return {
    ...getFont($size, typography),
    color: colors.mono1000,
    display: 'flex',
    width: '100%',
  };
});

export const Label = styled('label', props => {
  const {$size, $disabled, $theme: {colors, sizing, typography}} = props;
  return {
    ...getFont($size, typography),
    fontWeight: 500,
    color: $disabled ? colors.mono700 : colors.mono1000,
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

export const Caption = styled('p', props => {
  const {$size, $error, $theme: {colors, sizing, typography}} = props;
  return {
    ...getFont($size, typography),
    color: $error ? colors.alert400 : colors.mono800,
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

export const InputEnhancer = styled('div', props => {
  const {$position, $size, $theme: {colors, sizing, typography}} = props;
  return {
    ...getFont($size, typography),
    color: colors.mono900,
    ...getInputPadding($size, sizing),
    backgroundColor: colors.mono400,
    borderRadius: getDecoratorBorderRadius($position, sizing.scale100),
  };
});

export const InputContainer = styled('div', props => {
  const {
    $isFocused,
    $adjoined,
    $error,
    $disabled,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...getFont($size, typography),
    color: colors.mono1000,
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
  const {$disabled, $size, $theme: {colors, sizing, typography}} = props;
  return {
    ...getFont($size, typography),
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
    ':hover': {
      cursor: $disabled ? 'not-allowed' : 'text',
    },
  };
});
