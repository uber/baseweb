/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Props from 'pretty-proptypes';

import {Block} from 'baseui/block';
import {Button, SIZE as ButtonSize, KIND as ButtonKind} from 'baseui/button';
import {Paragraph3} from 'baseui/typography';
import {H3} from './markdown-elements';

const API = props => {
  const {heading, api} = props;
  return (
    <React.Fragment>
      <H3>{heading}</H3>
      <Block marginTop="-24px">
        <Props
          props={api}
          heading={' '}
          shouldCollapseProps={true}
          components={{
            Description: props => {
              return <Paragraph3 $as="div">{props.children}</Paragraph3>;
            },
            Button: props => {
              return (
                <Button
                  {...props}
                  size={ButtonSize.compact}
                  kind={ButtonKind.secondary}
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
      </Block>
    </React.Fragment>
  );
};

export default API;
