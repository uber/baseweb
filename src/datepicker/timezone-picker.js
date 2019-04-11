/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {findTimeZone, getZonedTime, listTimeZones} from 'timezone-support';
import {formatZonedTime} from 'timezone-support/dist/parse-format';

import {Select} from '../select/index.js';

import type {TimezonePickerPropsT, TimezonePickerStateT} from './types.js';

class TimezonePicker extends React.Component<
  TimezonePickerPropsT,
  TimezonePickerStateT,
> {
  state = {timezones: [], value: []};

  componentDidMount() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const compareDate = this.props.date || new Date();

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
          population: timezone.population,
        };

        if (zone === tz) this.setState({value: [option]});
        return option;
      })
      // removes 'noisy' timezones without acronym
      .filter(option => option.label[0] !== '-' && option.label[0] !== '+')
      // removes timezones with no longer relevant (may lead to unavailable historical times when the timezone was used)
      .filter(option => option.population > 0)
      // deletes population field so not available to component consumers
      .map(option => {
        delete option.population;
        return option;
      })
      // sorts W -> E, prioritizes america (could be more nuanced with system tz)
      .sort((a, b) => {
        const offsetDelta = b.offset - a.offset;
        if (offsetDelta !== 0) return offsetDelta;

        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      });

    this.setState({timezones});
  }

  render() {
    return (
      <Select
        options={this.state.timezones}
        overrides={{Dropdown: {style: {maxHeight: '360px'}}}}
        onChange={params => {
          this.setState({value: params.value});
          this.props.onChange && this.props.onChange(params);
        }}
        value={this.props.value || this.state.value || []}
      />
    );
  }
}

export default TimezonePicker;
