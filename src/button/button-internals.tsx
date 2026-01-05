/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import * as ReactIs from 'react-is';
import {
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
  getArtworkSize,
  StartEnhancerButtonContentContainer as StyledStartEnhancerButtonContentContainer,
} from './styled-components';
import { getSharedProps } from './utils';
import { getOverrides } from '../helpers/overrides';

import type { ButtonInternalsProps } from './types';
import { useStyletron } from '../styles';
import { WIDTH_TYPE } from './constants';

// @ts-ignore
function RenderEnhancer(props: {
  Enhancer: any;
  $isHovered: boolean;
  $isPressed: boolean;
  $isFocused: boolean;
  $artworkSize: string;
}) {
  const { Enhancer, $isHovered, $isPressed, $isFocused, $artworkSize, ...restProps } = props;
  if (typeof Enhancer === 'string') {
    return Enhancer;
  }
  if (typeof Enhancer === 'function') {
    return Enhancer({
      isHovered: $isHovered,
      isPressed: $isPressed,
      isFocused: $isFocused,
      artworkSize: $artworkSize,
    });
  }
  if (ReactIs.isValidElementType(Enhancer)) {
    return <Enhancer {...restProps} size={$artworkSize} />;
  }
  return Enhancer;
}

export default function ButtonInternals(props: ButtonInternalsProps) {
  const {
    children,
    overrides = {},
    isHovered = false,
    isPressed = false,
    isFocused = false,
    startEnhancer,
    endEnhancer,
    widthType,
  } = props;
  const [, theme] = useStyletron();
  const [StartEnhancer, startEnhancerProps] = getOverrides(
    overrides.StartEnhancer,
    StyledStartEnhancer
  );
  const [EndEnhancer, endEnhancerProps] = getOverrides(overrides.EndEnhancer, StyledEndEnhancer);
  const [StartEnhancerButtonContentContainer, startEnhancerButtonContentContainerProps] =
    getOverrides(
      overrides.StartEnhancerButtonContentContainer,
      StyledStartEnhancerButtonContentContainer
    );
  const sharedProps = {
    ...getSharedProps(props),
    $isHovered: isHovered,
    $isPressed: isPressed,
    $isFocused: isFocused,
  };
  const artworkSize = getArtworkSize({ $theme: theme, $size: sharedProps.$size });

  const startEnhancerButtonContent = (
    <>
      {startEnhancer !== null && startEnhancer !== undefined && (
        <StartEnhancer {...sharedProps} {...startEnhancerProps} aria-hidden={Boolean(children)}>
          <RenderEnhancer
            Enhancer={startEnhancer}
            $isHovered={isHovered}
            $isPressed={isPressed}
            $isFocused={isFocused}
            $artworkSize={artworkSize}
          />
        </StartEnhancer>
      )}
      {typeof children === 'function'
        ? children({
            isHovered,
            isPressed,
            isFocused,
            artworkSize,
          })
        : children}
    </>
  );

  const content = (
    <>
      {widthType === WIDTH_TYPE.fill ? (
        <StartEnhancerButtonContentContainer
          {...sharedProps}
          {...startEnhancerButtonContentContainerProps}
        >
          {startEnhancerButtonContent}
        </StartEnhancerButtonContentContainer>
      ) : (
        <>{startEnhancerButtonContent}</>
      )}
      {endEnhancer !== null && endEnhancer !== undefined && (
        <EndEnhancer {...sharedProps} {...endEnhancerProps} aria-hidden={Boolean(children)}>
          <RenderEnhancer
            Enhancer={endEnhancer}
            $isHovered={isHovered}
            $isPressed={isPressed}
            $isFocused={isFocused}
            $artworkSize={artworkSize}
          />
        </EndEnhancer>
      )}
    </>
  );

  if (props.isLoading) {
    const hiddenStyle = { opacity: 0, display: 'flex', height: '0px' };
    return <div style={hiddenStyle}>{content}</div>;
  }

  return <React.Fragment>{content}</React.Fragment>;
}
