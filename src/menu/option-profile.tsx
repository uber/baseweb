/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
// Components
import MaybeChildMenu from './maybe-child-menu';
import {
  StyledListItemProfile,
  StyledProfileImgContainer,
  StyledProfileImg,
  StyledProfileLabelsContainer,
  StyledProfileTitle,
  StyledProfileSubtitle,
  StyledProfileBody,
} from './styled-components';
import { getOverrides } from '../helpers/overrides';
// Types
import type { OptionProfileProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OptionProfile(props: OptionProfileProps, ref: React.RefObject<any>) {
  const {
    item,
    getChildMenu,
    getProfileItemLabels,
    getProfileItemImg,
    getProfileItemImgText,
    overrides = {},
    resetMenu = () => {},
    $isHighlighted,
    renderAll,
    ...restProps
  } = props;

  const [ListItemProfile, listItemProfileProps] = getOverrides(
    overrides.ListItemProfile,
    StyledListItemProfile
  );
  const [ProfileImgContainer, profileImgContainerProps] = getOverrides(
    overrides.ProfileImgContainer,
    StyledProfileImgContainer
  );
  const [ProfileImg, profileImgProps] = getOverrides(overrides.ProfileImg, StyledProfileImg);
  const [ProfileLabelsContainer, profileLabelsContainerProps] = getOverrides(
    overrides.ProfileLabelsContainer,
    StyledProfileLabelsContainer
  );
  const [ProfileTitle, profileTitleProps] = getOverrides(
    overrides.ProfileTitle,
    StyledProfileTitle
  );
  const [ProfileSubtitle, profileSubtitleProps] = getOverrides(
    overrides.ProfileSubtitle,
    StyledProfileSubtitle
  );
  const [ProfileBody, profileBodyProps] = getOverrides(overrides.ProfileBody, StyledProfileBody);

  const ItemImg = getProfileItemImg(item);
  const { title, subtitle, body } = getProfileItemLabels(item);

  return (
    <MaybeChildMenu
      ref={ref}
      getChildMenu={getChildMenu}
      isOpen={!!$isHighlighted}
      item={item}
      resetParentMenu={resetMenu}
      renderAll={renderAll}
      overrides={overrides}
    >
      {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
      <ListItemProfile {...restProps} {...listItemProfileProps}>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <ProfileImgContainer {...profileImgContainerProps}>
          {ItemImg &&
            (typeof ItemImg === 'string' ? (
              // Render img src string wrapped with image component
              // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
              <ProfileImg src={ItemImg} alt={getProfileItemImgText(item)} {...profileImgProps} />
            ) : (
              // Or just render the entire component user specified
              // @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete
              <ItemImg {...profileImgProps} />
            ))}
        </ProfileImgContainer>
        {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
        <ProfileLabelsContainer {...profileLabelsContainerProps}>
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          {title && <ProfileTitle {...profileTitleProps}>{title}</ProfileTitle>}
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          {subtitle && <ProfileSubtitle {...profileSubtitleProps}>{subtitle}</ProfileSubtitle>}
          {/* @ts-ignore TS2786 error with web-eats-v2, can remove once React 18 migration complete */}
          {body && <ProfileBody {...profileBodyProps}>{body}</ProfileBody>}
        </ProfileLabelsContainer>
      </ListItemProfile>
    </MaybeChildMenu>
  );
}

// @ts-ignore
const forwarded = React.forwardRef<HTMLElement, OptionProfileProps>(OptionProfile);
forwarded.displayName = 'OptionProfile';

export default forwarded;
