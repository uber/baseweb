/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ButtonCircle } from './button-circle.scenario';
import { Scenario as ButtonColors } from './button-colors.scenario';
import { Scenario as ButtonEnhancersCompact } from './button-enhancers-compact.scenario';
import { Scenario as ButtonEnhancersLoading } from './button-enhancers-loading.scenario';
import { Scenario as ButtonEnhancers } from './button-enhancers.scenario';
import { Scenario as ButtonMinHitArea } from './button-min-hit-area.scenario';
import { Scenario as ButtonShapes } from './button-shapes.scenario';
import { Scenario as ButtonSizesLoading } from './button-sizes-loading.scenario';
import { Scenario as ButtonSizes } from './button-sizes.scenario';
import { Scenario as ButtonDefault } from './button.scenario';
import { Scenario as LinkButtons } from './link-buttons.scenario';
import { Scenario as ButtonFunctionalChildren } from './button-functional-children.scenario';
import { Scenario as ButtonBackgroundSafe } from './button-backgroundsafe.scenario';
import { Scenario as ButtonWidthTypes } from './button-width-type.scenario';
import { Scenario as ButtonA11y } from './button-a11y.scenario';

export const Link = () => <LinkButtons />;
export const Circle = () => <ButtonCircle />;
export const Colors = () => <ButtonColors />;
export const EnhancersCompact = () => <ButtonEnhancersCompact />;
export const EnhancersLoading = () => <ButtonEnhancersLoading />;
export const Enhancers = () => <ButtonEnhancers />;
export const MinHitArea = () => <ButtonMinHitArea />;
export const Shapes = () => <ButtonShapes />;
export const SizesLoading = () => <ButtonSizesLoading />;
export const Sizes = () => <ButtonSizes />;
export const Button = () => <ButtonDefault />;
export const FunctionalChildren = () => <ButtonFunctionalChildren />;
export const BackgroundSafe = () => <ButtonBackgroundSafe />;
export const WidthTypes = () => <ButtonWidthTypes />;
export const A11y = () => <ButtonA11y />;
export default {
  meta: {
    runtimeErrorsAllowed: true,
  },
};
