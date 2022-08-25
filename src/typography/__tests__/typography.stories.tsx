/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TypographyBody } from './typography-body.scenario';
import { Scenario as TypographyDisplay } from './typography-display.scenario';
import { Scenario as TypographyHeading } from './typography-heading.scenario';
import { Scenario as TypographyMonoStyletron } from './typography-mono-styletron.scenario';
import { Scenario as TypographyMono } from './typography-mono.scenario';
import { Scenario as TypographyOverrides } from './typography-overrides.scenario';

export const Body = () => <TypographyBody />;
export const Display = () => <TypographyDisplay />;
export const Heading = () => <TypographyHeading />;
export const MonoStyletron = () => <TypographyMonoStyletron />;
export const Mono = () => <TypographyMono />;
export const Overrides = () => <TypographyOverrides />;
