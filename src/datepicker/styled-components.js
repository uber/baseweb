/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import getDayStateCode from './utils/day-state.js';
import type {SharedStylePropsT} from './types.js';

/**
 * Main component container element
 */
export const StyledInputWrapper = styled<SharedStylePropsT>('div', () => ({
  width: '100%',
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

export const StyledMonthContainer = styled('div', {display: 'flex'});

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
    return {
      marginBottom: $theme.sizing.scale600,
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      textAlign: $theme.direction === 'rtl' ? 'right' : 'left',
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

export const StyledMonthYearSelectButton = styled<{}>('button', props => {
  return {
    ...props.$theme.typography.font200,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    color: props.$theme.colors.calendarHeaderForeground,
    cursor: 'pointer',
    display: 'flex',
    ':focus': {
      backgroundColor: props.$theme.colors.calendarHeaderBackgroundActive,
    },
  };
});

export const StyledMonthYearSelectIconContainer = styled<{}>('span', props => {
  return {
    alignItems: 'center',
    display: 'flex',
    [props.$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: props
      .$theme.sizing.scale500,
  };
});

function getArrowBtnStyle({$theme, $disabled}) {
  return {
    boxSizing: 'border-box',
    color: $disabled
      ? $theme.colors.calendarHeaderForegroundDisabled
      : $theme.colors.calendarHeaderForeground,
    cursor: $disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    borderWidth: 0,
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
          backgroundColor: $theme.colors.calendarHeaderBackgroundActive,
          borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
          borderTopRightRadius: $theme.borders.surfaceBorderRadius,
          borderBottomRightRadius: $theme.borders.surfaceBorderRadius,
          borderBottomLeftRadius: $theme.borders.surfaceBorderRadius,
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

function generateDayStyles(defaultCode, defaultStyle) {
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

function getDayStyles(code, {colors}) {
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
  const dayStateStyle = {
    // highlighted date
    ...generateDayStyles('001000000000000', {
      color: colors.calendarDayForegroundPseudoSelected,
    }),
    // selected date
    ...generateDayStyles('000100000000000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // selected hightlighted date
    ...generateDayStyles('001100000000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
    }),
    // disabled date
    '010000000000000': {
      color: colors.calendarForegroundDisabled,
      ':after': {content: null},
    },
    // disabled highlighted date
    '011000000000000': {
      color: colors.calendarForegroundDisabled,
      ':after': {content: null},
    },
    // date outside of the currently displayed month (when peekNextMonth is true)
    '000000000000001': {
      color: colors.calendarForegroundDisabled,
    },
    // Range Datepicker
    // range: highlighted date outside of a selected range
    ...generateDayStyles('101000000000000', highlightedStyle),
    ...generateDayStyles('101010000000000', highlightedStyle),
    // range: selected date
    '100100000000000': {
      color: colors.calendarDayForegroundSelected,
      ':before': {content: null},
    },
    // range: selected highlighted date
    // when single date selected in a range
    ...generateDayStyles('101100000000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    }),
    // range: selected start and end dates are the same
    ...generateDayStyles('100111100000000', {
      color: colors.calendarDayForegroundSelected,
      ':before': {content: null},
    }),
    ...generateDayStyles('101111100000000', {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    }),
    // range: selected start date
    '100111000000000': {
      color: colors.calendarDayForegroundSelected,
    },
    '100111000000100': {
      color: colors.calendarDayForegroundSelected,
    },
    '100111000000010': {
      color: colors.calendarDayForegroundSelected,
      ':before': {
        content: null,
      },
    },
    // range: selected end date
    '100110100000000': {
      color: colors.calendarDayForegroundSelected,
      ':before': {left: null, right: '50%'},
    },
    '100110100000100': {
      color: colors.calendarDayForegroundSelected,
      ':before': {
        content: null,
      },
    },
    '100110100000010': {
      color: colors.calendarDayForegroundSelected,
      ':before': {left: null, right: '50%'},
    },
    // range: first selected date while a range is highlighted but no second date selected yet
    // highlighted range on the right from the selected
    ...generateDayStyles('100100001010000', {
      color: colors.calendarDayForegroundSelected,
    }),
    // highlighted range on the left from the selected
    ...generateDayStyles('100100001001000', {
      color: colors.calendarDayForegroundSelected,
      ':before': {left: null, right: '50%'},
    }),
    // range: second date in a range that is highlighted but not selected
    '101000001010000': {
      ':before': {left: null, right: '50%'},
    },
    '101000001010100': {
      ':before': {
        content: null,
      },
    },
    '101000001010010': {
      ':before': {left: null, right: '50%'},
    },
    '101000001001000': {},
    '101000001001100': {},
    '101000001001010': {
      ':before': {content: null},
    },
    // range: pseudo-selected date
    '100010010000000': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
      },
      ':after': {
        content: null,
      },
    },
    '100010010000100': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
        borderLeftWidth: '2px',
        borderLeftColor: colors.mono400,
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
      },
      ':after': {
        content: null,
      },
    },
    '100010010000010': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
        borderRightWidth: '2px',
        borderRightColor: colors.mono400,
        borderTopRightRadius: '100%',
        borderBottomRightRadius: '100%',
      },
      ':after': {
        content: null,
      },
    },
    // range: pseudo-highlighted date (in a range where only one date is
    // selected and second date is highlighed)
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
    '100000001100000': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
      },
      ':after': {
        content: null,
      },
    },
    '100000001100100': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
        borderLeftWidth: '2px',
        borderLeftColor: colors.mono400,
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
      },
      ':after': {
        content: null,
      },
    },
    '100000001100010': {
      color: colors.calendarDayForegroundPseudoSelected,
      ':before': {
        left: '0',
        width: '100%',
        borderRightWidth: '2px',
        borderRightColor: colors.mono400,
        borderTopRightRadius: '100%',
        borderBottomRightRadius: '100%',
      },
      ':after': {
        content: null,
      },
    },
    // highlighted start date in a range
    '101111000000000': {
      color: colors.calendarDayForegroundSelectedHighlighted,
    },
    '101111000000100': {
      color: colors.calendarDayForegroundSelectedHighlighted,
    },
    '101111000000010': {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    },
    // highlighted end date in a range
    '101110100000000': {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {left: null, right: '50%'},
    },
    '101110100000100': {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {content: null},
    },
    '101110100000010': {
      color: colors.calendarDayForegroundSelectedHighlighted,
      ':before': {left: null, right: '50%'},
    },
    // range: pseudo-selected date
    '101010010000000': {
      color: colors.calendarDayForegroundPseudoSelectedHighlighted,
      ':before': {left: '0', width: '100%'},
    },
    '101010010000100': {
      color: colors.calendarDayForegroundPseudoSelectedHighlighted,
    },
    '101010010000010': {
      color: colors.calendarDayForegroundPseudoSelectedHighlighted,
      ':before': {left: null, right: '50%'},
    },
  };
  return dayStateStyle[code] || defaultDayStyle;
}

function getEdgeDayBeforeStyle(code, firstChild, peekNextMonth) {
  const firstChildStyle = firstChild ? {content: 'none'} : {};
  const lastChildStyle = firstChild ? {} : {content: 'none'};
  const pseudoSelectedStyle = firstChild
    ? {
        borderLeftWidth: '2px',
        borderTopLeftRadius: '100%',
        borderBottomLeftRadius: '100%',
      }
    : {
        borderRightWidth: '2px',
        borderTopRightRadius: '100%',
        borderBottomRightRadius: '100%',
      };
  // See the ./utils/day-state.js file for the description of all available states
  // rdhsrSsDeDpSrHpHrRrLsMeMoM
  // '0000000000000000'
  return (
    {
      // selected - hasRangeSelected - startDate
      '100111000000000': lastChildStyle,
      // selected - hasRangeSelected - endDate
      '100110100000000': firstChildStyle,
      // selected and hasRangeHighlighted on the right from a selected date
      '100100001010000': lastChildStyle,
      // selected and hasRangeHighlighted on the left from a selected date
      '100100001001000': firstChildStyle,
      // only one date selected in a range
      // '100100000000000': {content: 'none'},
      // pseudo-selected date
      '100010010000000': pseudoSelectedStyle,
      '100010010000100': pseudoSelectedStyle,
      '100010010000010': pseudoSelectedStyle,
      // pseudo-highlighted date
      '100000001100000': pseudoSelectedStyle,
      '100000001100100': pseudoSelectedStyle,
      '100000001100010': pseudoSelectedStyle,
      // highlighted date and hasRangeHighlighted on the right from a selected date
      '101000001010000': firstChildStyle,
      // highlighted date and hasRangeHighlighted on the left from a selected date
      '101000001001000': lastChildStyle,
      // highlighted pseudo-selected date
      '101010010000000': pseudoSelectedStyle,
      // highlighted pseudo-selected date that is first day of the month
      '101010010000100':
        !peekNextMonth && !firstChild ? {content: 'none'} : pseudoSelectedStyle,
      // highlighted pseudo-selected date that is last day of the month
      '101010010000010':
        !peekNextMonth && firstChild ? {content: 'none'} : pseudoSelectedStyle,
    }[code] || {}
  );
}

export const StyledDay = styled<SharedStylePropsT>('div', props => {
  const {
    $disabled,
    $isHovered,
    $isHighlighted,
    $peekNextMonth,
    $pseudoHighlighted,
    $pseudoSelected,
    $range,
    $selected,
    $theme: {colors, sizing},
  } = props;
  const code = getDayStateCode(props);
  return ({
    boxSizing: 'border-box',
    position: 'relative',
    cursor: $disabled ? 'default' : 'pointer',
    color: colors.calendarForeground,
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
      backgroundColor: $selected
        ? $isHighlighted
          ? colors.calendarDayBackgroundSelectedHighlighted
          : colors.calendarDayBackgroundSelected
        : $pseudoSelected
        ? $isHighlighted
          ? colors.calendarDayBackgroundPseudoSelectedHighlighted
          : 'transparent'
        : $isHovered || $isHighlighted || $pseudoHighlighted
        ? colors.mono200
        : 'transparent',
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      paddingTop: sizing.scale200,
      paddingBottom: sizing.scale200,
      paddingLeft: sizing.scale200,
      paddingRight: sizing.scale200,
      borderWidth: '2px',
      borderStyle: 'solid',
      borderTopColor: colors.mono400,
      borderBottomColor: colors.mono400,
      borderRightColor: colors.mono400,
      borderLeftColor: colors.mono400,
      borderTopLeftRadius: '100%',
      borderTopRightRadius: '100%',
      borderBottomLeftRadius: '100%',
      borderBottomRightRadius: '100%',
      ...(getDayStyles(code, props.$theme)[':after'] || {}),
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
            backgroundColor: colors.mono200,
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
            borderTopColor: colors.mono400,
            borderBottomColor: colors.mono400,
            borderLeftColor: colors.mono400,
            borderRightColor: colors.mono400,
            ...(getDayStyles(code, props.$theme)[':before'] || {}),
          },
        }
      : {}),
    ':first-child': {
      ...($range
        ? {
            ':before': {
              ...getEdgeDayBeforeStyle(code, true, $peekNextMonth),
            },
          }
        : {}),
    },
    ':last-child': {
      ...($range
        ? {
            ':before': {
              // ...getEdgeBeforeStyles(props, false),
              ...getEdgeDayBeforeStyle(code, false, $peekNextMonth),
            },
          }
        : {}),
    },
  }: {});
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
