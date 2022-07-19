/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { getOverrides } from '../helpers/overrides';
import {
  StyledRoot,
  StyledImage,
  StyledContentContainer,
  StyledHeadingContainer,
  StyledParagraphContainer,
  StyledButtonContainer,
} from './styled-components';
import { useStyletron } from '../styles/index.js';
import { colors } from '../tokens';
import type { MessageCardProps } from './types';
import { Button, KIND, SHAPE } from '../button';
import { IMAGE_LAYOUT, BACKGROUND_COLOR_TYPE, OBJECT_FIT } from './constants';
import { getBackgroundColorType } from './utils';

const MessageCard = ({
  heading,
  paragraph,
  image,
  buttonLabel,
  buttonKind = KIND.secondary,
  onClick,
  backgroundColor = colors.white,
  backgroundColorType: backgroundColorTypeProp,
  overrides = {},
}: MessageCardProps) => {
  const { src, layout = IMAGE_LAYOUT.top, objectFit = OBJECT_FIT.cover } = image || {};

  const [Root, RootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ContentContainer, ContentContainerProps] = getOverrides(
    overrides.ContentContainer,
    StyledContentContainer
  );
  const [HeadingContainer, HeadingContainerProps] = getOverrides(
    overrides.HeadingContainer,
    StyledHeadingContainer
  );
  const [ParagraphContainer, ParagraphContainerProps] = getOverrides(
    overrides.ParagraphContainer,
    StyledParagraphContainer
  );
  const [Image, ImageProps] = getOverrides(overrides.Image, StyledImage);
  const [ButtonContainer, ButtonContainerProps] = getOverrides(
    overrides.ButtonContainer,
    StyledButtonContainer
  );

  const [, theme] = useStyletron();

  let backgroundColorType = getBackgroundColorType(backgroundColor) || backgroundColorTypeProp;
  if (!backgroundColorType) {
    backgroundColorType = BACKGROUND_COLOR_TYPE.dark;
    if (__DEV__) {
      console.warn(
        `The provided value for 'backgroundColor', ${backgroundColor}, is not recognized as a \
        Base Web color primitive. Please use the 'backgroundColorType' prop to indicate whether\
         this color is light or dark so the rest of the component can be styled accordingly.`
      );
    }
  }

  let buttonColors;
  if (buttonKind === KIND.tertiary && backgroundColorType === BACKGROUND_COLOR_TYPE.dark) {
    buttonColors = {
      color: theme.colors.contentOnColor,
      backgroundColor: theme.colors.buttonTertiaryFill,
    };
  }
  if (buttonKind !== KIND.tertiary && backgroundColor !== colors.white) {
    buttonColors = { backgroundColor: theme.colors.backgroundAlwaysLight };
  }

  return (
    <Root
      onClick={onClick}
      $backgroundColor={backgroundColor}
      $backgroundColorType={backgroundColorType}
      $imageLayout={layout}
      {...RootProps}
    >
      {image && <Image $imageLayout={layout} src={src} $objectFit={objectFit} {...ImageProps} />}
      <ContentContainer {...ContentContainerProps}>
        {heading && <HeadingContainer {...HeadingContainerProps}>{heading}</HeadingContainer>}
        {paragraph && (
          <ParagraphContainer {...ParagraphContainerProps}>{paragraph}</ParagraphContainer>
        )}
        {buttonLabel && (
          <ButtonContainer $buttonKind={buttonKind} {...ButtonContainerProps}>
            <Button
              kind={buttonKind}
              shape={SHAPE.pill}
              role="none"
              tabIndex={-1}
              colors={buttonColors}
              overrides={{ BaseButton: { style: { pointerEvents: 'none' } } }}
            >
              {buttonLabel}
            </Button>
          </ButtonContainer>
        )}
      </ContentContainer>
    </Root>
  );
};
export default MessageCard;
