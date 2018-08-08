/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import {styled} from '../../styles';
import {ADJOINED, SIZE, ENHANCER_POSITION} from './constants';

function getInputPadding(size, sizing) {
  return {
    [SIZE.default]: {
      paddingTop: sizing.scale400,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale400,
      paddingLeft: sizing.scale500,
    },
    [SIZE.compact]: {
      paddingTop: sizing.scale200,
      paddingRight: sizing.scale500,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale500,
    },
  }[size];
}

function getBorderRadius(adjoined, radius) {
  return {
    [ADJOINED.none]: radius,
    [ADJOINED.left]: `0 ${radius} ${radius} 0`,
    [ADJOINED.right]: `${radius} 0 0 ${radius}`,
    [ADJOINED.both]: '0',
  }[adjoined];
}

function getDecoratorBorderRadius(position, radius) {
  return {
    [ENHANCER_POSITION.start]: `${radius} 0 0 ${radius}`,
    [ENHANCER_POSITION.end]: `0 ${radius} ${radius} 0`,
  }[position];
}

function getFont(size, typography) {
  return {
    [SIZE.default]: typography.font300,
    [SIZE.compact]: typography.font200,
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
  const {$disabled, $theme: {colors, sizing, typography}} = props;
  return {
    ...typography.font350,
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

export const Caption = styled('div', props => {
  const {$error, $theme: {colors, sizing, typography}} = props;
  return {
    ...typography.font200,
    color:
      $error && typeof $error !== 'boolean'
        ? colors.negative400
        : colors.mono800,
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
    display: 'flex',
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
    $theme: {colors, sizing, typography, animation},
  } = props;
  return {
    ...getFont($size, typography),
    color: $disabled ? colors.mono600 : colors.mono1000,
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
        ? colors.negative400
        : $isFocused ? colors.primary400 : colors.mono200,
    borderRadius: getBorderRadius($adjoined, sizing.scale100),
    boxShadow: `0 2px 6px ${
      $disabled
        ? 'transparent'
        : $isFocused
          ? $error ? colors.shadowError : colors.shadowFocus
          : 'transparent'
    }`,
    transitionProperty: 'border, boxShadow, backgroundColor',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
  };
});

export const Input = styled('input', props => {
  const {
    $disabled,
    $error,
    $size,
    $theme: {colors, sizing, typography},
  } = props;
  return {
    ...getFont($size, typography),
    color: $disabled ? colors.mono600 : colors.mono1000,
    caretColor: $error ? colors.negative400 : colors.primary,
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
