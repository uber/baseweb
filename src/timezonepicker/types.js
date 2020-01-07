/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

import type {OptionT} from '../select/index.js';
import type {SizeT} from '../input/types.js';

export type TimezonePickerStateT = {
  /** List of timezones from the IANA database. */
  timezones: OptionT[],
  /** Value provided to the select component. */
  value: ?string,
};

export type TimezoneT = {
  id: string,
  label: string,
  offset: number,
};
export type TimezonePickerPropsT = {
  /**
   * If not provided, defaults to new Date(). Important to note that the timezone picker only
   * displays options related to the provided date. Take Pacific Time for example. On March 9th,
   * Pacific Time equates to the more specific Pacific Standard Time. On March 10th, it operates on
   * Pacific Daylight Time. The timezone picker will never display PST and PDT together. If you need
   * exact specificity, provide a date. Otherwise it will default to the relevant timezone at render.
   */
  date?: Date,
  /**
   * Customize the option's label. Useful for translations and optionally mapping from
   * 'America/Los_Angeles' to 'Pacific Time'.
   */
  mapLabels?: OptionT => React.Node,
  /** Callback for when the timezone selection changes. */
  onChange?: (value: ?TimezoneT) => mixed,
  overrides?: {Select?: OverrideT<*>},
  /**
   * Optional value that can be provided to fully control the component. If not provided,
   * TimezonePicker will manage state internally.
   */
  value?: ?string,
  disabled?: boolean,
  error?: boolean,
  positive?: boolean,
  size?: SizeT,
};
