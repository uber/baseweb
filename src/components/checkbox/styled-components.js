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

function getBorderColor(props) {
  const {$disabled, $checked, $isError, $isIndeterminate, $theme} = props;
  const {colors} = $theme;
  if ($disabled) {
    return colors.mono300;
  } else if ($checked || $isIndeterminate) {
    return 'transparent';
  } else if ($isError) {
    return colors.negative400;
  } else {
    return colors.mono700;
  }
}

function getLabelPadding(props) {
  const {$labelPlacement = '', $theme} = props;
  const {sizing} = $theme;
  const {scale200} = sizing;
  const paddingSide =
    'padding' + $labelPlacement.replace(/^\w/, c => c.toUpperCase());
  return {
    [paddingSide]: scale200,
  };
}

function getBackgroundColor(props) {
  const {
    $disabled,
    $checked,
    $isIndeterminate,
    $isFocused,
    $isError,
    $isHovered,
    $isActive,
    $theme,
  } = props;
  const {colors} = $theme;
  if ($disabled) {
    return colors.mono300;
  } else if ($isError && ($isIndeterminate || $checked)) {
    if ($isActive || $isFocused) {
      return colors.negative600;
    } else if ($isHovered) {
      return colors.negative500;
    } else {
      return colors.negative400;
    }
  } else if ($isError) {
    if ($isActive || $isFocused) {
      return colors.negative200;
    } else if ($isHovered) {
      return colors.negative100;
    } else {
      return colors.negative50;
    }
  } else if ($isIndeterminate || $checked) {
    if ($isActive || $isFocused) {
      return colors.primary600;
    } else if ($isHovered) {
      return colors.primary500;
    } else {
      return colors.primary400;
    }
  } else {
    if ($isActive || $isFocused) {
      return colors.mono500;
    } else if ($isHovered) {
      return colors.mono400;
    } else {
      return 'transparent';
    }
  }
}

function getCheckBackgroundColor(props) {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return $disabled ? colors.mono600 : colors.mono100;
}

function getLabelColor(props) {
  const {$disabled, $theme} = props;
  const {colors} = $theme;
  return $disabled ? colors.mono600 : colors.mono1000;
}

export const Root = styled('label', props => {
  const {$disabled, $labelPlacement} = props;
  return {
    flexDirection:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'column'
        : 'row',
    display: 'flex',
    alignItems:
      $labelPlacement === 'top' || $labelPlacement === 'bottom'
        ? 'center'
        : 'flex-start',
    cursor: $disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
  };
});

export const Checkmark = styled('span', props => {
  const {$checked, $isIndeterminate, $theme} = props;
  const {sizing, animation} = $theme;
  return {
    flex: '0 0 auto',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    width: sizing.scale600,
    height: sizing.scale600,
    left: '4px',
    top: '4px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: getBorderColor(props),
    borderRadius: $theme.borders.useRoundedCorners
      ? $theme.borders.radius200
      : null,
    display: 'inline-block',
    verticalAlign: 'middle',
    backgroundImage: $isIndeterminate
      ? `url('data:image/svg+xml;utf8,<svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="-1" x2="11" y2="-1" transform="translate(0 2)" stroke="${getCheckBackgroundColor(
          props,
        )}" stroke-width="2" stroke-linecap="round"/></svg>');`
      : $checked
        ? `url('data:image/svg+xml;utf8,<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.6 0.200059C11.0418 0.53143 11.1314 1.15823 10.8 1.60006L4.8 9.60006C4.62607 9.83197 4.36005 9.97699 4.07089 9.99754C3.78173 10.0181 3.49788 9.91215 3.29289 9.70717L0.292893 6.70717C-0.0976311 6.31664 -0.0976311 5.68348 0.292893 5.29295C0.683417 4.90243 1.31658 4.90243 1.70711 5.29295L3.89181 7.47765L9.2 0.400059C9.53137 -0.0417689 10.1582 -0.131312 10.6 0.200059Z" fill="${getCheckBackgroundColor(
            props,
          )}"/></svg>');`
        : null,
    backgroundColor: getBackgroundColor(props),
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginTop: $theme.sizing.scale0,
    marginBottom: $theme.sizing.scale0,
    marginLeft: $theme.sizing.scale200,
    marginRight: $theme.sizing.scale200,
  };
});

export const Label = styled('div', props => {
  const {$theme} = props;
  const {typography} = $theme;
  return {
    verticalAlign: 'middle',
    ...getLabelPadding(props),
    color: getLabelColor(props),
    ...typography.font350,
  };
});
// tricky style for focus event cause display: none doesn't work
export const Input = styled('input', {
  opacity: 0,
  width: 0,
  height: 0,
  overflow: 'hidden',
  margin: 0,
  padding: 0,
});
