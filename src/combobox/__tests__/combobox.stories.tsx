/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as ComboboxAsync } from './combobox-async.scenario.js';
import { Scenario as ComboboxAutocompleteFalse } from './combobox-autocomplete-false.scenario.js';
import { Scenario as ComboboxDisabled } from './combobox-disabled.scenario.js';
import { Scenario as ComboboxFormControl } from './combobox-form-control.scenario.js';
import { Scenario as ComboboxForm } from './combobox-form.scenario.js';
import { Scenario as ComboboxInlineTextSearch } from './combobox-inline-text-search.scenario.js';
import { Scenario as ComboboxOverrides } from './combobox-overrides.scenario.js';
import { Scenario as ComboboxReplacementNode } from './combobox-replacement-node.scenario.js';
import { Scenario as ComboboxSearch } from './combobox-search.scenario.js';
import { Scenario as ComboboxSizes } from './combobox-sizes.scenario.js';
import { Scenario as ComboboxDefault } from './combobox.scenario.js';

export const Async = () => <ComboboxAsync />;
export const AutocompleteFalse = () => <ComboboxAutocompleteFalse />;
export const Disabled = () => <ComboboxDisabled />;
export const FormControl = () => <ComboboxFormControl />;
export const Form = () => <ComboboxForm />;
export const InlineTextSearch = () => <ComboboxInlineTextSearch />;
export const Overrides = () => <ComboboxOverrides />;
export const ReplacementNode = () => <ComboboxReplacementNode />;
export const Search = () => <ComboboxSearch />;
export const Sizes = () => <ComboboxSizes />;
export const Combobox = () => <ComboboxDefault />;
