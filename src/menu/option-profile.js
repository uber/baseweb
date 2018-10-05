// @flow
import * as React from 'react';
// Components
import {
  ListItemProfile as StyledListItemProfile,
  ProfileImgContainer as StyledProfileImgContainer,
  ProfileImg as StyledProfileImg,
  ProfileLabelsContainer as StyledProfileLabelsContainer,
  ProfileTitle as StyledProfileTitle,
  ProfileSubtitle as StyledProfileSubtitle,
  ProfileBody as StyledProfileBody,
} from './styled-components';
import {getOverrides} from '../helpers/overrides';
// Types
import type {OptionProfilePropsT} from './types';

export default function OptionProfile({
  item,
  getProfileItemLabels,
  getProfileItemImg,
  getProfileItemImgText,
  overrides = {},
  ...restProps
}: OptionProfilePropsT) {
  const [ListItemProfile, listItemProfileProps] = getOverrides(
    overrides.ListItemProfile,
    StyledListItemProfile,
  );
  const [ProfileImgContainer, profileImgContainerProps] = getOverrides(
    overrides.ProfileImgContainer,
    StyledProfileImgContainer,
  );
  const [ProfileImg, profileImgProps] = getOverrides(
    overrides.ProfileImg,
    StyledProfileImg,
  );
  const [ProfileLabelsContainer, profileLabelsContainerProps] = getOverrides(
    overrides.ProfileLabelsContainer,
    StyledProfileLabelsContainer,
  );
  const [ProfileTitle, profileTitleProps] = getOverrides(
    overrides.ProfileTitle,
    StyledProfileTitle,
  );
  const [ProfileSubtitle, profileSubtitleProps] = getOverrides(
    overrides.ProfileSubtitle,
    StyledProfileSubtitle,
  );
  const [ProfileBody, profileBodyProps] = getOverrides(
    overrides.ProfileBody,
    StyledProfileBody,
  );

  const ItemImg = getProfileItemImg(item);
  const {title, subtitle, body} = getProfileItemLabels(item);

  return (
    <ListItemProfile {...restProps} {...listItemProfileProps}>
      <ProfileImgContainer {...profileImgContainerProps}>
        {ItemImg &&
          (typeof ItemImg === 'string' ? (
            // Render img src string wrapped with image component
            <ProfileImg
              src={ItemImg}
              alt={getProfileItemImgText(item)}
              {...profileImgProps}
            />
          ) : (
            // Or just render the entire component user specified
            // TODO: need better way of checking if valid React component
            <ItemImg {...profileImgProps} />
          ))}
      </ProfileImgContainer>
      <ProfileLabelsContainer {...profileLabelsContainerProps}>
        {title && <ProfileTitle {...profileTitleProps}>{title}</ProfileTitle>}
        {subtitle && (
          <ProfileSubtitle {...profileSubtitleProps}>
            {subtitle}
          </ProfileSubtitle>
        )}
        {body && <ProfileBody {...profileBodyProps}>{body}</ProfileBody>}
      </ProfileLabelsContainer>
    </ListItemProfile>
  );
}
