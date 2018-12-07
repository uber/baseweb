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

  it('renders justifyContent style if provided', () => {
    expect(
      retrieveStyles(<Block justifyContent="start">test</Block>),
    ).toMatchObject({
      justifyContent: 'start',
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
});
