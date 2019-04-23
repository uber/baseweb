/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import Block from '../block.js';

function retrieveStyles(element: React.Node) {
  return mount(element)
    .childAt(0)
    .instance()
    .getStyles();
}

describe('Block', () => {
  it('renders themed color if provided', () => {
    expect(
      retrieveStyles(<Block color="primary200">test</Block>),
    ).toMatchObject({color: '$theme.colors.primary200'});
  });

  it('renders provided color if no matching themeable value is found', () => {
    expect(retrieveStyles(<Block color="red">test</Block>)).toMatchObject({
      color: 'red',
    });
  });

  it('renders themed font if provided', () => {
    expect(retrieveStyles(<Block font="font200">test</Block>)).toMatchObject({
      fontFamily: '$theme.typography.font200.fontFamily',
      fontSize: '$theme.typography.font200.fontSize',
      fontWeight: '$theme.typography.font200.fontWeight',
    });
  });

  it('renders alignContent style if provided', () => {
    expect(
      retrieveStyles(<Block alignContent="start">test</Block>),
    ).toMatchObject({
      alignContent: 'start',
    });
  });

  it('renders alignItems style if provided', () => {
    expect(
      retrieveStyles(<Block alignItems="start">test</Block>),
    ).toMatchObject({
      alignItems: 'start',
    });
  });

  it('renders flexDirection style if provided', () => {
    expect(
      retrieveStyles(<Block flexDirection="row">test</Block>),
    ).toMatchObject({
      flexDirection: 'row',
    });
  });

  it('renders display style if provided', () => {
    expect(
      retrieveStyles(<Block display="inline-block">test</Block>),
    ).toMatchObject({
      display: 'inline-block',
    });
  });

  it('renders flex style if provided', () => {
    expect(retrieveStyles(<Block flex="grow">test</Block>)).toMatchObject({
      flex: 'grow',
    });
  });

  it('renders grid style if provided', () => {
    expect(
      retrieveStyles(<Block grid="100px / 200px">test</Block>),
    ).toMatchObject({
      grid: '100px / 200px',
    });
  });

  it('renders gridArea style if provided', () => {
    expect(retrieveStyles(<Block gridArea="auto">test</Block>)).toMatchObject({
      gridArea: 'auto',
    });
  });

  it('renders gridAutoColumns style if provided', () => {
    expect(
      retrieveStyles(<Block gridAutoColumns="min-content">test</Block>),
    ).toMatchObject({
      gridAutoColumns: 'min-content',
    });
  });

  it('renders gridAutoFlow style if provided', () => {
    expect(
      retrieveStyles(<Block gridAutoFlow="row dense">test</Block>),
    ).toMatchObject({
      gridAutoFlow: 'row dense',
    });
  });

  it('renders gridAutoRows style if provided', () => {
    expect(
      retrieveStyles(<Block gridAutoRows="20cm">test</Block>),
    ).toMatchObject({
      gridAutoRows: '20cm',
    });
  });

  it('renders gridColumn style if provided', () => {
    expect(
      retrieveStyles(<Block gridColumn="1 / 3">test</Block>),
    ).toMatchObject({
      gridColumn: '1 / 3',
    });
  });

  it('renders gridColumnEnd style if provided', () => {
    expect(
      retrieveStyles(<Block gridColumnEnd="span 3">test</Block>),
    ).toMatchObject({
      gridColumnEnd: 'span 3',
    });
  });

  it('renders gridColumnGap style if provided', () => {
    expect(
      retrieveStyles(<Block gridColumnGap="scale800">test</Block>),
    ).toMatchObject({
      gridColumnGap: '$theme.sizing.scale800',
    });
  });

  it('renders gridColumnStart style if provided', () => {
    expect(
      retrieveStyles(<Block gridColumnStart="span 2">test</Block>),
    ).toMatchObject({
      gridColumnStart: 'span 2',
    });
  });

  it('renders gridGap style if provided', () => {
    expect(retrieveStyles(<Block gridGap="50px">test</Block>)).toMatchObject({
      gridGap: '50px',
    });
  });

  it('renders gridRow style if provided', () => {
    expect(retrieveStyles(<Block gridRow="1">test</Block>)).toMatchObject({
      gridRow: '1',
    });
  });

  it('renders gridRowStart style if provided', () => {
    expect(retrieveStyles(<Block gridRowStart="-1">test</Block>)).toMatchObject(
      {
        gridRowStart: '-1',
      },
    );
  });

  it('renders gridRowEnd style if provided', () => {
    expect(retrieveStyles(<Block gridRowEnd="2">test</Block>)).toMatchObject({
      gridRowEnd: '2',
    });
  });

  it('renders gridTemplate style if provided', () => {
    expect(
      retrieveStyles(<Block gridTemplate="1fr / 1fr">test</Block>),
    ).toMatchObject({
      gridTemplate: '1fr / 1fr',
    });
  });

  it('renders gridTemplateAreas style if provided', () => {
    expect(
      retrieveStyles(<Block gridTemplateAreas="inherit">test</Block>),
    ).toMatchObject({
      gridTemplateAreas: 'inherit',
    });
  });

  it('renders gridTemplateColumns style if provided', () => {
    expect(
      retrieveStyles(<Block gridTemplateColumns="1fr 60px">test</Block>),
    ).toMatchObject({
      gridTemplateColumns: '1fr 60px',
    });
  });

  it('renders gridTemplateRows style if provided', () => {
    expect(
      retrieveStyles(<Block gridTemplateRows="auto">test</Block>),
    ).toMatchObject({
      gridTemplateRows: 'auto',
    });
  });

  it('renders justifyContent style if provided', () => {
    expect(
      retrieveStyles(<Block justifyContent="start">test</Block>),
    ).toMatchObject({
      justifyContent: 'start',
    });
  });

  it('renders justifyItems style if provided', () => {
    expect(
      retrieveStyles(<Block justifyItems="center">test</Block>),
    ).toMatchObject({
      justifyItems: 'center',
    });
  });

  it('renders justifySelf style if provided', () => {
    expect(
      retrieveStyles(<Block justifySelf="start">test</Block>),
    ).toMatchObject({
      justifySelf: 'start',
    });
  });

  it('renders position style if provided', () => {
    expect(retrieveStyles(<Block position="static">test</Block>)).toMatchObject(
      {
        position: 'static',
      },
    );
  });

  it('renders width style if provided', () => {
    expect(retrieveStyles(<Block width="100px">test</Block>)).toMatchObject({
      width: '100px',
    });
  });

  it('renders minWidth style if provided', () => {
    expect(retrieveStyles(<Block minWidth="100px">test</Block>)).toMatchObject({
      minWidth: '100px',
    });
  });

  it('renders maxWidth style if provided', () => {
    expect(retrieveStyles(<Block maxWidth="100px">test</Block>)).toMatchObject({
      maxWidth: '100px',
    });
  });

  it('renders height style if provided', () => {
    expect(retrieveStyles(<Block height="100px">test</Block>)).toMatchObject({
      height: '100px',
    });
  });

  it('renders minHeight style if provided', () => {
    expect(retrieveStyles(<Block minHeight="100px">test</Block>)).toMatchObject(
      {
        minHeight: '100px',
      },
    );
  });

  it('renders maxHeight style if provided', () => {
    expect(retrieveStyles(<Block maxHeight="100px">test</Block>)).toMatchObject(
      {
        maxHeight: '100px',
      },
    );
  });

  describe('Overflow', () => {
    it('renders overflowX styling if provided with scrollX value', () => {
      expect(
        retrieveStyles(<Block overflow="scrollX">test</Block>),
      ).toMatchObject({
        overflowX: 'scroll',
      });
    });

    it('renders overflowY styling if provided with scrollY value', () => {
      expect(
        retrieveStyles(<Block overflow="scrollY">test</Block>),
      ).toMatchObject({
        overflowY: 'scroll',
      });
    });

    it('renders overflow styling if provided any other value', () => {
      expect(retrieveStyles(<Block overflow="auto">test</Block>)).toMatchObject(
        {
          overflow: 'auto',
        },
      );
    });
  });

  it('renders overflow style if provided', () => {
    expect(retrieveStyles(<Block overflow="hidden">test</Block>)).toMatchObject(
      {
        overflow: 'hidden',
      },
    );
  });

  it('renders themed margin style if provided', () => {
    expect(retrieveStyles(<Block margin="scale200">test</Block>)).toMatchObject(
      {
        margin: '$theme.sizing.scale200',
      },
    );
  });

  it('renders themed marginTop style if provided', () => {
    expect(
      retrieveStyles(<Block marginTop="scale200">test</Block>),
    ).toMatchObject({
      marginTop: '$theme.sizing.scale200',
    });
  });

  it('renders themed marginRight style if provided', () => {
    expect(
      retrieveStyles(<Block marginRight="scale200">test</Block>),
    ).toMatchObject({
      marginRight: '$theme.sizing.scale200',
    });
  });

  it('renders themed marginBottom style if provided', () => {
    expect(
      retrieveStyles(<Block marginBottom="scale200">test</Block>),
    ).toMatchObject({
      marginBottom: '$theme.sizing.scale200',
    });
  });

  it('renders themed marginLeft style if provided', () => {
    expect(
      retrieveStyles(<Block marginLeft="scale200">test</Block>),
    ).toMatchObject({
      marginLeft: '$theme.sizing.scale200',
    });
  });

  it('renders themed padding style if provided', () => {
    expect(
      retrieveStyles(<Block padding="scale200">test</Block>),
    ).toMatchObject({
      padding: '$theme.sizing.scale200',
    });
  });

  it('renders themed paddingTop style if provided', () => {
    expect(
      retrieveStyles(<Block paddingTop="scale200">test</Block>),
    ).toMatchObject({
      paddingTop: '$theme.sizing.scale200',
    });
  });

  it('renders themed paddingRight style if provided', () => {
    expect(
      retrieveStyles(<Block paddingRight="scale200">test</Block>),
    ).toMatchObject({
      paddingRight: '$theme.sizing.scale200',
    });
  });

  it('renders themed paddingBottom style if provided', () => {
    expect(
      retrieveStyles(<Block paddingBottom="scale200">test</Block>),
    ).toMatchObject({
      paddingBottom: '$theme.sizing.scale200',
    });
  });

  it('renders themed paddingLeft style if provided', () => {
    expect(
      retrieveStyles(<Block paddingLeft="scale200">test</Block>),
    ).toMatchObject({
      paddingLeft: '$theme.sizing.scale200',
    });
  });

  it('renders placeContent style if provided', () => {
    expect(
      retrieveStyles(<Block placeContent="end center">test</Block>),
    ).toMatchObject({
      placeContent: 'end center',
    });
  });

  it('renders placeItems style if provided', () => {
    expect(
      retrieveStyles(<Block placeItems="end center">test</Block>),
    ).toMatchObject({
      placeItems: 'end center',
    });
  });

  it('renders placeSelf style if provided', () => {
    expect(
      retrieveStyles(<Block placeSelf="center start">test</Block>),
    ).toMatchObject({
      placeSelf: 'center start',
    });
  });

  it('renders flexWrap style if provided', () => {
    expect(retrieveStyles(<Block flexWrap>test</Block>)).toMatchObject({
      flexWrap: 'wrap',
    });
  });

  it('renders left style if provided', () => {
    expect(retrieveStyles(<Block left="1px">test</Block>)).toMatchObject({
      left: '1px',
    });
  });

  it('renders top style if provided', () => {
    expect(retrieveStyles(<Block top="1px">test</Block>)).toMatchObject({
      top: '1px',
    });
  });

  it('renders right style if provided', () => {
    expect(retrieveStyles(<Block right="1px">test</Block>)).toMatchObject({
      right: '1px',
    });
  });

  it('renders bottom style if provided', () => {
    expect(retrieveStyles(<Block bottom="1px">test</Block>)).toMatchObject({
      bottom: '1px',
    });
  });

  it('applies other props if provided', () => {
    const onClickMock = jest.fn();
    const example = mount(<Block onClick={onClickMock}>test</Block>);
    example.simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });

  it('applies expected styles if responsive array is provided', () => {
    expect(
      retrieveStyles(
        <Block marginLeft={['scale100', 'scale200', 'scale300', 'scale400']}>
          test
        </Block>,
      ),
    ).toMatchObject({
      '@media screen and (min-width: $theme.breakpoints.largepx)': {
        marginLeft: '$theme.sizing.scale400',
      },
      '@media screen and (min-width: $theme.breakpoints.mediumpx)': {
        marginLeft: '$theme.sizing.scale300',
      },
      '@media screen and (min-width: $theme.breakpoints.smallpx)': {
        marginLeft: '$theme.sizing.scale200',
      },
      marginLeft: '$theme.sizing.scale100',
    });
  });

  it('applies expected styles if responsive array has less than number of breakpoints', () => {
    expect(
      retrieveStyles(<Block marginLeft={['scale100', 'scale200']}>test</Block>),
    ).toMatchObject({
      '@media screen and (min-width: $theme.breakpoints.smallpx)': {
        marginLeft: '$theme.sizing.scale200',
      },
      marginLeft: '$theme.sizing.scale100',
    });
  });

  it('does not throw if provided unknown font prop', () => {
    expect(
      retrieveStyles(<Block font="not-a-real-font">test</Block>),
    ).toMatchObject({});
  });
});
