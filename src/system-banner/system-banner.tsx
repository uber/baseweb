/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { Banner, ARTWORK_TYPE, HIERARCHY } from '../banner';
import {
  StyledRoot,
  StyledLeadingContent,
  StyledTrailingIconButton,
  StyledMessageContent,
} from './styled-components';
import { mergeOverride } from '../helpers/overrides';
import type { SystemBannerProps } from './types';

export function SystemBanner(props: SystemBannerProps) {
  const { artworkIcon, primaryAction, secondaryAction, overrides = {}, ...restProps } = props;
  const { Root, LeadingContent, TrailingIconButton, MessageContent, ...restOverrides } = overrides;

  const hasSinglePrimaryAction = primaryAction?.onClick && !secondaryAction;
  const hasTwoActions = primaryAction?.onClick && secondaryAction?.onClick;
  const hasTrailingIcon = hasSinglePrimaryAction && primaryAction.icon;

  const systemBannerRootOverrides = {
    component: StyledRoot,
    props: hasSinglePrimaryAction
      ? {
          $isButton: true,
          $as: 'button',
          onClick: primaryAction.onClick,
          'aria-label': primaryAction.label,
        }
      : {},
  };
  const systemBannerLeadingContentOverrides = { component: StyledLeadingContent };
  const styledTrailingIconButtonOverrides = {
    component: StyledTrailingIconButton,
    props: { $as: 'div' },
  };
  const systemBannerMessageContentOverrides = {
    component: StyledMessageContent,
    props: {
      $as: 'button',
      onClick: primaryAction?.onClick,
      'aria-label': primaryAction?.label,
    },
  };

  const systemBannerOverrides = {
    Root: mergeOverride(systemBannerRootOverrides, Root || {}),
    LeadingContent: mergeOverride(systemBannerLeadingContentOverrides, LeadingContent || {}),
    TrailingIconButton: hasTrailingIcon
      ? mergeOverride(styledTrailingIconButtonOverrides, TrailingIconButton || {})
      : {},
    MessageContent: hasTwoActions
      ? mergeOverride(systemBannerMessageContentOverrides, MessageContent || {})
      : {},
    ...restOverrides,
  };

  return (
    <Banner
      action={
        secondaryAction
          ? { onClick: null, ...secondaryAction }
          : hasTrailingIcon
          ? { icon: primaryAction.icon, onClick: null, label: null }
          : null
      }
      hierarchy={HIERARCHY.high}
      overrides={systemBannerOverrides}
      {...(artworkIcon ? { artwork: { icon: artworkIcon, type: ARTWORK_TYPE.icon } } : {})}
      {...restProps}
    />
  );
}
