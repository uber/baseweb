/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { Button, SIZE as BUTTON_SIZE, SHAPE as BUTTON_SHAPE } from '../button/index.js';
import { getOverrides } from '../helpers/overrides.js';
import { useStyletron } from '../styles/index.js';
import { ACTION_POSITION, ARTWORK_TYPE, HIERARCHY, KIND } from './constants.js';
import {
  StyledRoot,
  StyledLeadingContent,
  StyledMessageContent,
  StyledTitle,
  StyledMessage,
  StyledBelowContent,
  StyledTrailingContent,
  StyledTrailingButtonContainer,
  StyledTrailingIconButton,
} from './styled-components.js';
import type { PropsT } from './types.js';

function low(theme, kind) {
  switch (kind) {
    case KIND.negative:
      return {
        actionBackgroundColor: theme.colors.bannerActionLowNegative,
        backgroundColor: theme.colors.backgroundLightNegative,
        color: theme.colors.contentPrimary,
      };

    case KIND.positive:
      return {
        actionBackgroundColor: theme.colors.bannerActionLowPositive,
        backgroundColor: theme.colors.backgroundLightPositive,
        color: theme.colors.contentPrimary,
      };

    case KIND.warning:
      return {
        actionBackgroundColor: theme.colors.bannerActionLowWarning,
        backgroundColor: theme.colors.backgroundLightWarning,
        color: theme.colors.contentPrimary,
      };

    case KIND.info:
    default:
      return {
        actionBackgroundColor: theme.colors.bannerActionLowInfo,
        backgroundColor: theme.colors.backgroundLightAccent,
        color: theme.colors.contentPrimary,
      };
  }
}

function high(theme, kind) {
  switch (kind) {
    case KIND.negative:
      return {
        actionBackgroundColor: theme.colors.bannerActionHighNegative,
        backgroundColor: theme.colors.backgroundNegative,
        color: theme.colors.contentOnColor,
      };

    case KIND.positive:
      return {
        actionBackgroundColor: theme.colors.bannerActionHighPositive,
        backgroundColor: theme.colors.backgroundPositive,
        color: theme.colors.contentOnColor,
      };

    case KIND.warning:
      return {
        actionBackgroundColor: theme.colors.bannerActionHighWarning,
        backgroundColor: theme.colors.backgroundWarning,
        color: theme.colors.contentPrimary,
      };

    case KIND.info:
    default:
      return {
        actionBackgroundColor: theme.colors.bannerActionHighInfo,
        backgroundColor: theme.colors.backgroundAccent,
        color: theme.colors.contentOnColor,
      };
  }
}

function Leading({ artwork }) {
  const [, theme] = useStyletron();

  if (!artwork) {
    return null;
  }

  const size = artwork.type === ARTWORK_TYPE.badge ? theme.sizing.scale1000 : theme.sizing.scale800;
  return artwork.icon({ size });
}

function Below({ action, backgroundColor, color }) {
  if (!action || action.position !== ACTION_POSITION.below) {
    return null;
  }

  if (__DEV__) {
    if (action.icon) {
      console.error('Banner ACTION_POSITION.below must not have an icon.');
      return null;
    }
  }

  if (action.label) {
    return (
      <Button
        colors={{ backgroundColor, color }}
        onClick={action.onClick}
        size={BUTTON_SIZE.compact}
        shape={BUTTON_SHAPE.pill}
      >
        {action.label}
      </Button>
    );
  }

  return null;
}

function Trailing({ action, backgroundColor, color, overrides, nested }) {
  const [, theme] = useStyletron();

  if (!action || (action.position && action.position !== ACTION_POSITION.trailing)) {
    return null;
  }

  const [TrailingIconButton, trailingIconButtonProps] = getOverrides(
    overrides.TrailingIconButton,
    StyledTrailingIconButton
  );

  if (action.icon) {
    return (
      <TrailingIconButton
        aria-label={action.label}
        onClick={action.onClick}
        $nested={nested}
        {...trailingIconButtonProps}
      >
        {action.icon({ size: theme.sizing.scale650 })}
      </TrailingIconButton>
    );
  }

  const [TrailingButtonContainer, trailingButtonContainerProps] = getOverrides(
    overrides.TrailingButtonContainer,
    StyledTrailingButtonContainer
  );

  if (action.label) {
    return (
      <TrailingButtonContainer {...trailingButtonContainerProps}>
        <Button
          colors={{ backgroundColor, color }}
          onClick={action.onClick}
          size={BUTTON_SIZE.compact}
          shape={BUTTON_SHAPE.pill}
        >
          {action.label}
        </Button>
      </TrailingButtonContainer>
    );
  }

  return null;
}

export function Banner({
  action,
  artwork,
  children,
  hierarchy = HIERARCHY.low,
  kind = KIND.info,
  overrides = {},
  nested = false,
  title,
}: PropsT) {
  const [, theme] = useStyletron();
  const styles = hierarchy === HIERARCHY.high ? high(theme, kind) : low(theme, kind);
  const actionPosition = action && action.position ? action.position : ACTION_POSITION.trailing;

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [LeadingContent, leadingContentProps] = getOverrides(
    overrides.LeadingContent,
    StyledLeadingContent
  );
  const [MessageContent, messageContentProps] = getOverrides(
    overrides.MessageContent,
    StyledMessageContent
  );
  const [TrailingContent, trailingContentProps] = getOverrides(
    overrides.TrailingContent,
    StyledTrailingContent
  );
  const [BelowContent, belowContentProps] = getOverrides(
    overrides.BelowContent,
    StyledBelowContent
  );
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [Message, messageProps] = getOverrides(overrides.Message, StyledMessage);

  return (
    <Root
      $backgroundColor={styles.backgroundColor}
      $color={styles.color}
      $nested={nested}
      {...rootProps}
    >
      <LeadingContent $includesArtwork={Boolean(artwork)} {...leadingContentProps}>
        <Leading artwork={artwork} />
      </LeadingContent>

      <MessageContent $actionPosition={actionPosition} {...messageContentProps}>
        {Boolean(title) && <Title {...titleProps}>{title}</Title>}
        {Boolean(children) && <Message {...messageProps}>{children}</Message>}
      </MessageContent>

      <TrailingContent {...trailingContentProps}>
        <Trailing
          action={action}
          backgroundColor={styles.actionBackgroundColor}
          color={styles.color}
          overrides={overrides}
          nested={nested}
        />
      </TrailingContent>

      <BelowContent $actionPosition={actionPosition} {...belowContentProps}>
        <Below
          action={action}
          backgroundColor={styles.actionBackgroundColor}
          color={styles.color}
        />
      </BelowContent>
    </Root>
  );
}
