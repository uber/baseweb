// @flow
import * as React from 'react';
// Components
import {
  List as StyledList,
  ListItemProfile as StyledListItemProfile,
  ProfileImgContainer as StyledProfileImgContainer,
  ProfileImg as StyledProfileImg,
  ProfileLabelsContainer as StyledProfileLabelsContainer,
  ProfileTitle as StyledProfileTitle,
  ProfileSubtitle as StyledProfileSubtitle,
  ProfileBody as StyledProfileBody,
} from './styled-components';
import {mapStyletronProps} from './utils';
import {getOverride} from '../../helpers/overrides';
// Types
import type {StatelessMenuProfilePropsT} from './types';

export default function MenuProfile({
  items,
  getProfileItemLabels,
  getProfileItemImg,
  getProfileItemImgText,
  getRequiredItemProps = (item, index) => ({key: String(index)}),
  rootRef = React.createRef(),
  overrides = {},
}: StatelessMenuProfilePropsT) {
  const List = getOverride(overrides.List) || StyledList;
  const ListItemProfile =
    getOverride(overrides.ListItemProfile) || StyledListItemProfile;

  const ProfileImgContainer =
    getOverride(overrides.ProfileImgContainer) || StyledProfileImgContainer;
  const ProfileImg = getOverride(overrides.ProfileImg) || StyledProfileImg;

  const ProfileLabelsContainer =
    getOverride(overrides.ProfileLabelsContainer) ||
    StyledProfileLabelsContainer;
  const ProfileTitle =
    getOverride(overrides.ProfileTitle) || StyledProfileTitle;
  const ProfileSubtitle =
    getOverride(overrides.ProfileSubtitle) || StyledProfileSubtitle;
  const ProfileBody = getOverride(overrides.ProfileBody) || StyledProfileBody;

  return (
    <List $ref={rootRef}>
      {items.map((item, index) => {
        const requiredProps = getRequiredItemProps(item, index);
        // $FlowFixMe
        const {key, ...itemProps} = mapStyletronProps(requiredProps);
        const ItemImg = getProfileItemImg(item);
        const {title, subtitle, body} = getProfileItemLabels(item);
        return (
          // Need to be explicit with `key` otherwise eslint throws error?
          <ListItemProfile key={key} {...itemProps}>
            <ProfileImgContainer>
              {ItemImg &&
                (typeof ItemImg === 'string' ? (
                  // Render img src string wrapped with image component
                  <ProfileImg src={ItemImg} alt={getProfileItemImgText(item)} />
                ) : (
                  // Or just render the entire component user specified
                  // TODO: need better way of checking if valid React component
                  <ItemImg />
                ))}
            </ProfileImgContainer>
            <ProfileLabelsContainer>
              {title && <ProfileTitle>{title}</ProfileTitle>}
              {subtitle && <ProfileSubtitle>{subtitle}</ProfileSubtitle>}
              {body && <ProfileBody>{body}</ProfileBody>}
            </ProfileLabelsContainer>
          </ListItemProfile>
        );
      })}
    </List>
  );
}
