/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import ChevronRight from '../icon/chevron-right';
import ChevronLeft from '../icon/chevron-left';
import ChevronDown from '../icon/chevron-down';
import dateFnsAdapter from './utils/date-fns-adapter';
import DateHelpers from './utils/date-helpers';
import { getFilteredMonthItems } from './utils/calendar-header-helpers';
import { StatefulMenu } from '../menu';
import { Popover } from '../popover';
import { LocaleContext } from '../locale';
import { ThemeContext } from '../styles/theme-provider';
import {
  StyledCalendarHeader,
  StyledMonthHeader,
  StyledMonthYearSelectButton,
  StyledMonthYearSelectIconContainer,
  StyledNextButton,
  StyledPrevButton,
  StyledWeekdayHeader,
} from './styled-components';
import { DENSITY, ORIENTATION, WEEKDAYS } from './constants';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import type { HeaderProps } from './types';
import type { Locale } from '../locale';
import type { Theme } from '../styles/types';
import { forkBlur, forkFocus, isFocusVisible } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
const navBtnStyle = ({ $theme }) => ({
  cursor: 'pointer',
});

const MIN_YEAR = 2000;
const MAX_YEAR = 2030;
const MIN_MONTH = 0;
const MAX_MONTH = 11;

const DIRECTION = {
  NEXT: 'next',
  PREVIOUS: 'previous',
} as const;

// @ts-ignore
function idToYearMonth(id) {
  return id.split('-').map(Number);
}

export default class CalendarHeader<T = Date> extends React.Component<
  HeaderProps<T>,
  {
    isMonthDropdownOpen: boolean;
    isYearDropdownOpen: boolean;
    isFocusVisible: boolean;
  }
> {
  static defaultProps = {
    adapter: dateFnsAdapter,
    // @ts-ignore
    locale: null,
    // @ts-ignore
    maxDate: null,
    // @ts-ignore
    minDate: null,
    onYearChange: () => {},
    overrides: {},
  };

  dateHelpers: DateHelpers<T>;
  monthItems: Array<{
    id: string;
    label: string;
    disabled?: boolean;
  }>;
  yearItems: Array<{
    id: string;
    label: string;
    disabled?: boolean;
  }>;

  constructor(props: HeaderProps<T>) {
    super(props);
    // @ts-ignore
    this.dateHelpers = new DateHelpers(props.adapter);
    this.monthItems = [];
    this.yearItems = [];
  }

  state = {
    isMonthDropdownOpen: false,
    isYearDropdownOpen: false,
    isFocusVisible: false,
  };

  componentDidMount() {
    this.getYearItems();
    this.getMonthItems();
  }

  componentDidUpdate(prevProps: HeaderProps<T>) {
    const selectedMonthDidChange =
      this.dateHelpers.getMonth(this.props.date) !== this.dateHelpers.getMonth(prevProps.date);

    const selectedYearDidChange =
      this.dateHelpers.getYear(this.props.date) !== this.dateHelpers.getYear(prevProps.date);

    if (selectedMonthDidChange) {
      // re-calculate yearItems
      this.getYearItems();
    }

    if (selectedYearDidChange) {
      // re-calculate monthItems
      this.getMonthItems();
    }
  }

  getDateProp: () => T = () => {
    return this.props.date || this.dateHelpers.date();
  };

  getYearItems = () => {
    const date = this.getDateProp();
    const maxDate = this.props.maxDate;
    const minDate = this.props.minDate;
    const maxYear = maxDate ? this.dateHelpers.getYear(maxDate) : MAX_YEAR;
    const minYear = minDate ? this.dateHelpers.getYear(minDate) : MIN_YEAR;
    const selectedMonth = this.dateHelpers.getMonth(date);

    // TODO: this logic can be optimized to only run when minDate / maxDate change
    this.yearItems = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(
      (year) => ({ id: year.toString(), label: year.toString() })
    );
    const monthOfMaxDate = maxDate ? this.dateHelpers.getMonth(maxDate) : MAX_MONTH;
    const monthOfMinDate = minDate ? this.dateHelpers.getMonth(minDate) : MIN_MONTH;
    // Generates array like [0,1,.... monthOfMaxDate]
    const maxYearMonths = Array.from({ length: monthOfMaxDate + 1 }, (x, i) => i);
    // Generates array like [monthOfMinDate, ...., 10, 11]
    const minYearMonths = Array.from({ length: 12 - monthOfMinDate }, (x, i) => i + monthOfMinDate);

    if (selectedMonth > maxYearMonths[maxYearMonths.length - 1]) {
      const lastIdx = this.yearItems.length - 1;
      this.yearItems[lastIdx] = { ...this.yearItems[lastIdx], disabled: true };
    }

    if (selectedMonth < minYearMonths[0]) {
      this.yearItems[0] = { ...this.yearItems[0], disabled: true };
    }
  };

  getMonthItems = () => {
    const date = this.getDateProp();
    const year = this.dateHelpers.getYear(date);
    const maxDate = this.props.maxDate;
    const minDate = this.props.minDate;
    const maxYear = maxDate ? this.dateHelpers.getYear(maxDate) : MAX_YEAR;
    const minYear = minDate ? this.dateHelpers.getYear(minDate) : MIN_YEAR;

    const monthOfMaxDate = maxDate ? this.dateHelpers.getMonth(maxDate) : MAX_MONTH;
    // Generates array like [0,1,.... monthOfMaxDate]
    const maxYearMonths = Array.from({ length: monthOfMaxDate + 1 }, (x, i) => i);

    const monthOfMinDate = minDate ? this.dateHelpers.getMonth(minDate) : MIN_MONTH;

    // Generates array like [monthOfMinDate, ...., 10, 11]
    const minYearMonths = Array.from({ length: 12 - monthOfMinDate }, (x, i) => i + monthOfMinDate);

    const maxMinYearMonthsIntersection = maxYearMonths.filter((year) =>
      minYearMonths.includes(year)
    );

    const filterMonthsList =
      year === maxYear && year === minYear
        ? maxMinYearMonthsIntersection
        : year === maxYear
        ? maxYearMonths
        : year === minYear
        ? minYearMonths
        : null;

    // @ts-ignore
    const formatMonthLabel = (month) => this.dateHelpers.getMonthInLocale(month, this.props.locale);

    this.monthItems = getFilteredMonthItems({
      filterMonthsList,
      formatMonthLabel,
    });
  };

  increaseMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange({
        date: this.dateHelpers.addMonths(
          this.getDateProp(),
          // in a multi-month context, `order` is the number months ahead of
          // the root Calendar month that this CalendarHeader displays. We account
          // for this by incrementing the month by 1, less the value of `order`.
          1 - this.props.order
        ),
      });
    }
  };

  decreaseMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange({
        date: this.dateHelpers.subMonths(this.getDateProp(), 1),
      });
    }
  };

  isMultiMonthHorizontal = () => {
    const { monthsShown, orientation } = this.props;

    if (!monthsShown) {
      return false;
    }

    return orientation === ORIENTATION.horizontal && monthsShown > 1;
  };

  isHiddenPaginationButton = (direction: typeof DIRECTION[keyof typeof DIRECTION]) => {
    const { monthsShown, order } = this.props;

    if (!!monthsShown && this.isMultiMonthHorizontal()) {
      if (direction === DIRECTION.NEXT) {
        const isLastMonth = order === monthsShown - 1;
        return !isLastMonth;
      } else {
        const isFirstMonth = order === 0;
        return !isFirstMonth;
      }
    }

    return false;
  };

  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  renderPreviousMonthButton = ({ locale, theme }: { locale: Locale; theme: Theme }) => {
    const date = this.getDateProp();
    const { overrides = {}, density } = this.props;
    const allPrevDaysDisabled = this.dateHelpers.monthDisabledBefore(date, this.props);

    let isDisabled = false;
    if (allPrevDaysDisabled) {
      isDisabled = true;
    }
    const nextMonth = this.dateHelpers.subMonths(date, 1);
    const minYear = this.props.minDate ? this.dateHelpers.getYear(this.props.minDate) : MIN_YEAR;
    if (this.dateHelpers.getYear(nextMonth) < minYear) {
      isDisabled = true;
    }

    const isHidden = this.isHiddenPaginationButton(DIRECTION.PREVIOUS);
    if (isHidden) {
      isDisabled = true;
    }

    const [PrevButton, prevButtonProps] = getOverrides(overrides.PrevButton, StyledPrevButton);
    const [PrevButtonIcon, prevButtonIconProps] = getOverrides(
      overrides.PrevButtonIcon,
      theme.direction === 'rtl' ? ChevronRight : ChevronLeft
    );
    let clickHandler = this.decreaseMonth;
    if (allPrevDaysDisabled) {
      // @ts-ignore
      clickHandler = null;
    }
    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <PrevButton
        aria-label={locale.datepicker.previousMonth}
        tabIndex={0}
        onClick={clickHandler}
        disabled={isDisabled}
        $isFocusVisible={this.state.isFocusVisible}
        type="button"
        $disabled={isDisabled}
        $order={this.props.order}
        {...prevButtonProps}
      >
        {isHidden ? null : (
          // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
          <PrevButtonIcon
            size={density === DENSITY.high ? 24 : 36}
            overrides={{ Svg: { style: navBtnStyle } }}
            {...prevButtonIconProps}
          />
        )}
      </PrevButton>
    );
  };

  renderNextMonthButton = ({ locale, theme }: { locale: Locale; theme: Theme }) => {
    const date = this.getDateProp();
    const { overrides = {}, density } = this.props;
    const allNextDaysDisabled = this.dateHelpers.monthDisabledAfter(date, this.props);

    let isDisabled = false;
    if (allNextDaysDisabled) {
      isDisabled = true;
    }
    const nextMonth = this.dateHelpers.addMonths(date, 1);
    const maxYear = this.props.maxDate ? this.dateHelpers.getYear(this.props.maxDate) : MAX_YEAR;
    if (this.dateHelpers.getYear(nextMonth) > maxYear) {
      isDisabled = true;
    }

    const isHidden = this.isHiddenPaginationButton(DIRECTION.NEXT);
    if (isHidden) {
      isDisabled = true;
    }

    const [NextButton, nextButtonProps] = getOverrides(overrides.NextButton, StyledNextButton);
    const [NextButtonIcon, nextButtonIconProps] = getOverrides(
      overrides.NextButtonIcon,
      theme.direction === 'rtl' ? ChevronLeft : ChevronRight
    );

    let clickHandler = this.increaseMonth;
    // The other option is to always provide a click handler and let customers
    // override its functionality based on the `$allPrevDaysDisabled` prop
    // in a custom NextButton component override
    // Their options would be to render `null` or not apply the components handler
    // on click or do nothing
    if (allNextDaysDisabled) {
      // @ts-ignore
      clickHandler = null;
    }

    return (
      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
      <NextButton
        aria-label={locale.datepicker.nextMonth}
        tabIndex={0}
        onClick={clickHandler}
        disabled={isDisabled}
        type="button"
        $disabled={isDisabled}
        $isFocusVisible={this.state.isFocusVisible}
        $order={this.props.order}
        {...nextButtonProps}
      >
        {isHidden ? null : (
          // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
          <NextButtonIcon
            size={density === DENSITY.high ? 24 : 36}
            overrides={{ Svg: { style: navBtnStyle } }}
            {...nextButtonIconProps}
          />
        )}
      </NextButton>
    );
  };

  canArrowsOpenDropdown = (event: KeyboardEvent) => {
    if (!this.state.isMonthDropdownOpen && !this.state.isYearDropdownOpen) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        return true;
      }
    }
    return false;
  };

  renderMonthYearDropdown = () => {
    const date = this.getDateProp();
    const month = this.dateHelpers.getMonth(date);
    const year = this.dateHelpers.getYear(date);

    const { locale, overrides = {}, density } = this.props;
    const [MonthYearSelectButton, monthYearSelectButtonProps] = getOverrides(
      overrides.MonthYearSelectButton,
      StyledMonthYearSelectButton
    );
    const [MonthYearSelectIconContainer, monthYearSelectIconContainerProps] = getOverrides(
      overrides.MonthYearSelectIconContainer,
      StyledMonthYearSelectIconContainer
    );
    const [OverriddenPopover, popoverProps] = getOverrides(
      overrides.MonthYearSelectPopover,
      Popover
    );
    const [OverriddenStatefulMenu, menuProps] = getOverrides(
      overrides.MonthYearSelectStatefulMenu,
      StatefulMenu
    );
    menuProps.overrides = mergeOverrides(
      { List: { style: { height: 'auto', maxHeight: '257px' } } },
      menuProps && menuProps.overrides
    );

    const initialMonthIndex = this.monthItems.findIndex(
      (month) => month.id === this.dateHelpers.getMonth(date).toString()
    );
    const initialYearIndex = this.yearItems.findIndex(
      (year) => year.id === this.dateHelpers.getYear(date).toString()
    );

    const monthTitle = `${this.dateHelpers.getMonthInLocale(
      this.dateHelpers.getMonth(date),
      locale
    )}`;
    const yearTitle = `${this.dateHelpers.getYear(date)}`;

    return this.isMultiMonthHorizontal() ? (
      <div>{`${monthTitle} ${yearTitle}`}</div>
    ) : (
      <>
        {/* Month Selection */}
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <OverriddenPopover
          placement="bottom"
          autoFocus={true}
          focusLock={true}
          isOpen={this.state.isMonthDropdownOpen}
          onClick={() => {
            this.setState((prev) => ({
              isMonthDropdownOpen: !prev.isMonthDropdownOpen,
            }));
          }}
          onClickOutside={() => this.setState({ isMonthDropdownOpen: false })}
          onEsc={() => this.setState({ isMonthDropdownOpen: false })}
          content={() => (
            // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
            <OverriddenStatefulMenu
              initialState={{
                highlightedIndex: initialMonthIndex,
                isFocused: true,
              }}
              items={this.monthItems}
              // @ts-ignore
              onItemSelect={({ item, event }) => {
                event.preventDefault();
                const month = idToYearMonth(item.id);
                const updatedDate = this.dateHelpers.set(date, {
                  year,
                  month,
                });
                this.props.onMonthChange && this.props.onMonthChange({ date: updatedDate });
                this.setState({ isMonthDropdownOpen: false });
              }}
              {...menuProps}
            />
          )}
          {...popoverProps}
        >
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <MonthYearSelectButton
            aria-live="polite"
            type="button"
            $isFocusVisible={this.state.isFocusVisible}
            $density={density}
            // @ts-ignore
            onKeyUp={(event) => {
              if (this.canArrowsOpenDropdown(event)) {
                this.setState({ isMonthDropdownOpen: true });
              }
            }}
            // @ts-ignore
            onKeyDown={(event) => {
              if (this.canArrowsOpenDropdown(event)) {
                // disables page scroll
                event.preventDefault();
              }

              if (event.key === 'Tab') {
                this.setState({ isMonthDropdownOpen: false });
              }
            }}
            {...monthYearSelectButtonProps}
          >
            {monthTitle}
            {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
            <MonthYearSelectIconContainer {...monthYearSelectIconContainerProps}>
              <ChevronDown
                title=""
                overrides={{ Svg: { props: { role: 'presentation' } } }}
                size={density === DENSITY.high ? 16 : 24}
              />
            </MonthYearSelectIconContainer>
          </MonthYearSelectButton>
        </OverriddenPopover>
        {/* Year Selection */}
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <OverriddenPopover
          placement="bottom"
          focusLock={true}
          isOpen={this.state.isYearDropdownOpen}
          onClick={() => {
            this.setState((prev) => ({
              isYearDropdownOpen: !prev.isYearDropdownOpen,
            }));
          }}
          onClickOutside={() => this.setState({ isYearDropdownOpen: false })}
          onEsc={() => this.setState({ isYearDropdownOpen: false })}
          content={() => (
            // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
            <OverriddenStatefulMenu
              initialState={{
                highlightedIndex: initialYearIndex,
                isFocused: true,
              }}
              items={this.yearItems}
              // @ts-ignore
              onItemSelect={({ item, event }) => {
                event.preventDefault();
                const year = idToYearMonth(item.id);
                const updatedDate = this.dateHelpers.set(date, {
                  year,
                  month,
                });
                this.props.onYearChange && this.props.onYearChange({ date: updatedDate });
                this.setState({ isYearDropdownOpen: false });
              }}
              {...menuProps}
            />
          )}
          {...popoverProps}
        >
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          <MonthYearSelectButton
            aria-live="polite"
            type="button"
            $isFocusVisible={this.state.isFocusVisible}
            $density={density}
            // @ts-ignore
            onKeyUp={(event) => {
              if (this.canArrowsOpenDropdown(event)) {
                this.setState({ isYearDropdownOpen: true });
              }
            }}
            // @ts-ignore
            onKeyDown={(event) => {
              if (this.canArrowsOpenDropdown(event)) {
                // disables page scroll
                event.preventDefault();
              }

              if (event.key === 'Tab') {
                this.setState({ isYearDropdownOpen: false });
              }
            }}
            {...monthYearSelectButtonProps}
          >
            {yearTitle}
            {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
            <MonthYearSelectIconContainer {...monthYearSelectIconContainerProps}>
              <ChevronDown
                title=""
                overrides={{ Svg: { props: { role: 'presentation' } } }}
                size={density === DENSITY.high ? 16 : 24}
              />
            </MonthYearSelectIconContainer>
          </MonthYearSelectButton>
        </OverriddenPopover>
      </>
    );
  };

  render() {
    const { overrides = {}, density } = this.props;
    const [CalendarHeader, calendarHeaderProps] = getOverrides(
      overrides.CalendarHeader,
      StyledCalendarHeader
    );
    const [MonthHeader, monthHeaderProps] = getOverrides(overrides.MonthHeader, StyledMonthHeader);
    const [WeekdayHeader, weekdayHeaderProps] = getOverrides(
      overrides.WeekdayHeader,
      StyledWeekdayHeader
    );

    const startOfWeek = this.dateHelpers.getStartOfWeek(this.getDateProp(), this.props.locale);
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <LocaleContext.Consumer>
            {(locale) => (
              <>
                {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
                <CalendarHeader
                  {...calendarHeaderProps}
                  $density={this.props.density}
                  onFocus={forkFocus(calendarHeaderProps, this.handleFocus)}
                  onBlur={forkBlur(calendarHeaderProps, this.handleBlur)}
                >
                  {this.renderPreviousMonthButton({
                    locale,
                    theme,
                  })}
                  {this.renderMonthYearDropdown()}
                  {this.renderNextMonthButton({ locale, theme })}
                </CalendarHeader>
                {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
                <MonthHeader role="presentation" {...monthHeaderProps}>
                  {WEEKDAYS.map((offset) => {
                    const day = this.dateHelpers.addDays(startOfWeek, offset);
                    return (
                      // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
                      <WeekdayHeader
                        key={offset}
                        alt={this.dateHelpers.getWeekdayInLocale(day, this.props.locale)}
                        {...weekdayHeaderProps}
                        $density={density}
                      >
                        {this.dateHelpers.getWeekdayMinInLocale(day, this.props.locale)}
                      </WeekdayHeader>
                    );
                  })}
                </MonthHeader>
              </>
            )}
          </LocaleContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
