/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { getOverrides } from '../helpers/overrides';
import { useStyletron } from '../styles/index';
import { StyledDivider, SIZE } from '../divider';
import { Button, KIND, SHAPE } from '../button';
import {
  StyledRoot,
  StyledBottomContainer,
  StyledHeader,
  StyledHeaderInner,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledGrabber,
} from './styled-components';
import type { BottomSheetProps } from './types';

const renderContent = (content) => {
  return typeof content === 'function' ? content() : content;
};

const renderButtonContent = (content) => {
  if (typeof content === 'string') {
    return content;
  }
  const Icon = content;
  return <Icon size={32} />;
};

const DefaultActionButton = ({ children, ...restProps }) => {
  const hasTextContent = typeof children === 'string';

  const style = {
    ...(!hasTextContent
      ? {
          height: '48px',
          width: '48px',
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }
      : {}),
  };

  return (
    <Button
      kind={KIND.tertiary}
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style,
        },
      }}
      {...restProps}
    >
      {children}
    </Button>
  );
};

export function BottomSheet({
  overrides = {},
  title,
  description,
  content,
  positions,
  leadingAction,
  trailingAction,
  progressBar,
  children,
}: BottomSheetProps) {
  const [positionIdx, setPositionIdx] = React.useState(0);

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [BottomContainer, bottomContainerProps] = getOverrides(
    overrides.BottomContainer,
    StyledBottomContainer
  );
  const [Header, headerProps] = getOverrides(overrides.Header, StyledHeader);
  const [HeaderInner, headerInnerProps] = getOverrides(overrides.HeaderInner, StyledHeaderInner);
  const [Title, titleProps] = getOverrides(overrides.Title, StyledTitle);
  const [Description, descriptionProps] = getOverrides(overrides.Description, StyledDescription);
  const [Content, contentProps] = getOverrides(overrides.Content, StyledContent);
  const [Grabber, grabberProps] = getOverrides(overrides.Grabber, StyledGrabber);
  const [Divider, dividerProps] = getOverrides(overrides.Divider, StyledDivider);
  const [ActionButton, actionButtonProps] = getOverrides(overrides.Divider, DefaultActionButton);

  const cyclePosition = () => {
    const nextPositionIdx = positionIdx + 1;
    if (nextPositionIdx < positions.length) {
      setPositionIdx(nextPositionIdx);
    } else {
      setPositionIdx(0);
    }
  };

  const isDraggable = Boolean(positions); // TODO: deduce this based on props, or make this a prop
  return (
    <Root {...rootProps}>
      {children}
      <BottomContainer $position={isDraggable && positions[positionIdx]} {...bottomContainerProps}>
        <Header $isDraggable={isDraggable} {...headerProps}>
          {leadingAction && (
            <ActionButton
              onClick={leadingAction.onClick}
              aria-label={leadingAction.label}
              {...actionButtonProps}
            >
              {renderButtonContent(leadingAction.renderIcon || leadingAction.label)}
            </ActionButton>
          )}
          <HeaderInner>
            {isDraggable && <Grabber onClick={cyclePosition} {...grabberProps} />}
            {title && <Title {...titleProps}>{title}</Title>}
            {description && <Description {...descriptionProps}>{description}</Description>}
          </HeaderInner>
          {trailingAction && (
            <ActionButton
              onClick={trailingAction.onClick}
              aria-label={trailingAction.label}
              {...actionButtonProps}
            >
              {renderButtonContent(trailingAction.renderIcon || trailingAction.label)}
            </ActionButton>
          )}
        </Header>
        {progressBar ? (
          renderContent(progressBar)
        ) : (
          <Divider $size={SIZE.section} {...dividerProps} />
        )}
        <Content {...contentProps}>{renderContent(content)}</Content>
      </BottomContainer>
    </Root>
  );
}

export default BottomSheet;
