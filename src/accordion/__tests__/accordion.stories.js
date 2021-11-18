/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as AccordionControlled} from './accordion-controlled.scenario.js';
import {Scenario as AccordionDisabled} from './accordion-disabled.scenario.js';
import {Scenario as AccordionExpanded} from './accordion-expanded.scenario.js';
import {Scenario as AccordionPanelOverride} from './accordion-panel-override.scenario.js';
import {Scenario as AccordionStateless} from './accordion-stateless.scenario.js';
import {Scenario as AccordionDefault} from './accordion.scenario.js';

export const Controlled = () => <AccordionControlled />;
export const Disabled = () => <AccordionDisabled />;
export const Expanded = () => <AccordionExpanded />;
export const PanelOverride = () => <AccordionPanelOverride />;
export const StatelessAccordion = () => <AccordionStateless />;
export const Accordion = () => <AccordionDefault />;
