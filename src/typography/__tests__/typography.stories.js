/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as TypographyBody} from './typography-body.scenario.js';
import {Scenario as TypographyDisplay} from './typography-display.scenario.js';
import {Scenario as TypographyHeading} from './typography-heading.scenario.js';
import {Scenario as TypographyMonoStyletron} from './typography-mono-styletron.scenario.js';
import {Scenario as TypographyMono} from './typography-mono.scenario.js';

export const Body = () => <TypographyBody />;
export const Display = () => <TypographyDisplay />;
export const Heading = () => <TypographyHeading />;
export const MonoStyletron = () => <TypographyMonoStyletron />;
export const Mono = () => <TypographyMono />;
