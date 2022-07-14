/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { Override } from '../helpers/overrides';

import type { Option } from '../select';
import type { Size } from '../input';

export type TimezonePickerState = {
  /** List of timezones from the IANA database. */
  timezones: Timezone[];
  /** Value provided to the select component. */
  value: string | undefined | null;
};

export type Timezone = {
  id: string;
  label: string;
  /**
   * The difference, in minutes, between a UTC date, and a date in the indicated time zone.
   * Positive values indicate hours behind UTC, negative values indicate hours ahead.
   * This aligns with Date.getTimezoneOffset()
   */
  offset: number;
};
export type TimezonePickerOverrides = {
  Select?: Override;
};
export type TimezonePickerProps = {
  /**
   * If not provided, defaults to new Date(). Important to note that the timezone picker only
   * displays options related to the provided date. Take Pacific Time for example. On March 9th,
   * Pacific Time equates to the more specific Pacific Standard Time. On March 10th, it operates on
   * Pacific Daylight Time. The timezone picker will never display PST and PDT together. If you need
   * exact specificity, provide a date. Otherwise it will default to the relevant timezone at render.
   */
  date?: Date;
  /**
   * Customize the option's label. Useful for translations and optionally mapping from
   * 'America/Los_Angeles' to 'Pacific Time'.
   */
  // todo(flow->ts): to double-check if change is correct - previously return type was React.ReactNode, but given implementation - only string looks expected to work correctly
  mapLabels?: (option: Option) => string;
  /** Callback for when the timezone selection changes. */
  onChange?: (value?: Timezone | null) => unknown;
  overrides?: TimezonePickerOverrides;
  /**
   * Optional value that can be provided to fully control the component. If not provided,
   * TimezonePicker will manage state internally.
   */
  value?: string | null;
  disabled?: boolean;
  error?: boolean;
  positive?: boolean;
  size?: Size;
  includeAbbreviations?: boolean;
};
