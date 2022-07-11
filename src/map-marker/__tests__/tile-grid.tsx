/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../../styles';
import { LabelSmall } from '../../typography';
import { Block } from '../../block';

type TileGridPropsT = {
  children?: Array<any>;
  customizerOptions: Array<React.ReactNode>;
  cols: number;
};

const TileGrid = ({ children, customizerOptions, cols }: TileGridPropsT) => {
  const [, theme] = useStyletron();
  const {
    colors: { contentSecondary },
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

      <Block display="grid" gridTemplateColumns={`repeat(${cols}, 1fr)`} gridGap="20px">
        {children &&
          children.map((node, index) => {
            const { id: label, content } = node;
            return (
              <Block display="flex" flexDirection="column" height="150px" key={index}>
                <LabelSmall color={contentSecondary}>{label}</LabelSmall>
                <Block alignItems="center" justifyContent="center" flex="1" display="flex">
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
