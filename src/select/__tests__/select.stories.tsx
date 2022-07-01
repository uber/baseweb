/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as SelectAsyncOptions } from './select-async-options.scenario';
import { Scenario as SelectBackspaceBehavior } from './select-backspace-behavior.scenario';
import { Scenario as SelectCallsProvidedBlur } from './select-calls-provided-blur.scenario';
import { Scenario as SelectClickMaintainsFocus } from './select-click-maintains-focus.scenario';
import { Scenario as SelectCreatableMulti } from './select-creatable-multi.scenario';
import { Scenario as SelectCreatable } from './select-creatable.scenario';
import { Scenario as SelectDisableHrefAnchor } from './select-disable-href-anchor.scenario';
import { Scenario as SelectHighlight } from './select-highlight.scenario';
import { Scenario as SelectIconOverrides } from './select-icon-overrides.scenario';
import { Scenario as SelectInFlexContainer } from './select-in-flex-container.scenario';
import { Scenario as SelectInModal } from './select-in-modal.scenario';
import { Scenario as SelectInputRef } from './select-input-ref.scenario';
import { Scenario as SelectMaintainsInputValue } from './select-maintains-input-value.scenario';
import { Scenario as SelectOpen } from './select-open.scenario';
import { Scenario as SelectOptionGroup } from './select-option-group.scenario';
import { Scenario as SelectOverriddenIconContainer } from './select-overridden-icon-container.scenario';
import { Scenario as SelectOverriddenMenu } from './select-overridden-menu.scenario';
import { Scenario as SelectSearchMulti } from './select-search-multi.scenario';
import { Scenario as SelectSearchSingleFontsize } from './select-search-single-fontsize.scenario';
import { Scenario as SelectSearchSingle } from './select-search-single.scenario';
import { Scenario as SelectSearcableFormControl } from './select-searchable-form-control.scenario';
import { Scenario as SelectSizes } from './select-sizes.scenario';
import { Scenario as SelectSizesSelectedValue } from './select-sizes-selected-value.scenario';
import { Scenario as SelectStates } from './select-states.scenario';
import { Scenario as SelectUnmountBlur } from './select-unmount-blur.scenario';
import { Scenario as SelectClickTriggersBlur } from './select-click-triggers-blur.scenario';
import { Scenario as SelectDefault } from './select.scenario';
import { Scenario as SelectControlRefSetDropdownOpen } from './select-controlref-set-dropdown-open.scenario';
import { Scenario as SelectControlRefSetInputValue } from './select-controlref-set-input-value.scenario';
import { Scenario as SelectManyOptions } from './select-many-options.scenario';

export const AsyncOptions = () => <SelectAsyncOptions />;
export const BackspaceBehavior = () => <SelectBackspaceBehavior />;
export const CallsProvidedBlur = () => <SelectCallsProvidedBlur />;
export const ClickMaintainsFocus = () => <SelectClickMaintainsFocus />;
export const CreatableMulti = () => <SelectCreatableMulti />;
export const Creatable = () => <SelectCreatable />;
export const DisableHrefAnchor = () => <SelectDisableHrefAnchor />;
export const Highlight = () => <SelectHighlight />;
export const IconOverrides = () => <SelectIconOverrides />;
export const InFlexContainer = () => <SelectInFlexContainer />;
export const InModal = () => <SelectInModal />;
export const InputRef = () => <SelectInputRef />;
export const MaintainsInputValue = () => <SelectMaintainsInputValue />;
export const Open = () => <SelectOpen />;
export const OptionGroup = () => <SelectOptionGroup />;
export const OverriddenIconContainer = () => <SelectOverriddenIconContainer />;
export const OverriddenMenu = () => <SelectOverriddenMenu />;
export const SearchMulti = () => <SelectSearchMulti />;
export const SearchSingleFontsize = () => <SelectSearchSingleFontsize />;
export const SearchSingle = () => <SelectSearchSingle />;
export const SearchableFormControl = () => <SelectSearcableFormControl />;
export const Sizes = () => <SelectSizes />;
export const SizesSelectedValue = () => <SelectSizesSelectedValue />;
export const States = () => <SelectStates />;
export const UnmountBlur = () => <SelectUnmountBlur />;
export const Select = () => <SelectDefault />;
export const ControlRefSetDropdownOpen = () => <SelectControlRefSetDropdownOpen />;
export const ControlRefSetInputValue = () => <SelectControlRefSetInputValue />;
export const ClickTriggersBlur = () => <SelectClickTriggersBlur />;
export const ManyOptions = () => <SelectManyOptions />;
