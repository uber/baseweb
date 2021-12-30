/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {useStyletron} from '../../styles/index.js';
import {Label3} from '../../typography/index.js';
import {Block} from '../../block/index.js';

type TileGridPropsT = {
  // eslint-disable-next-line flowtype/no-weak-types
  children?: Array<any>,
  customizerOptions: Array<React.Node>,
  cols: number,
};

const TileGrid = ({children, customizerOptions, cols}: TileGridPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: {contentSecondary},
  } = theme;

  return (
    <Block>
      {customizerOptions && (
        <Block
          display="grid"
          gridTemplateColumns={`repeat(${customizerOptions.length}, 1fr)`}
          marginBottom="20px"
          gridGap="20px"
        >
          {customizerOptions}
        </Block>
      )}

      <Block
        display="grid"
        gridTemplateColumns={`repeat(${cols}, 1fr)`}
        gridGap="20px"
      >
        {children &&
          children.map((node, index) => {
            const {id: label, content} = node;
            return (
              <Block
                display="flex"
                flexDirection="column"
                height="150px"
                key={index}
              >
                <Label3 color={contentSecondary}>{label}</Label3>
                <Block
                  alignItems="center"
                  justifyContent="center"
                  flex="1"
                  display="flex"
                >
                  {content}
                </Block>
              </Block>
            );
          })}
      </Block>
    </Block>
  );
};

export default TileGrid;
