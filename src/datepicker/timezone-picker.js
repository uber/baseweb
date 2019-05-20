/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// global Intl
// @flow

import * as React from 'react';
import {
  findTimeZone,
  getZonedTime,
  listTimeZones,
} from 'timezone-support/dist/index-2012-2022.js';
import {formatZonedTime} from 'timezone-support/dist/parse-format.js';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {Select} from '../select/index.js';

import type {TimezonePickerPropsT, TimezonePickerStateT} from './types.js';

class TimezonePicker extends React.Component<
  TimezonePickerPropsT,
  TimezonePickerStateT,
> {
  state = {timezones: [], value: []};

  componentDidMount() {
    const timezones = this.buildTimezones(this.props.date || new Date());

    if (__BROWSER__) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      this.setState({value: [{id: tz}]});
    }
    this.setState({timezones});
  }

  componentDidUpdate(prevProps: TimezonePickerPropsT) {
    const prevTime = prevProps.date ? prevProps.date.getTime() : 0;
    const nextTime = this.props.date ? this.props.date.getTime() : 0;
    if (prevTime !== nextTime) {
      const timezones = this.buildTimezones(this.props.date || new Date());
      this.setState({timezones});
    }
  }

  buildTimezones = (compareDate: Date) => {
    const timezones = listTimeZones()
      .map(zone => {
        const timezone = findTimeZone(zone);
        const zonedTime = getZonedTime(compareDate, timezone);
        const formatted = formatZonedTime(
          zonedTime,
          `z - [${zone}] ([GMT] Z)`,
        ).replace('_', ' ');

        const option = {
          id: zone,
          label: formatted,
          offset: zonedTime.zone.offset,
        };
        if (this.props.mapLabels) {
          option.label = this.props.mapLabels(option);
        }
        return option;
      })
      // Removes 'noisy' timezones without a letter acronym.
      .filter(option => option.label[0] !== '-' && option.label[0] !== '+')
      // Sorts W -> E, prioritizes america. could be more nuanced based on system tz but simple for now
      .sort((a, b) => {
        const offsetDelta = b.offset - a.offset;
        if (offsetDelta !== 0) return offsetDelta;

        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });
    return timezones;
  };

  render() {
    const {overrides = {}} = this.props;
    const [OverriddenSelect, selectProps] = getOverrides(
      overrides.Select,
      Select,
    );
    const selectOverrides = mergeOverrides(
      {
        Dropdown: {style: {maxHeight: '360px'}},
      },
      // $FlowFixMe
      selectProps && selectProps.overrides,
    );

    return (
      <LocaleContext.Consumer>
        {locale => (
          <OverriddenSelect
            aria-label={locale.datepicker.timezonePickerAriaLabel}
            options={this.state.timezones}
            // overrides={{Dropdown: {style: {maxHeight: '360px'}}}}
            onChange={params => {
              this.setState({value: params.value});
              this.props.onChange && this.props.onChange(params);
            }}
            value={this.props.value || this.state.value || []}
            overrides={selectOverrides}
          />
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default TimezonePicker;
