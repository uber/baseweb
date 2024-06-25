/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import {
  StyledRoot,
  StyledImage,
  StyledContentContainer,
  StyledHeadingContainer,
  StyledParagraphContainer,
} from './styled-components';
import { Button as DefaultButton, SHAPE, SIZE, KIND } from '../button';
import Delete from '../icon/delete';
import { useStyletron } from '../styles/index';
import { ThemeProvider, LightTheme } from '../';
import { getBackgroundColorType } from './utils';
import { primitiveColors as colors } from '../tokens';
import { getOverrides, mergeOverrides } from '../helpers/overrides';
import { IMAGE_LAYOUT, BACKGROUND_COLOR_TYPE, BUTTON_KIND } from './constants';
import type { MessageCardProps } from './types';

const ButtonAlwaysLightTheme = ({ children, ...restProps }) => (
  <ThemeProvider theme={LightTheme}>
    <DefaultButton {...restProps}>{children}</DefaultButton>
  </ThemeProvider>
);

const DefaultDismissButton = (props) => (
  <DefaultButton size={SIZE.compact} shape={SHAPE.circle} kind={KIND.secondary} {...props}>
    <Delete size={32} />
  </DefaultButton>
);

const MessageCard = ({
  backgroundColor = colors.white,
  backgroundColorType: backgroundColorTypeProp,
  buttonKind = BUTTON_KIND.secondary,
  buttonLabel,
  heading,
  image,
  onClick,
  onDismiss,
  overrides = {},
  paragraph,
}: MessageCardProps) => {
  const { src, layout = IMAGE_LAYOUT.top, backgroundPosition, ariaLabel } = image || {};

  const [, theme] = useStyletron();

  const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
  const [ContentContainer, ContentContainerProps] = getOverrides(
    overrides.ContentContainer,
    StyledContentContainer
  );
  const [HeadingContainer, headingContainerProps] = getOverrides(
    overrides.HeadingContainer,
    StyledHeadingContainer
  );
  const [ParagraphContainer, paragraphContainerProps] = getOverrides(
    overrides.ParagraphContainer,
    StyledParagraphContainer
  );
  const [Image, imageProps] = getOverrides(overrides.Image, StyledImage);
  const [ActionButton, actionButtonProps] = getOverrides(overrides.Button, ButtonAlwaysLightTheme);
  const [DismissButton, dismissButtonProps] = getOverrides(
    overrides.DismissButton,
    DefaultDismissButton
  );

  const defaultActionButtonOverrides = {
    BaseButton: {
      style: {
        textAlign: 'center',
        ...(onDismiss ? {} : { pointerEvents: 'none' }),
        ...(buttonKind === BUTTON_KIND.tertiary
          ? {
              marginTop: theme.sizing.scale100,
              transform:
                theme.direction === 'rtl'
                  ? `translateX(${theme.sizing.scale500})`
                  : `translateX(-${theme.sizing.scale500})`,
            }
          : {
              marginTop: theme.sizing.scale500,
            }),
      },
    },
  };
  actionButtonProps.overrides = mergeOverrides(
    defaultActionButtonOverrides,
    actionButtonProps.overrides
  );

  const defaultDismissButtonOverrides = {
    BaseButton: {
      style: {
        position: 'absolute',
        top: theme.sizing.scale200,
        right: theme.sizing.scale200,
        // using a pseudo-element to acheive a 48px tap target
        ':after': {
          content: '""',
          position: 'absolute',
          height: '48px',
          width: '48px',
        },
      },
    },
  };
  dismissButtonProps.overrides = mergeOverrides(
    defaultDismissButtonOverrides,
    dismissButtonProps.overrides
  );

  let backgroundColorType = backgroundColorTypeProp || getBackgroundColorType(backgroundColor);
  if (!backgroundColorType) {
    backgroundColorType = BACKGROUND_COLOR_TYPE.dark;
    if (__DEV__) {
      console.warn(
        `The provided value for 'backgroundColor', ${backgroundColor}, is not recognized as a \
        Base Web primitive color. Please use the 'backgroundColorType' prop to indicate whether\
         this color is light or dark so the rest of the component can be styled accordingly.`
      );
    }
  }

  let buttonColors;
  if (buttonKind === BUTTON_KIND.tertiary && backgroundColorType === BACKGROUND_COLOR_TYPE.dark) {
    buttonColors = {
      color: theme.colors.contentOnColor,
      backgroundColor: theme.colors.buttonTertiaryFill,
    };
  }
  if (buttonKind !== BUTTON_KIND.tertiary && backgroundColor !== colors.white) {
    buttonColors = {
      color: theme.colors.contentOnColorInverse,
      backgroundColor: theme.colors.backgroundAlwaysLight,
    };
  }

  return (
    <Root
      {...(onDismiss ? { $as: 'div' } : { onClick })}
      $backgroundColor={backgroundColor}
      $backgroundColorType={backgroundColorType}
      $imageLayout={layout}
      $isClickable={!onDismiss}
      {...rootProps}
    >
      {onDismiss && <DismissButton onClick={onDismiss} {...dismissButtonProps} />}
      {image && (
        <Image
          role="img"
          aria-label={ariaLabel}
          $src={src}
          $imageLayout={layout}
          $backgroundPosition={backgroundPosition}
          {...imageProps}
        />
      )}
      <ContentContainer {...ContentContainerProps}>
        {heading && <HeadingContainer {...headingContainerProps}>{heading}</HeadingContainer>}
        {paragraph && (
          <ParagraphContainer {...paragraphContainerProps}>{paragraph}</ParagraphContainer>
        )}
        {buttonLabel && (
          <ActionButton
            {...(onDismiss ? { onClick } : { $as: 'div', tabIndex: -1, role: 'none' })}
            kind={buttonKind}
            shape={SHAPE.pill}
            size={SIZE.compact}
            colors={buttonColors}
            {...actionButtonProps}
          >
            {buttonLabel}
          </ActionButton>
        )}
      </ContentContainer>
    </Root>
  );
};
export default MessageCard;
