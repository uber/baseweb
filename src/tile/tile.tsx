/*
Copyright (c) Uber Technologies, Inc.
This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import {
  StyledTileRoot,
  StyledHeaderContainer,
  StyledLeadingContentContainer,
  StyledBodyContainer,
  StyledLabel,
  StyledTrailingContentContainer,
  StyledBodyContainerContent,
} from './styled-components';
import type { TileProps } from './types';
import { shouldRenderHeaderContainer } from './utils';

const Tile = React.forwardRef(
  (
    {
      children,
      tileKind,
      overrides = {},
      label,
      leadingContent,
      trailingContent,
      headerAlignment,
      bodyAlignment,
      selected,
      onClick,
      disabled,
    }: TileProps,
    ref
  ) => {
    const [Root, rootProps] = getOverrides(overrides.Root, StyledTileRoot);
    const [HeaderContainer, headerContainerProps] = getOverrides(
      overrides.HeaderContainer,
      StyledHeaderContainer
    );
    const [BodyContainer, bodyContainerProps] = getOverrides(
      overrides.BodyContainer,
      StyledBodyContainer
    );
    const [LeadingContentContainer, leadingContentContainerProps] = getOverrides(
      overrides.LeadingContent,
      StyledLeadingContentContainer
    );
    const [TrailingContentContainer, trailingContentContainerProps] = getOverrides(
      overrides.TrailingContent,
      StyledTrailingContentContainer
    );

    const [BodyContainerContent, bodyContainerContentProps] = getOverrides(
      overrides.BodyContainerContent,
      StyledBodyContainerContent
    );
    const [LabelContainer, labelContainerProps] = getOverrides(overrides.Label, StyledLabel);

    const LeadingContent = leadingContent;
    const TrailingContent = trailingContent;

    let Label: unknown;

    if (typeof label === 'string') {
      Label = (
        <LabelContainer {...labelContainerProps} $disabled={disabled}>
          {label}
        </LabelContainer>
      );
    } else if (label) {
      Label = label;
    }

    const renderTopContainer = shouldRenderHeaderContainer(leadingContent, trailingContent);

    return (
      <Root
        data-baseweb="tile"
        ref={ref}
        {...rootProps}
        $tileKind={tileKind}
        $selected={selected}
        onClick={onClick}
        $disabled={disabled}
        disabled={disabled}
      >
        {renderTopContainer && (
          <HeaderContainer
            {...headerContainerProps}
            $leadingContent={leadingContent ? true : false}
            $trailingContent={trailingContent ? true : false}
            $alignment={headerAlignment}
          >
            {LeadingContent && (
              <LeadingContentContainer {...leadingContentContainerProps} $disabled={disabled}>
                <LeadingContent />
              </LeadingContentContainer>
            )}
            {TrailingContent && (
              <TrailingContentContainer {...trailingContentContainerProps} $disabled={disabled}>
                <TrailingContent />
              </TrailingContentContainer>
            )}
          </HeaderContainer>
        )}
        <BodyContainer {...bodyContainerProps} $alignment={bodyAlignment}>
          <BodyContainerContent {...bodyContainerContentProps}>
            {Label && Label}
            {children}
          </BodyContainerContent>
        </BodyContainer>
      </Root>
    );
  }
);

Tile.displayName = 'Tile';

export default Tile;
