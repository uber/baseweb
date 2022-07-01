/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ComboboxAsync } from './combobox-async.scenario';
import { Scenario as ComboboxAutocompleteFalse } from './combobox-autocomplete-false.scenario';
import { Scenario as ComboboxDisabled } from './combobox-disabled.scenario';
import { Scenario as ComboboxFormControl } from './combobox-form-control.scenario';
import { Scenario as ComboboxForm } from './combobox-form.scenario';
import { Scenario as ComboboxInlineTextSearch } from './combobox-inline-text-search.scenario';
import { Scenario as ComboboxOverrides } from './combobox-overrides.scenario';
import { Scenario as ComboboxReplacementNode } from './combobox-replacement-node.scenario';
import { Scenario as ComboboxSearch } from './combobox-search.scenario';
import { Scenario as ComboboxSizes } from './combobox-sizes.scenario';
import { Scenario as ComboboxDefault } from './combobox.scenario';

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
