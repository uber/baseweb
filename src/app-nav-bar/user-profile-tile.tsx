/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Avatar } from '../avatar';
import { getOverrides } from '../helpers/overrides';
import { LabelMedium, ParagraphSmall } from '../typography';

import {
  StyledUserProfileTileContainer,
  StyledUserProfilePictureContainer,
  StyledUserProfileInfoContainer,
} from './styled-components';
import type { AppNavBarOverrides, UserMenuProps } from './types';

export default function UserProfileTile(
  props: {
    overrides: AppNavBarOverrides;
  } & UserMenuProps
) {
  const { overrides = {}, username, usernameSubtitle, userImgUrl } = props;

  const [UserProfileTileContainer, userProfileTileContainerProps] = getOverrides(
    overrides.UserProfileTileContainer,
    StyledUserProfileTileContainer
  );

  const [UserProfilePictureContainer, userProfilePictureContainerProps] = getOverrides(
    overrides.UserProfilePictureContainer,
    StyledUserProfilePictureContainer
  );

  const [UserProfileInfoContainer, userProfileInfoContainerProps] = getOverrides(
    overrides.UserProfileInfoContainer,
    StyledUserProfileInfoContainer
  );

  return (
    // Replace with a  profile tile renderer: renderUserProfileTile()
    <UserProfileTileContainer {...userProfileTileContainerProps}>
      <UserProfilePictureContainer {...userProfilePictureContainerProps}>
        <Avatar name={username || ''} src={userImgUrl} size={'48px'} />
      </UserProfilePictureContainer>
      <UserProfileInfoContainer {...userProfileInfoContainerProps}>
        <LabelMedium>{username}</LabelMedium>
        {usernameSubtitle ? (
          <ParagraphSmall marginTop="0" marginBottom="0">
            {usernameSubtitle}
          </ParagraphSmall>
        ) : null}
      </UserProfileInfoContainer>
    </UserProfileTileContainer>
  );
}
