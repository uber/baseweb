/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {ArrowLeft, ArrowRight} from '../icon/index.js';
import {Select} from '../select/index.js';
import {
  StyledCalendarHeader,
  StyledPrevButton,
  StyledNextButton,
} from './styled-components.js';
import {
  addMonths,
  getMonth,
  getMonthInLocale,
  getYear,
  monthDisabledBefore,
  monthDisabledAfter,
  setMonth,
  setYear,
  subMonths,
} from './utils/index.js';
import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import type {HeaderPropsT} from './types.js';
import type {SharedStylePropsT} from '../select/types.js';

const navBtnStyle = ({$theme}) => ({
  cursor: 'pointer',
});

export default class CalendarHeader extends React.Component<HeaderPropsT> {
  static defaultProps = {
    date: new Date(),
    locale: null,
    maxDate: null,
    minDate: null,
    onMonthChange: () => {},
    onYearChange: () => {},
    overrides: {},
  };

  handleMonthChange = ({value}: {value: Array<{id: number}>}) => {
    this.props.onMonthChange({date: setMonth(this.props.date, value[0].id)});
  };

  handleYearChange = ({value}: {value: Array<{id: number}>}) => {
    this.props.onYearChange({date: setYear(this.props.date, value[0].id)});
  };

  increaseMonth = () => {
    this.props.onMonthChange({date: addMonths(this.props.date, 1)});
  };

  decreaseMonth = () => {
    this.props.onMonthChange({date: subMonths(this.props.date, 1)});
  };

  renderPreviousMonthButton = () => {
    const {date, overrides = {}} = this.props;
    const allPrevDaysDisabled = monthDisabledBefore(date, this.props);

    if (allPrevDaysDisabled) {
      return;
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
        aria-label="Previous month"
        tabIndex={0}
        onClick={clickHandler}
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

  renderNextMonthButton = () => {
    const {date, overrides = {}} = this.props;
    const allNextDaysDisabled = monthDisabledAfter(date, this.props);

    if (allNextDaysDisabled) {
      return;
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
        aria-label="Next month"
        tabIndex={0}
        onClick={clickHandler}
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

  renderMonthDropdown() {
    const {date, locale, overrides = {}} = this.props;
    const [MonthSelect, monthSelectProps] = getOverrides(
      overrides.MonthSelect,
      Select,
    );
    const selectOverrides = mergeOverrides(
      this.getSelectOverrides({width: '115px'}),
      // $FlowFixMe
      monthSelectProps && monthSelectProps.overrides,
    );
    const monthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(M => ({
      id: M,
      label: getMonthInLocale(M, locale),
    }));
    return (
      <MonthSelect
        clearable={false}
        value={[{id: getMonth(date)}]}
        maxDropdownHeight={'300px'}
        options={monthOptions}
        searchable={false}
        {...monthSelectProps}
        // Adding event handlers after customers overrides in order to
        // make sure the components functions as expected
        // We can extract the handlers from props overrides
        // and call it along with internal handlers by creating an inline handler
        onChange={this.handleMonthChange}
        // internal and incoming overrides are merged above
        overrides={selectOverrides}
      />
    );
  }

  renderYearDropdown() {
    const {date, minDate, maxDate, overrides = {}} = this.props;
    const [YearSelect, yearSelectProps] = getOverrides(
      overrides.YearSelect,
      Select,
    );
    const selectOverrides = mergeOverrides(
      this.getSelectOverrides({width: '80px'}),
      // $FlowFixMe
      yearSelectProps && yearSelectProps.overrides,
    );
    const maxYear = maxDate ? getYear(maxDate) : 2100;
    const minYear = minDate ? getYear(minDate) : 1900;
    const yearOptions = [];
    for (let i = minYear; i <= maxYear; i++) {
      yearOptions.push({id: i, label: i});
    }
    return (
      <YearSelect
        clearable={false}
        value={[{id: getYear(date)}]}
        maxDropdownHeight={'300px'}
        options={yearOptions}
        searchable={false}
        {...yearSelectProps}
        // Adding event handlers after customers overrides in order to
        // make sure the components functions as expected
        // We can extract the handlers from props overrides
        // and call it along with internal handlers by creating an inline handler
        onChange={this.handleYearChange}
        // internal and incoming overrides are merged above
        overrides={selectOverrides}
      />
    );
  }

  render() {
    const {overrides = {}} = this.props;
    const [CalendarHeader, calendarHeaderProps] = getOverrides(
      overrides.CalendarHeader,
      StyledCalendarHeader,
    );
    return (
      <CalendarHeader {...calendarHeaderProps}>
        {this.renderPreviousMonthButton()}
        {this.renderMonthDropdown()}
        {this.renderYearDropdown()}
        {this.renderNextMonthButton()}
      </CalendarHeader>
    );
  }
}
