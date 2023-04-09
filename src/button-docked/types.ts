/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';

export type ButtonDockedOverrides = {
  Root?: Override;
  ActionContainer?: Override;
  ActionSubContainer?: Override;
};

export type ButtonDockedProps = {
  primaryAction: React.ReactNode;
  secondaryActions?: [React.ReactNode] | [React.ReactNode, React.ReactNode];
  dismissiveAction?: React.ReactNode;
  topAccessory?: React.ReactNode;
  overrides?: ButtonDockedOverrides;
};
