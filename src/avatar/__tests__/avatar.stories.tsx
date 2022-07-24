/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as AvatarCustomInitials } from './avatar-custom-initials.scenario';
import { Scenario as AvatarError } from './avatar-error.scenario';
import { Scenario as AvatarNoSrc } from './avatar-no-src.scenario';
import { Scenario as AvatarDefault } from './avatar.scenario';
import { Scenario as AvatarUpdateImage } from './avatar-update-image.scenario';

export const CustomInitials = () => <AvatarCustomInitials />;
export const Error = () => <AvatarError />;
export const NoSrc = () => <AvatarNoSrc />;
export const Avatar = () => <AvatarDefault />;
export const UpdateImage = () => <AvatarUpdateImage />;
