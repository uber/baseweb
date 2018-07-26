// @flow
import React from 'react';
import {styled} from '../../styles';
import {Button} from '../popover/examples';
import {StatefulTooltip, TRIGGER_TYPE, PLACEMENT} from './index';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '90vh',
  lineHeight: 1.5,
});

const FakeLink = styled('span', props => ({
  borderBottom: `1px dotted ${props.$theme.colors.primary500}`,
  color: props.$theme.colors.primary500,
}));

const Paragraph = styled('p', props => ({
  margin: '0 0 8px',
  ':last-child': {
    marginBottom: '0px',
  },
}));

const Anchor = styled('a', props => ({
  color: 'white',
}));

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

export default [
  {
    description: 'Tooltip',
    example() {
      return (
        <Centered>
          <div style={{maxWidth: '360px'}}>
            You can use tooltips in many places, including inline text{' '}
            <StatefulTooltip content="Tooltips display short messages.">
              <FakeLink tabIndex="0">such as this</FakeLink>
            </StatefulTooltip>. Tooltips are essentially just a Popover with a
            few style tweaks, so you can use all the features that Popover
            supports.
          </div>
        </Centered>
      );
    },
  },
  {
    description: 'Tooltip multiline',
    example() {
      return (
        <Centered>
          <div>
            <StatefulTooltip
              content="Tooltips don't have a maximum width by default, but you can set one easily through the overrides prop. The default typography styles make multi-line text look great."
              overrides={{Inner: {style: {maxWidth: '200px'}}}}
            >
              <FakeLink tabIndex="0">Hover Me</FakeLink>
            </StatefulTooltip>
          </div>
        </Centered>
      );
    },
  },
  {
    description: 'Tooltip complex content',
    example() {
      return (
        <Centered>
          <div>
            <StatefulTooltip
              content={
                <div>
                  <Paragraph>
                    Tooltips also support rendering arbitrary content.
                  </Paragraph>
                  <Paragraph>
                    This in includes paragraphs,{' '}
                    <Anchor
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      links
                    </Anchor>, and any other markup.
                  </Paragraph>
                </div>
              }
              overrides={{Inner: {style: {maxWidth: '200px'}}}}
            >
              <FakeLink tabIndex="0">Hover Me</FakeLink>
            </StatefulTooltip>
          </div>
        </Centered>
      );
    },
  },
  {
    description: 'Tooltip via click',
    example() {
      return (
        <Centered>
          <div>
            <StatefulTooltip
              triggerType={TRIGGER_TYPE.click}
              content="Bonjour!"
            >
              <Button>Click Me</Button>
            </StatefulTooltip>
          </div>
        </Centered>
      );
    },
  },
  {
    description: 'Tooltip placements',
    example() {
      let sharedProps = {
        triggerType: TRIGGER_TYPE.click,
        content: 'Bonjour!',
      };
      return (
        <Centered>
          <Grid>
            <GridItem row={1} col={2}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.topLeft}>
                <Button>TL</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={1} col={3}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.top}>
                <Button>Top</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={1} col={4}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.topRight}>
                <Button>TR</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={2} col={1}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.leftTop}>
                <Button>LT</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={3} col={1}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.left}>
                <Button>Left</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={4} col={1}>
              <StatefulTooltip
                {...sharedProps}
                placement={PLACEMENT.leftBottom}
              >
                <Button>LB</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={5} col={2}>
              <StatefulTooltip
                {...sharedProps}
                placement={PLACEMENT.bottomLeft}
              >
                <Button>BL</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={5} col={3}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.bottom}>
                <Button>Bottom</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={5} col={4}>
              <StatefulTooltip
                {...sharedProps}
                placement={PLACEMENT.bottomRight}
              >
                <Button>BR</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={2} col={5}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.rightTop}>
                <Button>RT</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={3} col={5}>
              <StatefulTooltip {...sharedProps} placement={PLACEMENT.right}>
                <Button>Right</Button>
              </StatefulTooltip>
            </GridItem>
            <GridItem row={4} col={5}>
              <StatefulTooltip
                {...sharedProps}
                placement={PLACEMENT.rightBottom}
              >
                <Button>RB</Button>
              </StatefulTooltip>
            </GridItem>
          </Grid>
        </Centered>
      );
    },
  },
  {
    description: 'Tooltip style overrides',
    example() {
      return (
        <Centered>
          <StatefulTooltip
            initialState={{isOpen: true}}
            showArrow
            overrides={{
              Arrow: {
                style: {
                  backgroundColor: 'lavender',
                },
              },
              Body: {
                style: {
                  backgroundColor: 'lavender',
                  borderRadius: 0,
                },
              },
              Inner: {
                style: {
                  backgroundColor: 'lavender',
                  borderRadius: 0,
                  color: '#8181a0',
                  fontSize: '28px',
                  lineHeight: 1.2,
                  fontStyle: 'italic',
                },
              },
            }}
            content="Bonjour!"
          >
            <FakeLink tabIndex="0">Hover Me</FakeLink>
          </StatefulTooltip>
        </Centered>
      );
    },
  },
];
