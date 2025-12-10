/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { ProgressBar, SIZE } from '../progress-bar';
import { SIZE as BTN_SIZE } from '../button';
import { SIZE as DIVIDER_SIZE } from '../divider';
import { ActionButton as DefaultActionButton } from './action-button';
import {
  StyledBottomContainer,
  StyledBody,
  StyledDescription,
  StyledDivider,
  StyledEmptyDiv,
  StyledGrabber,
  StyledHeader,
  StyledHeaderGrid,
  StyledHeaderTextContainer,
  StyledRoot,
  StyledTitle,
  StyledTopContainer,
} from './styled-components';
import type { SheetProps } from './types';

function renderBodyContent(content) {
  return typeof content === 'function' ? content() : content;
}

function renderActionButtonContent(content, buttonSize) {
  if (typeof content === 'string') {
    return content;
  }
  const Icon = content;
  return <Icon size={buttonSize === BTN_SIZE.compact ? 22 : 26} />;
}

export const Sheet = ({
  children,
  content,
  description,
  draggable = false,
  leadingAction,
  overrides = {},
  progressBar,
  title,
  topPosition,
  trailingAction,
}: SheetProps) => {
  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [TopContainer, topContainerProps] = getOverrides(
    overrides.TopContainer,
    StyledTopContainer
  );
  const [BottomContainer, bottomContainerProps] = getOverrides(
    overrides.BottomContainer,
    StyledBottomContainer
  );
  const [Header, headerProps] = getOverrides(overrides.Header, StyledHeader);
  const [Grabber, grabberProps] = getOverrides(overrides.Grabber, StyledGrabber);
  const [HeaderGrid, headerGridProps] = getOverrides(overrides.HeaderGrid, StyledHeaderGrid);
  const [ActionButton, actionButtonProps] = getOverrides(
    overrides.ActionButton,
    DefaultActionButton
  );
  const [EmptyDiv, emptyDivProps] = getOverrides(overrides.EmptyDiv, StyledEmptyDiv);
  const [HeaderTextContainer, HeaderTextContainerProps] = getOverrides(
    overrides.HeaderTextContainer,
    StyledHeaderTextContainer
  );
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [Description, descriptionProps] = getOverrides(overrides.Description, StyledDescription);
  const [Divider, dividerProps] = getOverrides(overrides.Divider, StyledDivider);
  const [Body, bodyProps] = getOverrides(overrides.Body, StyledBody);

  const hasTitle = Boolean(title);
  const hasDescription = Boolean(description);
  const hasLeadingAction = Boolean(leadingAction);
  const hasTrailingAction = Boolean(trailingAction);
  const buttonSize = hasTitle ? BTN_SIZE.default : BTN_SIZE.compact;

  const shouldDisplayHeader =
    draggable || hasTitle || hasDescription || hasLeadingAction || hasTrailingAction;

  return (
    <Root $draggable={draggable} {...rootProps}>
      <TopContainer $draggable={draggable} $topPosition={topPosition} {...topContainerProps}>
        {children}
      </TopContainer>

      <BottomContainer $draggable={draggable} $topPosition={topPosition} {...bottomContainerProps}>
        {shouldDisplayHeader && (
          <Header {...headerProps}>
            {draggable && <Grabber {...grabberProps} />}

            <HeaderGrid
              $hasLeadingAction={hasLeadingAction}
              $hasTrailingAction={hasTrailingAction}
              {...headerGridProps}
            >
              {leadingAction && (
                <ActionButton
                  onClick={leadingAction.onClick}
                  aria-label={leadingAction.label}
                  size={buttonSize}
                  {...actionButtonProps}
                >
                  {renderActionButtonContent(
                    leadingAction.renderIcon || leadingAction.label,
                    buttonSize
                  )}
                </ActionButton>
              )}
              {trailingAction && !leadingAction && <EmptyDiv {...emptyDivProps} />}
              {(hasTitle || hasDescription) && (
                <HeaderTextContainer
                  $draggable={draggable}
                  $hasTitle={hasTitle}
                  $hasDescription={hasDescription}
                  {...HeaderTextContainerProps}
                >
                  {title && <Title {...titleProps}>{title}</Title>}
                  {description && <Description {...descriptionProps}>{description}</Description>}
                </HeaderTextContainer>
              )}
              {trailingAction && (
                <ActionButton
                  onClick={trailingAction.onClick}
                  aria-label={trailingAction.label}
                  size={buttonSize}
                  {...actionButtonProps}
                >
                  {renderActionButtonContent(
                    trailingAction.renderIcon || trailingAction.label,
                    buttonSize
                  )}
                </ActionButton>
              )}
              {!trailingAction && leadingAction && <EmptyDiv {...emptyDivProps} />}
            </HeaderGrid>

            {progressBar ? (
              <ProgressBar
                overrides={{ BarContainer: { style: { marginTop: 0, marginBottom: 0 } } }}
                {...progressBar}
              />
            ) : (
              <Divider $size={DIVIDER_SIZE.section} {...dividerProps} />
            )}
          </Header>
        )}

        <Body {...bodyProps}>{renderBodyContent(content)}</Body>
      </BottomContainer>
    </Root>
  );
};

export default Sheet;
