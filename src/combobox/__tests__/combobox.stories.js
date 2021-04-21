/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ComboboxAsync from './combobox-async.scenario.js';
import ComboboxAutocompleteFalse from './combobox-autocomplete-false.scenario.js';
import ComboboxDisabled from './combobox-disabled.scenario.js';
import ComboboxFormControl from './combobox-form-control.scenario.js';
import ComboboxForm from './combobox-form.scenario.js';
import ComboboxInlineTextSearch from './combobox-inline-text-search.scenario.js';
import ComboboxOverrides from './combobox-overrides.scenario.js';
import ComboboxReplacementNode from './combobox-replacement-node.scenario.js';
import ComboboxSearch from './combobox-search.scenario.js';
import ComboboxSizes from './combobox-sizes.scenario.js';
import ComboboxDefault from './combobox.scenario.js';

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
