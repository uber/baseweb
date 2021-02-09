/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import AvatarCustomInitials from './avatar-custom-initials.scenario.js';
import AvatarError from './avatar-error.scenario.js';
import AvatarNoSrc from './avatar-no-src.scenario.js';
import AvatarDefault from './avatar.scenario.js';

export const CustomInitials = () => <AvatarCustomInitials />;
export const Error = () => <AvatarError />;
export const NoSrc = () => <AvatarNoSrc />;
export const Avatar = () => <AvatarDefault />;
