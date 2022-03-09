/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// global Intl
// @flow

import * as React from 'react';
import {format, getTimezoneOffset} from 'date-fns-tz';

import {getOverrides, mergeOverrides} from '../helpers/overrides.js';
import {LocaleContext} from '../locale/index.js';
import {Select} from '../select/index.js';

import type {
  TimezonePickerPropsT,
  TimezonePickerStateT,
  TimezoneT,
} from './types.js';
import {zones} from './tzdata.js';

class TimezonePicker extends React.Component<
  TimezonePickerPropsT,
  TimezonePickerStateT,
> {
  state = {timezones: [], value: null};

  componentDidMount() {
    const timezones = this.buildTimezones(this.props.date || new Date());

    if (__BROWSER__) {
      if (!this.props.value) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.setState({timezones, value: tz});

        const option = timezones.find((o) => o.id === tz);
        option && this.props.onChange && this.props.onChange(option);
      } else {
        this.setState({timezones});
      }
    } else {
      this.setState({timezones});
    }
  }

  componentDidUpdate(prevProps: TimezonePickerPropsT) {
    const prevTime = prevProps.date ? prevProps.date.getTime() : 0;
    const nextTime = this.props.date ? this.props.date.getTime() : 0;
    if (prevTime !== nextTime) {
      const timezones = this.buildTimezones(this.props.date || new Date());
      this.setState({timezones});

      const option = timezones.find((o) => o.id === this.state.value);
      option && this.props.onChange && this.props.onChange(option);
    }
  }

  buildTimezones = (compareDate: Date): TimezoneT[] => {
    const timezones: TimezoneT[] = [];
    for (const zoneName of zones) {
      try {
        const offset = getTimezoneOffset(zoneName, compareDate) / 3_600_000;

        const offsetFormatted = `${offset >= 0 ? '+' : '-'}${Math.abs(offset)}`;
        let label = `(GMT${offsetFormatted}) ${zoneName.replace(/_/g, ' ')}`;

        if (this.props.includeAbbreviations) {
          const abbreviation = format(compareDate, 'zzz', {timeZone: zoneName});
          if (abbreviation) {
            label += ` - ${abbreviation}`;
          }
        }

        const offsetMinutes = offset * 60;

        timezones.push({
          id: zoneName,
          label,
          // offset output is in minutes, difference of UTC and this zone (negative for hours ahead of UTC, positive for hours behind)
          offset: offsetMinutes === 0 ? 0 : offsetMinutes * -1,
        });
      } catch (error) {
        // Ignores timezones that are not available within a user's browser/operating system
        console.error(`failed to format zone name ${zoneName}`);
      }
    }

    // Sorts W -> E, prioritizes america. could be more nuanced based on system tz but simple for now
    return timezones.sort((a, b) => {
      const offsetDelta = b.offset - a.offset;
      if (offsetDelta !== 0) return offsetDelta;

      if (typeof a.label === 'string' && typeof b.label === 'string') {
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
      }
      return 0;
    });
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
      selectProps.overrides,
    );
    // $FlowFixMe
    selectProps.overrides = selectOverrides;

    let options = this.state.timezones;
    if (this.props.mapLabels) {
      options = options.map((option) => {
        // $FlowFixMe - TimezoneT.label is a string, but mapLabels can return a React.Node
        option.label = this.props.mapLabels(option);
        return option;
      });
    }

    return (
      <LocaleContext.Consumer>
        {(locale) => (
          <OverriddenSelect
            aria-label={locale.datepicker.timezonePickerAriaLabel}
            options={options}
            clearable={false}
            disabled={this.props.disabled}
            error={this.props.error}
            positive={this.props.positive}
            size={this.props.size}
            onChange={(params) => {
              if (params.type === 'clear') {
                this.setState({value: ''});
                this.props.onChange && this.props.onChange(null);
              } else {
                this.setState({value: params.option.id});
                this.props.onChange && this.props.onChange(params.option);
              }
            }}
            value={
              this.props.value || this.state.value
                ? [{id: this.props.value || this.state.value}]
                : null
            }
            {...selectProps}
          />
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default TimezonePicker;
