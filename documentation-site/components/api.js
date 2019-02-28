/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Props from 'pretty-proptypes';

import {Block} from 'baseui/block';
import {Button, SIZE as ButtonSize, KIND as ButtonKind} from 'baseui/button';
import {Paragraph1} from 'baseui/typography';
import {Heading} from './markdown-elements';

const API = props => {
  const {heading, api} = props;
  return (
    <React.Fragment>
      <Heading element="h3" fontType="font600">
        {heading}
      </Heading>
      <Props
        props={api}
        heading={' '}
        shouldCollapseProps={true}
        components={{
          Description: props => {
            return <Paragraph1>{props.children}</Paragraph1>;
          },
          Button: props => {
            return (
              <Button
                {...props}
                size={ButtonSize.compact}
                kind={ButtonKind.tertiary}
              >
                {props.children}
              </Button>
            );
          },
          Indent: props => {
            return (
              <Block
                overrides={{
                  Block: {
                    style: ({$theme}) => ({
                      paddingLeft: $theme.sizing.scale600,
                    }),
                  },
                }}
              >
                {props.children}
              </Block>
            );
          },
          Required: props => {
            return (
              <Block as="span" color="negative">
                {props.children}
              </Block>
            );
          },
          Type: props => {
            return (
              <Block as="span" color="primary">
                {props.children}
              </Block>
            );
          },
          TypeMeta: props => {
            return (
              <Block as="span" color="warning400">
                {props.children}
              </Block>
            );
          },
          FunctionType: props => {
            return (
              <Block as="span" color="positive700">
                {props.children}
              </Block>
            );
          },
          StringType: props => {
            return (
              <Block as="span" color="positive">
                {props.children}
              </Block>
            );
          },
        }}
      />
    </React.Fragment>
  );
};

export default API;
