/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {getOverrides} from '../helpers/overrides.js';

import {
  StyledHeadingRoot,
  StyledHeadingContent,
  StyledHeadingContentRow,
  StyledHeadingEndEnhancerContainer,
  StyledHeadingEndEnhancerDescriptionContainer,
  StyledHeadingMainHeading,
  StyledHeadingSubHeading,
} from './styled-components.js';
import type {HeadingPropsT} from './types.js';

const ListHeading = React.forwardRef<HeadingPropsT, HTMLLIElement>(
  (props: HeadingPropsT, ref) => {
    const {overrides = {}} = props;
    const EndEnhancer = props.endEnhancer;
    const endEnhancerIsString = typeof EndEnhancer === 'string';

    const [Root, rootProps] = getOverrides(overrides.Root, StyledHeadingRoot);
    const [Content, contentProps] = getOverrides(
      overrides.Content,
      StyledHeadingContent,
    );
    const [EndEnhancerContainer, endEnhancerContainerProps] = getOverrides(
      overrides.EndEnhancerContainer,
      StyledHeadingEndEnhancerContainer,
    );

    const [
      EndEnhancerDescriptionContainer,
      endEnhancerDescriptionContainerProps,
    ] = getOverrides(
      overrides.EndEnhancerDescriptionContainer,
      StyledHeadingEndEnhancerDescriptionContainer,
    );

    const [Heading, labelContentProps] = getOverrides(
      overrides.HeadingContainer,
      StyledHeadingMainHeading,
    );
    const [SubHeading, labelDescriptionProps] = getOverrides(
      overrides.SubHeadingContainer,
      StyledHeadingSubHeading,
    );

    return (
      <Root
        // eslint-disable-next-line flowtype/no-weak-types
        ref={(ref: any)}
        {...rootProps}
      >
        <Content {...contentProps}>
          <StyledHeadingContentRow>
            <Heading $maxLines={props.maxLines} {...labelContentProps}>
              {props.heading}
            </Heading>

            {EndEnhancer && EndEnhancer !== 0 && (
              <EndEnhancerContainer
                $isText={endEnhancerIsString}
                {...endEnhancerContainerProps}
              >
                {endEnhancerIsString ? EndEnhancer : <EndEnhancer />}
              </EndEnhancerContainer>
            )}
          </StyledHeadingContentRow>

          <StyledHeadingContentRow>
            <SubHeading {...labelDescriptionProps}>
              {props.subHeading}
            </SubHeading>

            {EndEnhancer && EndEnhancer !== 0 && (
              <EndEnhancerDescriptionContainer
                {...endEnhancerDescriptionContainerProps}
              >
                {props.endEnhancerDescription}
              </EndEnhancerDescriptionContainer>
            )}
          </StyledHeadingContentRow>
        </Content>
      </Root>
    );
  },
);
ListHeading.displayName = 'ListHeading';

export default ListHeading;
