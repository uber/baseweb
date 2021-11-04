/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import getDayStateCode from './utils/day-state.js';
import type {SharedStylePropsT, CalendarPropsT} from './types.js';
import {ORIENTATION} from './constants.js';

/**
 * Main component container element
 */
export const StyledInputWrapper = styled<{
  ...SharedStylePropsT,
  $separateRangeInputs: boolean,
}>('div', props => {
  const {$separateRangeInputs} = props;

  return {
    width: '100%',
    ...($separateRangeInputs
      ? {display: 'flex', justifyContent: 'center'}
      : {}),
  };
});

export const StyledInputLabel = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.LabelMedium,
  marginBottom: $theme.sizing.scale300,
}));

/**
 * Main component container element
 */
export const StyledRoot = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {typography, colors, borders},
  } = props;
  return {
    ...typography.font200,
    color: colors.calendarForeground,
    backgroundColor: colors.calendarBackground,
    textAlign: 'center',
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: borders.surfaceBorderRadius,
    borderBottomLeftRadius: borders.surfaceBorderRadius,
    display: 'inline-block',
  };
});

export const StyledMonthContainer = styled<{
  $orientation: $PropertyType<CalendarPropsT<Date>, 'orientation'>,
}>('div', props => {
  const {$orientation} = props;
  return {
    display: 'flex',
    flexDirection: $orientation === ORIENTATION.vertical ? 'column' : 'row',
  };
});

export const StyledCalendarContainer = styled<SharedStylePropsT>(
  'div',
  props => {
    const {
      $theme: {sizing},
    } = props;
    return {
      paddingTop: sizing.scale400,
      paddingBottom: sizing.scale500,
      paddingLeft: sizing.scale600,
      paddingRight: sizing.scale600,
    };
  },
);

export const StyledSelectorContainer = styled<SharedStylePropsT>(
  'div',
  ({$theme}) => {
    const textAlign = $theme.direction === 'rtl' ? 'right' : 'left';
    return {
      marginBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      textAlign,
    };
  },
);

export const StyledCalendarHeader = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {borders, colors, sizing},
  } = props;
  return {
    color: colors.calendarHeaderForeground,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: sizing.scale600,
    paddingRight: sizing.scale600,
    backgroundColor: colors.calendarHeaderBackground,
    borderTopLeftRadius: borders.surfaceBorderRadius,
    borderTopRightRadius: borders.surfaceBorderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    // account for the left/right arrow heights
    minHeight: `calc(${sizing.scale800} + ${sizing.scale0})`,
  };
});

export const StyledMonthHeader = styled<SharedStylePropsT>('div', props => {
  return {
    color: props.$theme.colors.calendarHeaderForeground,
    backgroundColor: props.$theme.colors.calendarHeaderBackground,
    whiteSpace: 'nowrap',
  };
});

export const StyledMonthYearSelectButton = styled<{$isFocusVisible: boolean}>(
  'button',
  props => {
    return {
      ...props.$theme.typography.font200,
      alignItems: 'center',
      backgroundColor: 'transparent',
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      color: props.$theme.colors.calendarHeaderForeground,
      cursor: 'pointer',
      display: 'flex',
      outline: 'none',
      ':focus': {
        boxShadow: props.$isFocusVisible
          ? `0 0 0 3px ${props.$theme.colors.accent}`
          : 'none',
      },
    };
  },
);

export const StyledMonthYearSelectIconContainer = styled<{}>('span', props => {
  const marginDirection: string =
    props.$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    alignItems: 'center',
    display: 'flex',
    [marginDirection]: props.$theme.sizing.scale500,
  };
});

function getArrowBtnStyle({$theme, $disabled, $isFocusVisible}) {
  return {
    boxSizing: 'border-box',
    color: $disabled
      ? $theme.colors.calendarHeaderForegroundDisabled
      : $theme.colors.calendarHeaderForeground,
    cursor: $disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
    marginLeft: '6px',
    marginRight: '6px',
    marginBottom: 0,
    marginTop: 0,
    outline: 'none',
    ':focus': $disabled
      ? {}
      : {
          boxShadow: $isFocusVisible
            ? `0 0 0 3px ${$theme.colors.accent}`
            : 'none',
        },
  };
}

export const StyledPrevButton = styled<SharedStylePropsT>(
  'button',
  getArrowBtnStyle,
);

export const StyledNextButton = styled<SharedStylePropsT>(
  'button',
  getArrowBtnStyle,
);

export const StyledMonth = styled<SharedStylePropsT>(
  'div',
  (props: SharedStylePropsT) => {
    return {
      display: 'inline-block',
    };
  },
);

export const StyledWeek = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return {
    whiteSpace: 'nowrap',
    display: 'flex',
    marginBottom: sizing.scale100,
  };
});

function generateDayStyles(defaultCode: string, defaultStyle) {
  const codeForSM =
    defaultCode.substr(0, 12) + '1' + defaultCode.substr(12 + 1);
  const codeForEM =
    defaultCode.substr(0, 13) + '1' + defaultCode.substr(13 + 1);
  return {
    [defaultCode]: defaultStyle,
    [codeForSM]: defaultStyle,
    [codeForEM]: defaultStyle,
  };
}

// eslint-disable-next-line flowtype/no-weak-types
function getDayStyles(code, {colors}): any {
  const undefinedDayStyle = {
    ':before': {content: null},
    ':after': {content: null},
  };
  let defaultDayStyle = undefinedDayStyle;
  const disabledDateStyle = {
    color: colors.calendarForegroundDisabled,
    ':before': {content: null},
    ':after': {content: null},
  };
  const outsideMonthDateStyle = {
    color: colors.calendarForegroundDisabled,
    ':before': {
      borderTopStyle: 'none',
      borderBottomStyle: 'none',
      borderLeftStyle: 'none',
      borderRightStyle: 'none',
      backgroundColor: 'transparent',
    },
    ':after': {
      borderTopLeftRadius: '0%',
      borderTopRightRadius: '0%',
      borderBottomLeftRadius: '0%',
      borderBottomRightRadius: '0%',
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: 'transparent',
    },
  };
  const highlightedStyle = {
    ':before': {content: null},
  };
  const CODE_DISABLED_INDEX = 1;
  if (code && code[CODE_DISABLED_INDEX] === '1') {
    defaultDayStyle = disabledDateStyle;
  }
  // See the ./utils/day-state.js file for the description of all available states
  // rdhsrSsDeDpSrHpHrRrLsMeMoM
  // '000000000000000'
  const dayStateStyle = Object.assign(
    {},
    // highlighted date
    generateDayStyles('001000000000000', {
      color: colors.calendarDayForegroundPseudoSelected,
    }),
    // selected date
    generateDayStyles('000100000000000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // selected highlighted date
    generateDayStyles('001100000000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
    }),
    // disabled date
    {
      '010000000000000': {
        color: colors.calendarForegroundDisabled,
        ':after': {content: null},
      },
    },
    // disabled highlighted date
    {
      '011000000000000': {
        color: colors.calendarForegroundDisabled,
        ':after': {content: null},
      },
    },
    // date outside of the currently displayed month (when peekNextMonth is true)
    generateDayStyles('000000000000001', outsideMonthDateStyle),
    // Range Datepicker
    // range: highlighted date outside of a selected range
    generateDayStyles('101000000000000', highlightedStyle),
    generateDayStyles('101010000000000', highlightedStyle),
    // range: selected date
    generateDayStyles('100100000000000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // range: selected highlighted date
    // when single date selected in a range
    generateDayStyles('101100000000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    }),
    // range: selected start and end dates are the same
    generateDayStyles('100111100000000', {
      color: colors.calendarDayForegroundSelected,
      ':before': {content: null},
    }),
    generateDayStyles('101111100000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    }),
    // range: selected start date
    generateDayStyles('100111000000000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // range: selected end date
    generateDayStyles('100110100000000', {
      color: colors.calendarDayForegroundSelected,
      ':before': {left: null, right: '50%'},
    }),
    // range: first selected date while a range is highlighted but no second date selected yet
    // highlighted range on the right from the selected
    generateDayStyles('100100001010000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // highlighted range on the left from the selected
    generateDayStyles('100100001001000', {
      color: colors.calendarDayForegroundSelected,
      ':before': {left: null, right: '50%'},
    }),
    // range: second date in a range that is highlighted but not selected
    generateDayStyles('101000001010000', {
      ':before': {left: null, right: '50%'},
    }),
    {'101000001001000': {}},
    {'101000001001100': {}},
    {'101000001001010': {}},
    // range: pseudo-selected date
    generateDayStyles('100010010000000', {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {left: '0', width: '100%'},
      ':after': {content: null},
    }),
    // range: pseudo-highlighted date (in a range where only one date is
    // selected and second date is highlighted)
    {
      '101000001100000': {
        color: colors.calendarDayForegroundPseudoSelected,
        ':before': {
          left: '0',
          width: '100%',
        },
        ':after': {
          content: null,
        },
      },
    },
    generateDayStyles('100000001100000', {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
      },
      ':after': {
        content: null,
      },
    }),
    // highlighted start date in a range
    generateDayStyles('101111000000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
    }),
    // highlighted end date in a range
    generateDayStyles('101110100000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {left: null, right: '50%'},
    }),
    // range: pseudo-selected date
    generateDayStyles('101010010000000', {
      color: colors.calendarDayForegroundPseudoSelectedHighlighted,
      ':before': {left: '0', width: '100%'},
    }),
    // Range is true Date outside current month (when peekNextMonth is true)
    generateDayStyles('100000000000001', outsideMonthDateStyle),
    // peekNextMonth is true, date is outside month, start date is selected and range is highlighted is on right
    generateDayStyles('100000001010001', outsideMonthDateStyle),
    // peekNextMonth is true, date is outside month, start date is selected and range is highlighted is on left
    generateDayStyles('100000001001001', outsideMonthDateStyle),
    // peekNextMonth is true, date is outside month, range is selected
    generateDayStyles('100010000000001', outsideMonthDateStyle),
  );
  return dayStateStyle[code] || defaultDayStyle;
}

export const StyledDay = styled<SharedStylePropsT>('div', props => {
  const {
    $disabled,
    $isFocusVisible,
    $isHighlighted,
    $peekNextMonth,
    $pseudoSelected,
    $range,
    $selected,
    $outsideMonth,
    $outsideMonthWithinRange,
    $hasDateLabel,
    $theme: {colors, sizing},
  } = props;
  const code = getDayStateCode(props);
  return ({
    boxSizing: 'border-box',
    position: 'relative',
    cursor:
      $disabled || (!$peekNextMonth && $outsideMonth) ? 'default' : 'pointer',
    color: colors.calendarForeground,
    display: 'inline-block',
    width: sizing.scale1000,
    height: $hasDateLabel ? '60px' : sizing.scale1000,
    lineHeight: sizing.scale800,
    textAlign: 'center',
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale200,
    paddingRight: sizing.scale200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    outline: 'none',
    backgroundColor: 'transparent',
    // `transform` creates a stacking context so
    // a z-index used on its' children doesn't
    // interfere with anything outside the component
    transform: 'scale(1)',
    ...getDayStyles(code, props.$theme),
    // :after pseudo element defines the selected
    // or highlighted day's circle styles
    ':after': {
      zIndex: -1,
      content: '""',
      boxSizing: 'border-box',
      display: 'inline-block',
      boxShadow: $isFocusVisible ? `0 0 0 3px ${colors.accent}` : 'none',
      backgroundColor: $selected
        ? colors.calendarDayBackgroundSelectedHighlighted
        : $pseudoSelected && $isHighlighted
        ? colors.calendarDayBackgroundPseudoSelectedHighlighted
        : colors.calendarBackground,
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopWidth: '2px',
      borderBottomWidth: '2px',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderTopColor: colors.borderSelected,
      borderBottomColor: colors.borderSelected,
      borderRightColor: colors.borderSelected,
      borderLeftColor: colors.borderSelected,
      borderTopLeftRadius: $hasDateLabel ? sizing.scale700 : '100%',
      borderTopRightRadius: $hasDateLabel ? sizing.scale700 : '100%',
      borderBottomLeftRadius: $hasDateLabel ? sizing.scale700 : '100%',
      borderBottomRightRadius: $hasDateLabel ? sizing.scale700 : '100%',
      ...(getDayStyles(code, props.$theme)[':after'] || {}),
      ...($outsideMonthWithinRange ? {content: null} : {}),
    },
    ...($range
      ? {
          // :before pseudo element defines a grey background style that extends
          // the selected/highlighted day's circle and spans through a range
          ':before': {
            zIndex: -1,
            content: '""',
            boxSizing: 'border-box',
            display: 'inline-block',
            backgroundColor: colors.mono300,
            position: 'absolute',
            height: '100%',
            width: '50%',
            top: 0,
            left: '50%',
            borderTopWidth: '2px',
            borderBottomWidth: '2px',
            borderLeftWidth: '0',
            borderRightWidth: '0',
            borderTopStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftStyle: 'solid',
            borderRightStyle: 'solid',
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            ...(getDayStyles(code, props.$theme)[':before'] || {}),
            ...($outsideMonthWithinRange
              ? {
                  backgroundColor: colors.mono300,
                  left: '0',
                  width: '100%',
                  content: '""',
                }
              : {}),
          },
        }
      : // a hack to make flow happy, otherwise it complains about complexity
        // eslint-disable-next-line flowtype/no-weak-types
        ({}: any)),
  }: {});
});

export const StyledDayLabel = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {typography, colors},
    $selected,
  } = props;
  return {
    ...typography.ParagraphXSmall,
    color: $selected ? colors.contentInverseTertiary : colors.contentTertiary,
  };
});

export const StyledWeekdayHeader = styled<SharedStylePropsT>('div', props => {
  const {
    $theme: {sizing},
  } = props;
  return ({
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'default',
    display: 'inline-block',
    width: sizing.scale1000,
    height: sizing.scale1000,
    lineHeight: sizing.scale800,
    textAlign: 'center',
    paddingTop: sizing.scale300,
    paddingBottom: sizing.scale300,
    paddingLeft: sizing.scale200,
    paddingRight: sizing.scale200,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    color: 'inherit',
    backgroundColor: 'transparent',
  }: {});
});
