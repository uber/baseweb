/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import AccordionControlled from './accordion-controlled.scenario.js';
import AccordionDisabled from './accordion-disabled.scenario.js';
import AccordionExpanded from './accordion-expanded.scenario.js';
import AccordionPanelOverride from './accordion-panel-override.scenario.js';
import AccordionDefault from './accordion.scenario.js';

export const Accordion = () => <AccordionDefault />;
export const Controlled = () => <AccordionControlled />;
export const Disabled = () => <AccordionDisabled />;
export const Expanded = () => <AccordionExpanded />;
export const PanelOverride = () => <AccordionPanelOverride />;
