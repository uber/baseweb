/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactIs from 'react-is';

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

function RenderNode(props) {
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

const ListHeading = React.forwardRef<HeadingPropsT, HTMLLIElement>(
  (props: HeadingPropsT, ref) => {
    const {overrides = {}} = props;
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

    if (isEndEnhancerString && EndEnhancerDescription) {
      console.warn(
        'endEnhancerDescription will not be rendered if endEnhancer is not a string',
      );
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
              $maxLines={props.maxLines}
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
              <SubHeadingContainer {...subHeadingContainerProps}>
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
