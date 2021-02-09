/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import SelectAsyncOptions from './select-async-options.scenario.js';
import SelectBackspaceBehavior from './select-backspace-behavior.scenario.js';
import SelectCallsProvidedBlur from './select-calls-provided-blur.scenario.js';
import SelectClickMaintainsFocus from './select-click-maintains-focus.scenario.js';
import SelectCreatableMulti from './select-creatable-multi.scenario.js';
import SelectCreatable from './select-creatable.scenario.js';
import SelectDisableHrefAnchor from './select-disable-href-anchor.scenario.js';
import SelectHighlight from './select-highlight.scenario.js';
import SelectInFlexContainer from './select-in-flex-container.scenario.js';
import SelectInModal from './select-in-modal.scenario.js';
import SelectMaintainsInputValue from './select-maintains-input-value.scenario.js';
import SelectOpen from './select-open.scenario.js';
import SelectOptionGroup from './select-option-group.scenario.js';
import SelectOverriddenMenu from './select-overridden-menu.scenario.js';
import SelectSearchMulti from './select-search-multi.scenario.js';
import SelectSearchSingleFontsize from './select-search-single-fontsize.scenario.js';
import SelectSearchSingle from './select-search-single.scenario.js';
import SelectSizes from './select-sizes.scenario.js';
import SelectStates from './select-states.scenario.js';
import SelectUnmountBlur from './select-unmount-blur.scenario.js';
import SelectDefault from './select.scenario.js';

export const AsyncOptions = () => <SelectAsyncOptions />;
export const BackspaceBehavior = () => <SelectBackspaceBehavior />;
export const CallsProvidedBlur = () => <SelectCallsProvidedBlur />;
export const ClickMaintainsFocus = () => <SelectClickMaintainsFocus />;
export const CreatableMulti = () => <SelectCreatableMulti />;
export const Creatable = () => <SelectCreatable />;
export const DisableHrefAnchor = () => <SelectDisableHrefAnchor />;
export const Highlight = () => <SelectHighlight />;
export const InFlexContainer = () => <SelectInFlexContainer />;
export const InModal = () => <SelectInModal />;
export const MaintainsInputValue = () => <SelectMaintainsInputValue />;
export const Open = () => <SelectOpen />;
export const OptionGroup = () => <SelectOptionGroup />;
export const OverriddenMenu = () => <SelectOverriddenMenu />;
export const SearchMulti = () => <SelectSearchMulti />;
export const SearchSingleFontsize = () => <SelectSearchSingleFontsize />;
export const SearchSingle = () => <SelectSearchSingle />;
export const Sizes = () => <SelectSizes />;
export const States = () => <SelectStates />;
export const UnmountBlur = () => <SelectUnmountBlur />;
export const Select = () => <SelectDefault />;
