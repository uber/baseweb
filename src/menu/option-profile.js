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
import {getOverrideObject} from '../helpers/overrides';
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
  const {
    component: ListItemProfile,
    props: listItemProfileProps,
  } = getOverrideObject(overrides.ListItemProfile, StyledListItemProfile);
  const {
    component: ProfileImgContainer,
    props: profileImgContainerProps,
  } = getOverrideObject(
    overrides.ProfileImgContainer,
    StyledProfileImgContainer,
  );
  const {component: ProfileImg, props: profileImgProps} = getOverrideObject(
    overrides.ProfileImg,
    StyledProfileImg,
  );
  const {
    component: ProfileLabelsContainer,
    props: profileLabelsContainerProps,
  } = getOverrideObject(
    overrides.ProfileLabelsContainer,
    StyledProfileLabelsContainer,
  );
  const {component: ProfileTitle, props: profileTitleProps} = getOverrideObject(
    overrides.ProfileTitle,
    StyledProfileTitle,
  );
  const {
    component: ProfileSubtitle,
    props: profileSubtitleProps,
  } = getOverrideObject(overrides.ProfileSubtitle, StyledProfileSubtitle);
  const {component: ProfileBody, props: profileBodyProps} = getOverrideObject(
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
