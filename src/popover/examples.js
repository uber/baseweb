/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {boolean, number} from '@storybook/addon-knobs';

import {Button} from '../button/index.js';
import {styled} from '../styles/index.js';
import {
  PLACEMENT,
  TRIGGER_TYPE,
  Popover,
  StatefulPopover,
  StyledPadding as StyledPopoverPadding,
} from './index.js';

import examples from './examples-list.js';

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

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
});

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '20% 20% 20% 20% 20%',
  gridTemplateRows: '20% 20% 20% 20% 20%',
  width: '380px',
  height: '250px',
});

const GridItem = styled('div', ({row, col}) => ({
  gridColumnStart: col,
  gridRowStart: row,
  textAlign: 'center',
}));

const Content = styled('div', {
  paddingBottom: '24px',
});

/* eslint-disable flowtype/no-weak-types */
const knobIsOpen = (defaultValue = true) => boolean('isOpen', defaultValue);
const knobDismissOnEsc = (defaultValue = true) =>
  boolean('dismissOnEsc', defaultValue);
const knobDismissOnClickOutside = (defaultValue = true) =>
  boolean('dismissOnClickOutside', defaultValue);

const knobOnMouseEnterDelay: any = (defaultValue = 200) =>
  number('onMouseEnterDelay', defaultValue, {range: true, min: 0, max: 1000});
const knobOnMouseLeaveDelay: any = (defaultValue = 200) =>
  number('onMouseLeaveDelay', defaultValue, {range: true, min: 0, max: 1000});
/* eslint-enable flowtype/no-weak-types */

export default {
  [examples.SIMPLE_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Popover isOpen={knobIsOpen()} content={popoverContent}>
          <Button>Open</Button>
        </Popover>
      </Centered>
    );
  },
  [examples.WITH_CLICK]: function Story2() {
    return (
      <Centered>
        <StatefulPopover
          content={popoverContent}
          dismissOnEsc={knobDismissOnEsc()}
          dismissOnClickOutside={knobDismissOnClickOutside()}
          accessibilityType={'tooltip'}
        >
          <Button>Press Me</Button>
        </StatefulPopover>
      </Centered>
    );
  },
  [examples.WITH_HOVER]: function Story3() {
    return (
      <Centered>
        <StatefulPopover
          triggerType={TRIGGER_TYPE.hover}
          content={popoverContent}
          onMouseEnterDelay={knobOnMouseEnterDelay()}
          onMouseLeaveDelay={knobOnMouseLeaveDelay()}
          accessibilityType={'tooltip'}
        >
          <Button>Hover Me</Button>
        </StatefulPopover>
      </Centered>
    );
  },
  [examples.PLACEMENTS]: function Story4() {
    return (
      <Centered>
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
            <StatefulPopover placement={PLACEMENT.top} content={popoverContent}>
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
      </Centered>
    );
  },
  [examples.ARROW]: function Story5() {
    return (
      <Centered>
        <StatefulPopover
          showArrow
          initialState={{isOpen: true}}
          content={popoverContent}
          triggerType={TRIGGER_TYPE.hover}
        >
          <Button>Hover Me</Button>
        </StatefulPopover>
      </Centered>
    );
  },
  [examples.CLOSE_CALLBACK]: function Story6() {
    return (
      <Centered>
        <StatefulPopover
          initialState={{isOpen: true}}
          content={({close}) => (
            <StyledPopoverPadding $style={{maxWidth: '300px', lineHeight: 1.5}}>
              <Content>
                content render prop is passed a <code>close()</code> callback so
                it you can manually trigger popover close from within
              </Content>
              <Button onClick={close}>Dismiss</Button>
            </StyledPopoverPadding>
          )}
        >
          <Button>Click Me</Button>
        </StatefulPopover>
      </Centered>
    );
  },
  [examples.CLIPPING]: function Story7() {
    return (
      <Centered>
        <div style={{width: '300px', height: '300px', overflow: 'auto'}}>
          <div
            style={{
              width: '100%',
              height: '700px',
              padding: '140px 0',
              backgroundColor: '#ccc',
              textAlign: 'center',
            }}
          >
            <StatefulPopover
              initialState={{isOpen: true}}
              content={() => (
                <StyledPopoverPadding $style={{maxWidth: '230px'}}>
                  Popover will reposition itself to avoid being clipped!
                  <br />
                  <strong>Try scrolling in this box...</strong>
                </StyledPopoverPadding>
              )}
              placement={PLACEMENT.top}
            >
              <Button>Click Me</Button>
            </StatefulPopover>
          </div>
        </div>
      </Centered>
    );
  },
  [examples.STYLE_OVERRIDES]: function Story8() {
    const hue = number('Color', 100, {range: true, min: 0, max: 360});
    const hsl = `hsl(${hue}, 40%, 40%)`;

    return (
      <Centered>
        <StatefulPopover
          initialState={{isOpen: true}}
          showArrow
          overrides={{
            Arrow: {
              style: {
                backgroundColor: hsl,
              },
            },
            Body: {
              style: {
                backgroundColor: hsl,
                borderRadius: 0,
              },
            },
            Inner: {
              style: {
                backgroundColor: hsl,
                borderRadius: 0,
                color: '#fff',
              },
            },
          }}
          content={popoverContent}
        >
          <Button>Click Me</Button>
        </StatefulPopover>
      </Centered>
    );
  },
};
