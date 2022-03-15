/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as AvatarCustomInitials } from './avatar-custom-initials.scenario.js';
import { Scenario as AvatarError } from './avatar-error.scenario.js';
import { Scenario as AvatarNoSrc } from './avatar-no-src.scenario.js';
import { Scenario as AvatarDefault } from './avatar.scenario.js';
import { Scenario as AvatarUpdateImage } from './avatar-update-image.scenario.js';

export const CustomInitials = () => <AvatarCustomInitials />;
export const Error = () => <AvatarError />;
export const NoSrc = () => <AvatarNoSrc />;
export const Avatar = () => <AvatarDefault />;
export const UpdateImage = () => <AvatarUpdateImage />;

export default {
  title: 'Avatar',
};
