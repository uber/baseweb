/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  number as numberKnob,
  select as selectKnob,
} from '@storybook/addon-knobs';

import {styled} from '../styles';
import {Button, KIND} from '../button';
import * as Icons from './icon-exports';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
});

const Grid = styled('div', ({$size}) => ({
  display: 'grid',
  gridTemplateColumns: '20% 20% 20% 20% 20%',
  gridTemplateRows: '20% 20% 20% 20% 20%',
  width: `${$size}px`,
  height: `${$size}px`,
}));

const Buttons = styled('div', {
  maxWidth: '600px',
});

const ButtonContainer = styled('div', {
  display: 'inline-block',
  margin: '6px',
});

const GridItem = styled('div', ({row, col}) => ({
  alignSelf: 'center',
  justifySelf: 'center',
}));

export const suite = 'Icon Suite';

export const examples = {
  SIMPLE_EXAMPLE: 'Icon',
  BUTTON_EXAMPLE: 'Icons in Button',
};

export default {
  [examples.SIMPLE_EXAMPLE]: function Story1() {
    const size = selectKnob(
      'Size',
      ['12px', '16px', '24px', '36px', '48px', '64px'],
      '48px',
    );
    const sizeNum = parseInt(size);

    const hue = numberKnob('Color', 0, {range: true, min: 0, max: 360});
    const hsl = hue === 0 ? '#000' : `hsl(${hue}, 40%, 40%)`;
    const numCols = 5;

    return (
      <Centered>
        <Grid
          $size={
            // Plus two to add some extra padding between items
            sizeNum * (numCols + 2)
          }
        >
          {Object.keys(Icons).map(key => {
            const Icon = Icons[key];
            return (
              <GridItem key={key}>
                <Icon size={size} color={hsl} />
              </GridItem>
            );
          })}
        </Grid>
      </Centered>
    );
  },
  [examples.BUTTON_EXAMPLE]: function Story1() {
    const buttonKind = selectKnob(
      'Button Kind',
      [KIND.primary, KIND.secondary, KIND.tertiary, KIND.minimal],
      KIND.primary,
    );
    return (
      <Centered>
        <Buttons>
          {Object.keys(Icons).map(key => {
            const Icon = Icons[key];
            return (
              <ButtonContainer key={key}>
                <Button kind={buttonKind} endEnhancer={Icon}>
                  {Icon.name}
                </Button>
              </ButtonContainer>
            );
          })}
        </Buttons>
      </Centered>
    );
  },
};
