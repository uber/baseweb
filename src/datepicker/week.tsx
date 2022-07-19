/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Day from './day';
import { StyledWeek } from './styled-components';
import { WEEKDAYS } from './constants';
import dateFnsAdapter from './utils/date-fns-adapter';
import DateHelpers from './utils/date-helpers';

import { getOverrides } from '../helpers/overrides';
import type { WeekProps } from './types';

export default class Week<T = Date> extends React.Component<WeekProps<T>> {
  static defaultProps = {
    adapter: dateFnsAdapter,
    highlightedDate: null,
    onDayClick: () => {},
    onDayFocus: () => {},
    onDayBlur: () => {},
    onDayMouseOver: () => {},
    onDayMouseLeave: () => {},
    onChange: () => {},
    overrides: {},
    peekNextMonth: false,
  };

  dateHelpers: DateHelpers<T>;

  constructor(props: WeekProps<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  renderDays = () => {
    const startOfWeek = this.dateHelpers.getStartOfWeek(
      this.props.date || this.dateHelpers.date(),
      this.props.locale
    );
    const days = [];
    return days.concat(
      WEEKDAYS.map((offset: number) => {
        const day = this.dateHelpers.addDays(startOfWeek, offset);
        return (
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <Day
            adapter={this.props.adapter}
            date={day}
            dateLabel={this.props.dateLabel}
            density={this.props.density}
            disabled={this.dateHelpers.isDayDisabled(day, this.props)}
            // @ts-expect-error todo(flow->ts): excludeDates looks to be an error
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightedDate={this.props.highlightedDate}
            highlighted={this.dateHelpers.isSameDay(day, this.props.highlightedDate)}
            includeDates={this.props.includeDates}
            focusedCalendar={this.props.focusedCalendar}
            range={this.props.range}
            key={offset}
            locale={this.props.locale}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            month={this.props.month}
            onSelect={this.props.onChange}
            onBlur={this.props.onDayBlur}
            onFocus={this.props.onDayFocus}
            onClick={this.props.onDayClick}
            onMouseOver={this.props.onDayMouseOver}
            onMouseLeave={this.props.onDayMouseLeave}
            overrides={this.props.overrides}
            peekNextMonth={this.props.peekNextMonth}
            value={this.props.value}
            hasLockedBehavior={this.props.hasLockedBehavior}
            selectedInput={this.props.selectedInput}
          />
        );
      })
    );
  };

  render() {
    const { overrides = {} } = this.props;
    const [Week, weekProps] = getOverrides(overrides.Week, StyledWeek);
    return (
      <Week role="row" {...weekProps}>
        {this.renderDays()}
      </Week>
    );
  }
}
