/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import {
  Caption1,
  Caption2,
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label1,
  Label2,
  Paragraph1,
  Paragraph2,
} from '../index.js';
import Block from '../../block/block.js';

function getStyle(element: React.Node) {
  // $FlowFixMe
  return shallow(element)
    .find(Block)
    .props();
}

const BASIC_TESTS = {
  Caption1: {
    as: 'div',
    font: 'font200',
    color: 'contentSecondary',
    children: 'test',
    overrides: {},
  },
  Caption2: {
    as: 'div',
    font: 'font250',
    color: 'contentSecondary',
    children: 'test',
    overrides: {},
  },
  Display: {
    as: 'div',
    font: 'font1100',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H1: {
    as: 'h1',
    font: 'font1000',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H2: {
    as: 'h2',
    font: 'font900',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H3: {
    as: 'h3',
    font: 'font800',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H4: {
    as: 'h4',
    font: 'font700',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H5: {
    as: 'h5',
    font: 'font600',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  H6: {
    as: 'h6',
    font: 'font500',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  Label1: {
    as: 'div',
    font: 'font350',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  Label2: {
    as: 'div',
    font: 'font450',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  Paragraph1: {
    as: 'p',
    font: 'font300',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
  Paragraph2: {
    as: 'p',
    font: 'font400',
    color: 'contentPrimary',
    children: 'test',
    overrides: {},
  },
};

describe('Typography', () => {
  it('Caption1 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Caption1>test</Caption1>)).toEqual(BASIC_TESTS.Caption1);
    expect(getStyle(<Caption1 color="primary">test</Caption1>)).toEqual({
      ...BASIC_TESTS.Caption1,
      color: 'primary',
    });
  });

  it('Caption2 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Caption2>test</Caption2>)).toEqual(BASIC_TESTS.Caption2);
    expect(getStyle(<Caption2 padding="6px">test</Caption2>)).toEqual({
      ...BASIC_TESTS.Caption2,
      padding: '6px',
    });
  });

  it('Display - shallow rendering with appropriate font', () => {
    expect(getStyle(<Display>test</Display>)).toEqual(BASIC_TESTS.Display);
    expect(getStyle(<Display paddingLeft="20px">test</Display>)).toEqual({
      ...BASIC_TESTS.Display,
      paddingLeft: '20px',
    });
  });

  it('H1 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H1>test</H1>)).toEqual(BASIC_TESTS.H1);
    expect(getStyle(<H1 marginTop="30px">test</H1>)).toEqual({
      ...BASIC_TESTS.H1,
      marginTop: '30px',
    });
  });

  it('H2 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H2>test</H2>)).toEqual(BASIC_TESTS.H2);
    expect(
      getStyle(
        <H2 position="absolute" bottom={0} left="10px">
          test
        </H2>,
      ),
    ).toEqual({
      ...BASIC_TESTS.H2,
      position: 'absolute',
      bottom: 0,
      left: '10px',
    });
  });

  it('H3 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H3>test</H3>)).toEqual(BASIC_TESTS.H3);
    expect(
      getStyle(
        <H3 position="sticky" top="4rem">
          test
        </H3>,
      ),
    ).toEqual({...BASIC_TESTS.H3, position: 'sticky', top: '4rem'});
  });

  it('H4 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H4>test</H4>)).toEqual(BASIC_TESTS.H4);
    expect(getStyle(<H4 maxWidth="30px">test</H4>)).toEqual({
      ...BASIC_TESTS.H4,
      maxWidth: '30px',
    });
  });

  it('H5 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H5>test</H5>)).toEqual(BASIC_TESTS.H5);
    expect(getStyle(<H5 minWidth="20px">test</H5>)).toEqual({
      ...BASIC_TESTS.H5,
      minWidth: '20px',
    });
  });

  it('H6 - shallow rendering with appropriate font', () => {
    expect(getStyle(<H6 minHeight="30px">test</H6>)).toEqual({
      ...BASIC_TESTS.H6,
      minHeight: '30px',
    });
  });

  it('Label1 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Label1>test</Label1>)).toEqual(BASIC_TESTS.Label1);
    expect(
      getStyle(
        <Label1 marginBottom="20px" paddingTop="10px">
          test
        </Label1>,
      ),
    ).toEqual({
      ...BASIC_TESTS.Label1,
      marginBottom: '20px',
      paddingTop: '10px',
    });
  });

  it('Label2 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Label2>test</Label2>)).toEqual(BASIC_TESTS.Label2);
    expect(
      getStyle(
        <Label2 marginLeft="10px" paddingRight="20px">
          test
        </Label2>,
      ),
    ).toEqual({
      ...BASIC_TESTS.Label2,
      marginLeft: '10px',
      paddingRight: '20px',
    });
  });

  it('Paragraph1 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Paragraph1>test</Paragraph1>)).toEqual(
      BASIC_TESTS.Paragraph1,
    );
    expect(
      getStyle(
        <Paragraph1 margin="10px 4px" width="200px">
          test
        </Paragraph1>,
      ),
    ).toEqual({...BASIC_TESTS.Paragraph1, margin: '10px 4px', width: '200px'});
  });

  it('Paragraph2 - shallow rendering with appropriate font', () => {
    expect(getStyle(<Paragraph2>test</Paragraph2>)).toEqual(
      BASIC_TESTS.Paragraph2,
    );
    expect(
      getStyle(
        <Paragraph2 alignSelf="center" justifySelf="flex-end">
          test
        </Paragraph2>,
      ),
    ).toEqual({
      ...BASIC_TESTS.Paragraph2,
      alignSelf: 'center',
      justifySelf: 'flex-end',
    });
  });
});
