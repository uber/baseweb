/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Day from './day.js';
import {StyledWeek} from './styled-components.js';
import {WEEKDAYS} from './constants.js';
import dateFnsAdapter from './utils/date-fns-adapter.js';
import DateHelpers from './utils/date-helpers.js';

import {getOverrides} from '../helpers/overrides.js';
import type {WeekPropsT} from './types.js';

export default class Week<T = Date> extends React.Component<WeekPropsT<T>> {
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

  constructor(props: WeekPropsT<T>) {
    super(props);
    this.dateHelpers = new DateHelpers(props.adapter);
  }

  renderDays = () => {
    const startOfWeek = this.dateHelpers.getStartOfWeek(
      this.props.date || this.dateHelpers.date(),
      this.props.locale,
    );
    const days = [];
    // $FlowFixMe
    return days.concat(
      WEEKDAYS.map((offset: number) => {
        const day = this.dateHelpers.addDays(startOfWeek, offset);
        return (
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <Day
            adapter={this.props.adapter}
            date={day}
            disabled={this.dateHelpers.isDayDisabled(day, this.props)}
            excludeDates={this.props.excludeDates}
            filterDate={this.props.filterDate}
            highlightedDate={this.props.highlightedDate}
            highlighted={this.dateHelpers.isSameDay(
              day,
              this.props.highlightedDate,
            )}
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
          />
        );
      }),
    );
  };

  render() {
    const {overrides = {}} = this.props;
    const [Week, weekProps] = getOverrides(overrides.Week, StyledWeek);
    return (
      <Week role="row" {...weekProps}>
        {this.renderDays()}
      </Week>
    );
  }
}
