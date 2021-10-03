/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import * as ReactIs from 'react-is';

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

export function RenderNode(props) {
  const {component, ...restProps} = props;
  const Component = component;
  if (!Component) {
    return null;
  }
  if (typeof Component === 'string') {
    return Component;
  }
  if (ReactIs.isValidElementType(Component)) {
    // $FlowFixMe
    return <Component {...restProps} />;
  }
  // $FlowFixMe
  return Component;
}

function isMaxLinesValid(maxLines) {
  return maxLines === 1 || maxLines === 2;
}

const ListHeading = React.forwardRef<HeadingPropsT, HTMLLIElement>(
  (props: HeadingPropsT, ref) => {
    const {overrides = {}, maxLines} = props;
    const EndEnhancer = props.endEnhancer;
    const EndEnhancerDescription = props.endEnhancerDescription;
    const SubHeading = props.subHeading;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledHeadingRoot);
    const [Content, contentProps] = getOverrides(
      overrides.Content,
      StyledHeadingContent,
    );
    const [HeadingContainer, headingContainerProps] = getOverrides(
      overrides.HeadingContainer,
      StyledHeadingMainHeading,
    );
    const [SubHeadingContainer, subHeadingContainerProps] = getOverrides(
      overrides.SubHeadingContainer,
      StyledHeadingSubHeading,
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

    const isEndEnhancerString = typeof EndEnhancer === 'string';

    if (__DEV__) {
      if (isEndEnhancerString && EndEnhancerDescription) {
        console.warn(
          'endEnhancerDescription will not be rendered if endEnhancer is not a string',
        );
      }
      if (maxLines && !isMaxLinesValid(maxLines)) {
        console.warn('maxLines must be 1 or 2.');
      }
    }

    return (
      <Root
        // eslint-disable-next-line flowtype/no-weak-types
        ref={(ref: any)}
        {...rootProps}
      >
        <Content {...contentProps}>
          {/* ----- Top Row -------------------------- */}
          <StyledHeadingContentRow>
            <HeadingContainer
              $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1}
              {...headingContainerProps}
            >
              <RenderNode component={props.heading} />
            </HeadingContainer>

            {EndEnhancer && (
              <EndEnhancerContainer
                $isText={isEndEnhancerString}
                {...endEnhancerContainerProps}
              >
                <RenderNode component={EndEnhancer} />
              </EndEnhancerContainer>
            )}
          </StyledHeadingContentRow>

          {/* ----- Bottom Row ----------------------- */}
          {(SubHeading || EndEnhancerDescription) && (
            <StyledHeadingContentRow>
              <SubHeadingContainer
                $maxLines={isMaxLinesValid(maxLines) ? maxLines : 1}
                {...subHeadingContainerProps}
              >
                <RenderNode component={SubHeading} />
              </SubHeadingContainer>

              {EndEnhancerDescription && isEndEnhancerString && (
                <EndEnhancerDescriptionContainer
                  {...endEnhancerDescriptionContainerProps}
                >
                  <RenderNode component={EndEnhancerDescription} />
                </EndEnhancerDescriptionContainer>
              )}
            </StyledHeadingContentRow>
          )}
        </Content>
      </Root>
    );
  },
);
ListHeading.displayName = 'ListHeading';

export default ListHeading;
