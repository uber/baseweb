/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {ArrowLeft, ArrowRight} from '../icon/index.js';
import {Select} from '../select/index.js';
import {LocaleContext} from '../locale/index.js';
import {
  StyledCalendarHeader,
  StyledPrevButton,
  StyledNextButton,
  StyledMonthHeader,
  StyledDay,
} from './styled-components.js';
import {
  addDays,
  addMonths,
  getMonth,
  getMonthInLocale,
  getStartOfWeek,
  getWeekdayMinInLocale,
  getYear,
  isAfter,
  isBefore,
  monthDisabledBefore,
  monthDisabledAfter,
  setMonth,
  setYear,
  subMonths,
} from './utils/index.js';
import {WEEKDAYS} from './constants.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import type {HeaderPropsT} from './types.js';
import type {SharedStylePropsT} from '../select/types.js';
import type {LocaleT} from '../locale/types.js';

const navBtnStyle = ({$theme}) => ({
  cursor: 'pointer',
});

const MIN_YEAR = 1980;
const MAX_YEAR = 2030;

function yearMonthToId(year, month) {
  return `${year}-${month}`;
}

function idToYearMonth(id) {
  return id.split('-').map(Number);
}

export default class CalendarHeader extends React.Component<HeaderPropsT> {
  static defaultProps = {
    date: new Date(),
    locale: null,
    maxDate: null,
    minDate: null,
    onYearChange: () => {},
    overrides: {},
  };

  handleMonthChange = ({value}: {value: Array<{id: number}>}) => {
    if (this.props.onMonthChange) {
      // $FlowFixMe
      this.props.onMonthChange({date: setMonth(this.props.date, value[0].id)});
    }
  };

  handleYearChange = ({value}: {value: Array<{id: number}>}) => {
    if (this.props.onYearChange) {
      // $FlowFixMe
      this.props.onYearChange({date: setYear(this.props.date, value[0].id)});
    }
  };

  increaseMonth = () => {
    if (this.props.onMonthChange) {
      // $FlowFixMe
      this.props.onMonthChange({date: addMonths(this.props.date, 1)});
    }
  };

  decreaseMonth = () => {
    if (this.props.onMonthChange) {
      // $FlowFixMe
      this.props.onMonthChange({date: subMonths(this.props.date, 1)});
    }
  };

  renderPreviousMonthButton = ({locale}: {locale: LocaleT}) => {
    const {date, overrides = {}} = this.props;
    const allPrevDaysDisabled = monthDisabledBefore(date, this.props);

    let isDisabled = false;
    if (allPrevDaysDisabled) {
      isDisabled = true;
    }
    const nextMonth = subMonths(date, 1);
    if (this.props.minDate) {
      if (isBefore(nextMonth, this.props.minDate)) {
        isDisabled = true;
      }
    } else {
      if (getYear(nextMonth) < MIN_YEAR) {
        isDisabled = true;
      }
    }

    const [PrevButton, prevButtonProps] = getOverrides(
      overrides.PrevButton,
      StyledPrevButton,
    );
    const [PrevButtonIcon, prevButtonIconProps] = getOverrides(
      overrides.PrevButtonIcon,
      ArrowLeft,
    );
    let clickHandler = this.decreaseMonth;
    if (allPrevDaysDisabled) {
      clickHandler = null;
    }
    return (
      <PrevButton
        aria-label={locale.datepicker.previousMonth}
        tabIndex={0}
        onClick={clickHandler}
        disabled={isDisabled}
        $disabled={isDisabled}
        {...prevButtonProps}
      >
        <PrevButtonIcon
          overrides={{
            Svg: {
              style: navBtnStyle,
            },
          }}
          {...prevButtonIconProps}
        />
      </PrevButton>
    );
  };

  renderNextMonthButton = ({locale}: {locale: LocaleT}) => {
    const {date, overrides = {}} = this.props;
    const allNextDaysDisabled = monthDisabledAfter(date, this.props);

    let isDisabled = false;
    if (allNextDaysDisabled) {
      isDisabled = true;
    }
    const nextMonth = addMonths(date, 1);
    if (this.props.maxDate) {
      if (isAfter(nextMonth, this.props.maxDate)) {
        isDisabled = true;
      }
    } else {
      if (getYear(nextMonth) > MAX_YEAR) {
        isDisabled = true;
      }
    }

    const [NextButton, nextButtonProps] = getOverrides(
      overrides.NextButton,
      StyledNextButton,
    );
    const [NextButtonIcon, nextButtonIconProps] = getOverrides(
      overrides.NextButtonIcon,
      ArrowRight,
    );

    let clickHandler = this.increaseMonth;
    // The other option is to always provide a click handler and let customers
    // override its functionality based on the `$allPrevDaysDisabled` prop
    // in a custom NextButton component override
    // Their options would be to render `null` or not apply the components handler
    // on click or do nothing
    if (allNextDaysDisabled) {
      clickHandler = null;
    }
    return (
      <NextButton
        aria-label={locale.datepicker.nextMonth}
        tabIndex={0}
        onClick={clickHandler}
        disabled={isDisabled}
        $disabled={isDisabled}
        {...nextButtonProps}
      >
        <NextButtonIcon
          overrides={{Svg: {style: navBtnStyle}}}
          {...nextButtonIconProps}
        />
      </NextButton>
    );
  };

  getSelectOverrides({width}: {width: string}) {
    return {
      ControlContainer: {
        style: (props: SharedStylePropsT) => {
          const {
            $isFocused,
            $isPseudoFocused,
            $theme: {colors},
          } = props;
          return {
            width,
            backgroundColor:
              $isFocused || $isPseudoFocused
                ? colors.primary500
                : colors.primary,
            color: colors.white,
            borderColor: 'transparent',
          };
        },
      },
      IconsContainer: {
        style: {
          paddingRight: '0',
        },
      },
      SelectArrow: {
        style: ({$theme: {colors}}: SharedStylePropsT) => ({
          color: 'inherit',
        }),
      },
      ValueContainer: {
        style: ({$theme: {sizing}}: SharedStylePropsT) => ({
          paddingTop: '0',
          paddingBottom: '0',
          paddingLeft: sizing.scale200,
          paddingRight: '0',
        }),
      },
      SingleValue: {
        style: ({$theme: {sizing}}: SharedStylePropsT) => ({
          paddingTop: '0',
          paddingBottom: '0',
          paddingLeft: sizing.scale200,
          paddingRight: '0',
        }),
      },
      DropdownContainer: {
        style: {
          paddingTop: '0',
          paddingBottom: '0',
          paddingLeft: '0',
          paddingRight: '0',
        },
      },
    };
  }

  renderMonthYearDropdown = () => {
    const {date, locale, maxDate, minDate, overrides = {}} = this.props;

    const [MonthYearSelect, monthYearSelectProps] = getOverrides(
      overrides.MonthYearSelect,
      Select,
    );
    const selectOverrides = mergeOverrides(
      this.getSelectOverrides({width: '160px'}),
      // $FlowFixMe
      monthYearSelectProps && monthYearSelectProps.overrides,
    );

    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const maxYear = maxDate ? getYear(maxDate) : MAX_YEAR;
    const minYear = minDate ? getYear(minDate) : MIN_YEAR;
    const options = [];
    for (let i = minYear; i <= maxYear; i++) {
      MONTHS.forEach(month => {
        options.push({
          id: yearMonthToId(i, month),
          label: `${getMonthInLocale(month, locale)} ${i}`,
        });
      });
    }

    return (
      <MonthYearSelect
        clearable={false}
        maxDropdownHeight="300px"
        options={options}
        searchable={false}
        value={[{id: yearMonthToId(getYear(date), getMonth(date))}]}
        {...monthYearSelectProps}
        // Adding event handlers after customers overrides in order to
        // make sure the components functions as expected
        // We can extract the handlers from props overrides
        // and call it along with internal handlers by creating an inline handle
        onChange={params => {
          if (params.value && params.value[0].id) {
            const [year, month] = idToYearMonth(String(params.value[0].id));
            date.setFullYear(year, month);
            this.props.onMonthChange && this.props.onMonthChange({date});
            this.props.onYearChange && this.props.onYearChange({date});
          }
        }}
        // internal and incoming overrides are merged above
        overrides={selectOverrides}
      />
    );
  };

  render() {
    const {overrides = {}} = this.props;
    const [CalendarHeader, calendarHeaderProps] = getOverrides(
      overrides.CalendarHeader,
      StyledCalendarHeader,
    );
    const [MonthHeader, monthHeaderProps] = getOverrides(
      overrides.MonthHeader,
      StyledMonthHeader,
    );
    const [WeekdayHeader, weekdayHeaderProps] = getOverrides(
      overrides.WeekdayHeader,
      StyledDay,
    );

    const startOfWeek = getStartOfWeek(this.props.date, this.props.locale);
    return (
      <LocaleContext.Consumer>
        {locale => (
          <>
            <CalendarHeader {...calendarHeaderProps}>
              {this.renderPreviousMonthButton({locale})}
              {this.renderMonthYearDropdown()}
              {this.renderNextMonthButton({locale})}
            </CalendarHeader>
            <MonthHeader role="presentation" {...monthHeaderProps}>
              {WEEKDAYS.map(offset => {
                const day = addDays(startOfWeek, offset);
                return (
                  <WeekdayHeader $isHeader key={offset} {...weekdayHeaderProps}>
                    {getWeekdayMinInLocale(day, this.props.locale)}
                  </WeekdayHeader>
                );
              })}
            </MonthHeader>
          </>
        )}
      </LocaleContext.Consumer>
    );
  }
}
