// @flow
import React from 'react';
import {boolean, text} from '@storybook/addon-knobs';

import {styled} from '../styles';
import {
  PLACEMENT,
  TRIGGER_TYPE,
  Popover,
  StatefulPopover,
  StyledPadding as StyledPopoverPadding,
} from './index';

function popoverContent() {
  return (
    <StyledPopoverPadding>
      <div>
        <strong>The quick brown fox</strong>
      </div>
      <div>Jumped over the lazy dog</div>
    </StyledPopoverPadding>
  );
}

// TODO replace with real button when its available
const Button = styled('button', ({$theme}) => ({
  padding: `${$theme.sizing.scale200} ${$theme.sizing.scale400}`,
  fontWeight: 'bold',
  backgroundColor: $theme.colors.buttonPrimaryFill,
  borderRadius: '3px',
  border: 'none',
  color: '#fff',
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: '0.2s',
  fontSize: '14px',
  ':hover': {
    backgroundColor: $theme.colors.buttonPrimaryHover,
  },
  ':focus': {
    backgroundColor: $theme.colors.buttonPrimaryHover,
  },
  ':active': {
    backgroundColor: $theme.colors.buttonPrimaryActive,
  },
}));

const Container = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '20% 20% 20% 20% 20%',
  gridTemplateRows: '20% 20% 20% 20% 20%',
  width: '380px',
  height: '250px',
  margin: '100px auto',
});

const GridItem = styled('div', ({row, col}) => ({
  gridColumnStart: col,
  gridRowStart: row,
  textAlign: 'center',
}));

export default [
  {
    description: 'stateless popover',
    example: function Story1() {
      return (
        <Popover isOpen={boolean('isOpen', true)} content={popoverContent}>
          <Button>{text('label', 'Open')}</Button>
        </Popover>
      );
    },
  },
  {
    description: 'stateful popover (click)',
    example: function Story2() {
      return (
        <StatefulPopover content={popoverContent}>
          <Button>Press Me</Button>
        </StatefulPopover>
      );
    },
  },
  {
    description: 'stateful popover (hover)',
    example: function Story3() {
      return (
        <StatefulPopover
          triggerType={TRIGGER_TYPE.hover}
          content={popoverContent}
        >
          <Button>Hover Me</Button>
        </StatefulPopover>
      );
    },
  },
  {
    description: 'popover placements',
    example: function Story4() {
      return (
        <Container>
          <Grid>
            <GridItem row={1} col={2}>
              <StatefulPopover
                placement={PLACEMENT.topLeft}
                content={popoverContent}
              >
                <Button>TL</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={1} col={3}>
              <StatefulPopover
                placement={PLACEMENT.top}
                content={popoverContent}
              >
                <Button>Top</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={1} col={4}>
              <StatefulPopover
                placement={PLACEMENT.topRight}
                content={popoverContent}
              >
                <Button>TR</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={2} col={1}>
              <StatefulPopover
                placement={PLACEMENT.leftTop}
                content={popoverContent}
              >
                <Button>LT</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={3} col={1}>
              <StatefulPopover
                placement={PLACEMENT.left}
                content={popoverContent}
              >
                <Button>Left</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={4} col={1}>
              <StatefulPopover
                placement={PLACEMENT.leftBottom}
                content={popoverContent}
              >
                <Button>LB</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={5} col={2}>
              <StatefulPopover
                placement={PLACEMENT.bottomLeft}
                content={popoverContent}
              >
                <Button>BL</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={5} col={3}>
              <StatefulPopover
                placement={PLACEMENT.bottom}
                content={popoverContent}
              >
                <Button>Bottom</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={5} col={4}>
              <StatefulPopover
                placement={PLACEMENT.bottomRight}
                content={popoverContent}
              >
                <Button>BR</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={2} col={5}>
              <StatefulPopover
                placement={PLACEMENT.rightTop}
                content={popoverContent}
              >
                <Button>RT</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={3} col={5}>
              <StatefulPopover
                placement={PLACEMENT.right}
                content={popoverContent}
              >
                <Button>Right</Button>
              </StatefulPopover>
            </GridItem>
            <GridItem row={4} col={5}>
              <StatefulPopover
                placement={PLACEMENT.rightBottom}
                content={popoverContent}
              >
                <Button>RB</Button>
              </StatefulPopover>
            </GridItem>
          </Grid>
        </Container>
      );
    },
  },
  {
    description: 'popover w/ arrow',
    example: function Story5() {
      return (
        <StatefulPopover
          content={popoverContent}
          showArrow
          triggerType={TRIGGER_TYPE.hover}
        >
          <Button>Hover Me</Button>
        </StatefulPopover>
      );
    },
  },
];
